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

    const { id, amount,  currency, destinationCurrency} = req.body;

    if ((!id && id !== 0) || !message || !currency || !destinationCurrency) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.destinationCurrency = destinationCurrency;
    data.currency = currency;
    data.amount = amount;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//
// // this is our update method
// // this method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
//     const { id, update } = req.body;
//     Data.findByIdAndUpdate(id, update, (err) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//     const { id } = req.body;
//     Data.findByIdAndRemove(id, (err) => {
//         if (err) return res.send(err);
//         return res.json({ success: true });
//     });
// });


module.exports = router;

