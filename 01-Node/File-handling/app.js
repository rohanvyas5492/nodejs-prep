const fs = require('fs');
const os = require('os');

//01-Creating a folder synchronously
// fs.mkdirSync('docs');

//02-Creating a file synchronously
// fs.writeFileSync('data.txt',`${Date.now()}, Logged`);

//03-Creating a file asynchronously
// fs.writeFile('data.txt',`${Date.now()}, Logged`,(err)=>{console.log(err)});

//04-Reading file synchronously
const result = fs.readFileSync('data.txt','utf-8');
// console.log(result);

//05-Reading file asynchronously
fs.readFile('data.txt','utf-8',(err,result)=>{
    if(err){
        console.log('Error',err);
    }else{
        // console.log('Result',result);
    }
});

//06-Appending to a file
fs.appendFileSync('logs.txt',`${Date.now()}, Logged\n`)

//07-Copyng a file
fs.cpSync('logs.txt','logsCopy.txt');

//08-Deleting a file
fs.unlinkSync('logsCopy.txt');

//09-Showing stats of a file
// console.log(fs.statSync('logs.txt'));

//Information about the machine
console.log(os.cpus())