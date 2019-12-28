
const encrptfile =  require('./encrypt-file.js')
const filePath =  __dirname+"/test.txt";

encrptfile(filePath).then(function(res){
 console.log(res);
})