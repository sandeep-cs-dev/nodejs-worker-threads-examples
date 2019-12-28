'use strict';
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const min = 2;
let primes = [];
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
if (isMainThread) {
 module.exports =  function (threadCount) {

  return new Promise(function(resolve,rejet){

  const max = 10000000;
  const threads = new Set();;
  console.log(`Running with ${threadCount} threads...`);
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  for (let i = 0; i < threadCount - 1; i++) {
    const myStart = start;
    threads.add(new Worker(__filename, { workerData: { start: myStart, range }}));
    start += range;
  }
  threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount)}}));
  
  for (let worker of threads) {
     worker.on('error', (err) => { 
     rejet(err)
     });
     worker.on('exit', () => {
     threads.delete(worker);
      console.log(`Thread exiting, ${threads.size} running...`);
      if (threads.size === 0) {
       // console.log(primes.join('\n'));
         resolve(true)
      }
    })
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }  // end of loop
 })
}
}
else {
  generatePrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}