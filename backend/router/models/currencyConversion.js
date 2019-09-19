const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencyConversionSchema = new Schema(
    {
        id: Number,
        amount: Number,
        currency: String,
        destinationCurrency: String,
        convertedValue: Number,
        usdValue: Number,
    },
    {timestamps: true}
);

module.exports = mongoose.model("CurrencyConversion", CurrencyConversionSchema);
