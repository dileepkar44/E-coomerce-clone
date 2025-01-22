const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {

    const checkUser = await User.findOne({email})
    if(checkUser) return res.json({success:false, message: 'user already exists with same mail please login with some other email'} )

    const hashPassword = await bcrypt.hash(password, 12); //12 is salt
    const newUser = new User({
      userName,
      email,
      password : hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration succesfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({email}) //check for the correct email
    if(!checkUser) return res.json({
      success: false,
      message: 'user doenot exists! please register'
    })

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password) //check for the password
    if(!checkPasswordMatch)  res.json({
      success: false,
      message: 'password is incorrect! Please try again'
    })

    const token  = jwt.sign({ //above both case matches then will genarate token
      id: checkUser._id, role : checkUser.role, email : checkUser.email, userName : checkUser.userName
    }, 'CLIENT_SECRETE_KEY', {expiresIn: '60m'})

    res.cookie('token', token, {httpOnly:true, secure: false}).json({
      success: true,
      message: 'LoggedIn successfull',
      user : {
        email: checkUser.email,
        role: checkUser.role,
        id : checkUser._id,
        userName : checkUser.userName,
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) =>{
  res.clearCookie('token').json({
    success: true,
    message: "Logged out successfully"
  })
}

//auth middleware
const authMiddleware = async(req,res,next)=>{
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success: false,
    message: 'Unautherized user'
  })

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRETE_KEY' )
    req.user = decoded;
    next();
  } catch (error) { 
    res.status(401).json({
      success: false,
      message: 'Unautherized user'
    })
    
  }
}

module.exports = {registerUser,loginUser,logoutUser, authMiddleware}
