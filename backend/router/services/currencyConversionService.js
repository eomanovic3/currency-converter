// router/routes/collection.js
const CurrencyConversion = require("../models/currencyConversion");
const express = require('express');

// router for ==> /subcategories
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).send("Received GET request at http://localhost:3001/api/currencyConversion");
});

// this method fetches all available data in our database
router.get('/getAllCurrencyConversions', (req, res) => {

    CurrencyConversion.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });

});


// this is our create methid
// this method adds new data in our database
router.post('/addCurrencyConversion', (req, res) => {
    let data = new CurrencyConversion();

    const { id, amount,  usdValue, currency, destinationCurrency, convertedValue} = req.body;

    if ((!id && id !== 0) || !amount || !currency || !destinationCurrency || !convertedValue || !usdValue) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.convertedValue = convertedValue;
    data.destinationCurrency = destinationCurrency;
    data.usdValue = usdValue;
    data.currency = currency;
    data.amount = amount;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;

