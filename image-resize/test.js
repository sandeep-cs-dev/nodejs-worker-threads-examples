
const fs =  require('fs');
var test =  require('./image-resize-main.js');

const size =   {w:400,h:300};
const outputPath = __dirname;
console.log(outputPath)
const imagePath ='test.jpg';
test(imagePath,size,outputPath);

