import test from 'ava';
import m from '.';

test('true', async t => {
	t.true(await m([Promise.resolve(1), 2, 3, 4], x => x % 2));
	t.true(await m([1, 2, 3, 4], x => Promise.resolve(x % 2)));
});

test('false', async t => {
	t.false(await m([Promise.resolve(0), 2, 4, 6], x => x % 2));
	t.false(await m([0, 2, 4, 6], x => Promise.resolve(x % 2)));
});

test('return fast', async t => {
	const concurrency = 1;
	let count = 0;

	await m([Promise.resolve(1), 2, 3, 4], x => {
		count++;
		return x % 2;
	}, {concurrency});

	t.is(count, 1);
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), false);
});
