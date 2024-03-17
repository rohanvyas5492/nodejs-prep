const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()} - ${req.url} - New Request Recieved\n`;
    fs.appendFile('logs.txt',log,(err)=>{
        if(err){
            console.log(err);
        }else{
            switch(req.url){
                case '/':res.end('Homepage')
                break;
                case '/about':res.end('I am Rohan Vyas')
                break;
                default:res.end('Not found');
            }
        }
    })
});

myServer.listen(8000,()=>console.log('Server started...'));