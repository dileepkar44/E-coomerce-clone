import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  address: [],
};

export const addNewAddress = createAsyncThunk('addresses/addNewAddress', async(formData)=>{
    const response = await axios.post("http://localhost:5000/api/shop/address/add", formData)
    return response.data;
})
export const fetchAllAddress = createAsyncThunk('addresses/fetchAllAddress', async(userId)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`)
    return response.data;
})
export const editaAddress = createAsyncThunk('/addresses/editaAddress', async({userId, addressId, formData})=>{
    const response = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, formData)
    return response.data;
})
export const deleteAddress = createAsyncThunk('/addresses/deleteAddress', async({userId, addressId})=>{
    const response = await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`)
    return response.data;
})

const AddressSlice = createSlice({
    name: 'AddressSlice',
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder
        .addCase(addNewAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(addNewAddress.fulfilled, (state, action)=>{
            state.isLoading = false
        }).addCase(addNewAddress.rejected, (state)=>{
            state.isLoading = false
        }).addCase(fetchAllAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state, action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        }).addCase(fetchAllAddress.rejected, (state)=>{
            state.isLoading = false
            state.addressList = []
        })
    }
})

export default AddressSlice.reducer;
