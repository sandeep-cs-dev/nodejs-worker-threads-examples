const threadCount = +process.argv[2] || 2;
const start = require('./calculate-primes-worker-threads.js');
console.time(`primes-with-${threadCount}-worker-threads`);
start(threadCount).then(function(res){
console.timeEnd(`primes-with-${threadCount}-worker-threads`);
});