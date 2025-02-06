// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");

// Get request
app.get('/', function (req, res) {

    // Config your database credential
    const config = {
        host: 'localhost',       // Alamat server database
        user: 'root',            // Username database
        password: '',            // Password database
        database: 'polres',  
    };

    // Connect to your database
    mssql.connect(config, function (err) {

        // Create Request object to perform
        // query operation
        let request = new mssql.Request();

        // Query to the database and get the records
        request.query('select * from student',
            function (err, records) {

                if (err) console.log(err)
clear
                
                // Send records as a response
                // to browser
                res.send(records);

            });
    });
});

