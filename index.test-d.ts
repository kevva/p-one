import {expectType} from 'tsd-check';
import pOne from '.';

const places = [
	Promise.resolve('Norway'),
	'Bangkok, Thailand',
	'Berlin, Germany',
	'Tokyo, Japan'
];

expectType<Promise<boolean>>(
	pOne(places, x => {
		expectType<string>(x);
		return true;
	})
);
expectType<Promise<boolean>>(
	pOne(places, async x => {
		expectType<string>(x);
		return true;
	})
);
expectType<Promise<boolean>>(
	pOne(
		places,
		async x => {
			expectType<string>(x);
			return true;
		},
		{concurrency: 1}
	)
);

const places2 = [
	Promise.resolve('Norway'),
	'Bangkok, Thailand',
	'Berlin, Germany',
	5
];

expectType<Promise<boolean>>(
	pOne<string | number>(
		places2,
		async x => {
			expectType<string | number>(x);
			return true;
		},
		{concurrency: 1}
	)
);
