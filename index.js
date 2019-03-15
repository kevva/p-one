'use strict';
const pMap = require('p-map');

class EndError extends Error {}

const test = testFunction => async (x, i) => {
	const value = await testFunction(x, i);
	if (value) {
		throw new EndError();
	}

	return value;
};

const pOne = async (iterable, testFunction, options) => {
	try {
		await pMap(iterable, test(testFunction), options);
		return false;
	} catch (error) {
		if (error instanceof EndError) {
			return true;
		}

		throw error;
	}
};

module.exports = pOne;
module.exports.default = pOne;
