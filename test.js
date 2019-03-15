import test from 'ava';
import pOne from '.';

test('true', async t => {
	t.true(await pOne([Promise.resolve(1), 2, 3, 4], x => x % 2));
	t.true(await pOne([1, 2, 3, 4], async value => value % 2));
});

test('false', async t => {
	t.false(await pOne([Promise.resolve(0), 2, 4, 6], x => x % 2));
	t.false(await pOne([0, 2, 4, 6], async value => value % 2));
});

test('return fast', async t => {
	const concurrency = 1;
	let count = 0;

	await pOne([Promise.resolve(1), 2, 3, 4], value => {
		count++;
		return value % 2;
	}, {concurrency});

	t.is(count, 1);
});

test('handles empty iterable', async t => {
	t.deepEqual(await pOne([]), false);
});
