const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Aex2YVToTEi_prKSICuwUKH7VNTlVZ8KB-KHQQYvDVEDqe4qhatlOEtV57ZzDbSeZn32xWJkcXLpVpGn",
  client_secret: "EDRw3KPpPP6Qf7_nFo5iqxkTbcvUuQkTpF3pbFZeYmjHL_KZ7fuaeU8xv8vfp7PDc7MZoK1fosJS5mzI",
});

module.exports = paypal;