'use strict';
const pFilter = require('p-filter');

module.exports = (iterable, filterer, opts) => pFilter(iterable, filterer, opts).then(arr => arr.length !== 0);
