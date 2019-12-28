currency-converter
########################################

Currency converter is an application made in Node.js-backend, React JS with Redux - frontend and MongoDB - database cluster.

Its goal is to convert your currency.

.. class:: no-web no-pdf

    .. image:: https://github.com/eomanovic3/currency-converter/blob/master/demo.gif
        :alt: Expenses tracker in action
        :width: 100%
        :align: center


.. contents::

Description
=============

* Expressive and intuitive syntax is used.
* API is based on REST.
* An external API for currency rates is used - https://www.currencyconverterapi.com/.
* ES6+ is used.
* Code is separated into several modules.

* The app is displaying the following stats:
*   1. Most popular destination currency
*   2. Total amount converted (in USD)
*   3. Total number of conversion requests made


Prerequisites
============
1. Git
2. Node: any 8.x version starting with 8.4.0 or greater
3. A clone of the https://github.com/eomanovic3/currency-converter repo on your local machine.


Installation and Running
========================

.. code-block:: bash

    $ npm install
    $ cd backend
    $ npm install
    $ node server.js
    $ cd ..
    $ cd client
    $ npm install
    $ npm start
    $ cd ..
    $ npm star
