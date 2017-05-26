'use strict';
const pMap = require('p-map');

class EndError extends Error {} // eslint-disable-line unicorn/custom-error-definition

const test = testFn => (x, i) => Promise.resolve(testFn(x, i)).then(val => {
	if (val) {
		throw new EndError();
	}

	return val;
});

module.exports = (iterable, testFn, opts) => pMap(iterable, test(testFn), opts)
	.then(() => false)
	.catch(err => {
		if (err instanceof EndError) {
			return true;
		}

		throw err;
	});
