# p-one [![Build Status](https://travis-ci.org/kevva/p-one.svg?branch=master)](https://travis-ci.org/kevva/p-one)

> Test whether some promise passes a testing function

Like [`Array.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) for promises.

## Install

```
$ npm install --save p-one
```


## Usage

```js
const pOne = require('p-one');
const getContinent = require('get-continent'); // not a real module

const places = [
	getCapital('Norway').then(info => info.name),
	'Bangkok, Thailand',
	'Berlin, Germany',
	'Tokyo, Japan'
];

const testingFunction = x => getContinent(x).then(x => x === 'europe');

pOne(places, testingFunction).then(result => {
	console.log(result);
	//=> true
});
```


## API

### pOne(input, testingFunction, [options])

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `testingFunction` are fulfilled, or rejects if any of the promises reject. The fulfilled value is a `boolean` that is `true` if some promises passed the test and `false` otherwise.

#### input

Type: `Iterable<Promise|any>`

Iterated over concurrently in the `testingFunction` function.

#### testingFunction(element, index)

Type: `Function`

Expected to return a `Promise<boolean>` or `boolean`.

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises returned by `testingFunction`.


## Related

* [p-every](https://github.com/kevva/p-every) - Test whether all promises passes a testing function
* [p-filter](https://github.com/sindresorhus/p-filter) - Filter promises concurrently
* [p-locate](https://github.com/sindresorhus/p-locate) - Get the first fulfilled promise that satisfies the provided testing function
* [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
* [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Kevin Martensson](http://github.com/kevva)
