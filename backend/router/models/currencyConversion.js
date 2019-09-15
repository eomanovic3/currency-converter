// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const CurrencyConversionSchema = new Schema(
    {
        id: Number,
        amount: Number,
        currency: String,
        destinationCurrency: String,
        convertedValue: Number,
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("CurrencyConversion", CurrencyConversionSchema);
