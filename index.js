//Built-in dependencies
const http = require('http');

// My dependencies
const {handleReqRes} = require('./lib/ReqResHandler');
const environment = require('./lib/environments')
const dbms = require('./lib/dbms')

//app object - module scaffolding
const app = {};

//testing filesystem
// @TODO: pore muche dibo
// dbms.create(
//     'test',
//     'newFile',
//     {
//         name :'Bangladesh',
//         language : 'Bangla',
//     },
//     (err) => {
//         console.log(`error was : `, err);
//     }
// );

dbms.read(
    'test',
    'newFile',
    (err,result) => {
        console.log(err,result);
    }
)


//create server 
app.createServer = () => {
    const server  = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log(`environment variable is ${process.env.NODE_ENV}`);
        console.log(`listening to port : ${environment.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();