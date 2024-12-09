//dependencies
const { dir } = require('console');
const fs = require('fs');
const path = require('path');

//module scaffolding
const dbms = {};

//base directory of the .storage folder
dbms.baseDir = path.join(__dirname,'./../.storage/');

//Write data to file
dbms.create = (dir,file,data,callback) => {
    // open(creating) file for writing => dbms.baseDir+dir+'/'+file+'.json' && 'wx' is the mode for open file, if i use 'w' mode for open file it will replace my previous file when previous file directory and file name matched, now i have used 'wx' mode : 'wx' mode will throw error when i try to save data on previously existed file.
    fs.open(dbms.baseDir+dir+'/'+file+'.json','wx',(err,fileDescriptor)=>{

        if (!err && fileDescriptor) {
            //convert data to string
            const stringData = JSON.stringify(data);

            //write data to file and then close it
            fs.writeFile(fileDescriptor,stringData,(err2) => {
                if (!err2) {
                    fs.close(fileDescriptor,(err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    })
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('Could not create new file, it may already exists!');
            //callback(err);
        };

    });
};

//read data from file
dbms.read = (dir,file,callback) => {
    fs.readFile(dbms.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        callback(err, data);
    });
};

module.exports = dbms;