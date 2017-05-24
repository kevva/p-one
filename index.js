'use strict';
const pMap = require('p-map');

const filter = filterer => (x, i) => Promise.resolve(filterer(x, i)).then(val => {
	if (val) {
		const err = new Error();
		err.code = 'EISTRUE';
		throw err;
	}

	return val;
});

module.exports = (iterable, filterer, opts) => pMap(iterable, filter(filterer), opts)
	.then(() => false)
	.catch(err => {
		if (err.code === 'EISTRUE') {
			return true;
		}

		throw err;
	});
