import {Options} from 'p-map';

/**
Test whether *some* promise passes a testing function. Fulfills when *any* promise in `input` and ones returned from `testFunction` are fulfilled, or rejects if any of the promises reject.

@param input - Iterated over concurrently in the `testFunction` function.
@param testFunction - Predicate function, expected to return a `Promise<boolean>` or `boolean`.
@returns `true` if any promise passed the test and `false` otherwise.
*/
export default function pOne<ValueType>(
	input: Iterable<PromiseLike<ValueType> | ValueType>,
	testFunction: (element: ValueType, index: number) => boolean | Promise<boolean>,
	options?: Options
): Promise<boolean>;
