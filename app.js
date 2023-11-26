const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const path = require('path');
const custumModules = require('./custumModules/dircheck'); // Import your module

const port = 5000

// Configure AWS with environment variables
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
  
// Create an S3 instance
const s3 = new AWS.S3();



// Set EJS as the template engine
app.set('view engine', 'ejs');


// Define a route to list S3 buckets
app.get('/list-buckets', (req, res) => {
    // Use the S3 instance to list buckets
    s3.listBuckets((err, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(data.Buckets);
      }
    });
});
  

// Configure Express to serve static files from the "src/assets" directory
app.use(express.static(path.join(__dirname, 'src/assets')));

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "src/views/", 'index.ejs'));
    res.render(path.join(__dirname, "src/views/", 'index'), { templateUri: `${__dirname}/src` });
});
// Remove .html extension from other routes
app.get('/:page', (req, res) => {
    const { page } = req.params;
    const isOk = custumModules.isRouteValid(page)
    console.log(page, isOk,"we")
    if (isOk) {
        res.render(path.join(__dirname, "src/views/", `${page}.ejs`));
    } 
    else {
        res.render(path.join(__dirname, "src/views/404page.ejs"));
    }
});
app.get('/.well-known/pki-validation/954193E89757E9101B749C9E6B0B1E6E.txt', (req, res) => {
    res.sendFile(path.join(__dirname, "src/ssl/", `954193E89757E9101B749C9E6B0B1E6E.txt`))
    }
);




// app.get('/', (req, res) => {
//   res.send('Hello World!')  
// })

app.listen(port, () => {
  console.log(`gsrwebworks listening on port ${port}`)
})