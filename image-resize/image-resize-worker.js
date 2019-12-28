const { parentPort, workerData } =  require("worker_threads");
const  sharp  =  require("sharp");

async  function  resize() {

    const { imagePath,size,outputPath } =  workerData;
   
    console.log("=======workerData======",workerData);
    
    // sharp(imagePath).metadata().then((res)=>{

    //   console.log(res)
    // })
    await  sharp(imagePath)
    .resize(size.w, size.h, { fit:  "cover" })
    .toFile(outputPath+"/"+"resize-"+Date.now() +  ".jpg");
    
    // sending message back to main thread
    parentPort.postMessage({done:true});
}
resize()

