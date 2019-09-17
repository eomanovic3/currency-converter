// server/router/router.js
var logger = require('../lib/logger');
module.exports = function (app) {
    app.use(logger);

    app.get('/', function (req, res, next) {
        res.status(200).send("YOU'VE REACHED THE BASE URL OF YOUR API");
    });

    app.use('/api/currencyConversion', require('./services/currencyConversionService'));
    app.use('/api/users', require('./services/userService'));

    // Catch all
    app.use('*', function (req, res, next){
        res.status(404).json({err: "Path" + req.originalUrl + " does not exist"});
    });

};
