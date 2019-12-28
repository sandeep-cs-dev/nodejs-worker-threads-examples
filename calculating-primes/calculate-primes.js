'use strict';
console.time('primesWithMainThread');
const min = 2;
const max = 1e7;
const primes = [];
function generatePrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i%j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}
generatePrimes(min, max);
console.timeEnd('primesWithMainThread');
//console.log(primes.join('\n'));
