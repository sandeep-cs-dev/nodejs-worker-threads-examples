
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
const  crypto  =  require("crypto");
const  fs  =  require("fs");


if (isMainThread) {
  module.exports = async function encryptFile(filePath) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename,{workerData:{filePath:filePath}});
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
      worker.postMessage(filePath);
    });
  };
} else {

    console.log("workerData",workerData)
    algorithm = 'aes-256-ctr';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // parentPort.on('message', (message) => {

    //   //console.log("message from parent",message)
    // })
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const readStream = fs.createReadStream(workerData.filePath);
    const w = fs.createWriteStream('file.out.enc');
    readStream.pipe(cipher).pipe(w);
    w.on('close',function(){
    parentPort.postMessage({encrypted:true})

  })
}







