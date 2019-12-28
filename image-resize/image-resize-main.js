const { Worker } =  require("worker_threads");

const imageResizer = function (imagePath, size,outputPath) {

  return  new  Promise((resolve, reject) => {
    
  const  worker  =  new  Worker(__dirname + "/image-resize-worker.js", {
    workerData: {imagePath:imagePath, size:size,outputPath:outputPath}
  });
  
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code  => {
        if (code  !==  0)
            reject(new  Error(`Worker stopped with exit code ${code}`));
        });
    });
};

module.exports =  imageResizer