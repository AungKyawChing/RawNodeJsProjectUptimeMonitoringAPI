//dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

// My dependencies
const routes = require('./routes');
const { notFoundHandler } = require('./routeHandler/notFoundHandler')

//module scaffolding
const handler = {};

handler.handleReqRes = (req,res) => {
    //request handle
    //get the url and parse it
    const parsedUrl = url.parse(req.url,true);// it will return an object of parsed url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers; 

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;



    req.on('data',(buffer) => { 
        realData += decoder.write(buffer);
    });
    req.on('end',() => {
        realData += decoder.end();
        console.log(realData);

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === "number" ? statusCode : 500;
            payload = typeof payload === "object" ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            //return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });
        //response handle
        res.end('Hello World!');
    });
    
    //response handle
    // res.end(`<form action="http://localhost:3000/" method="post">
    // <input type="text">
    // <input type="submit" value="submit it">
    // </form>`);
};

module.exports = handler;