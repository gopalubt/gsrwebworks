const express = require('express');
const app = express();
const path = require('path');
const custumModules = require('./custumModules/dircheck'); // Import your module

const port = 5000

// Set EJS as the template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log(__dirname);
    // res.sendFile(path.join(__dirname, "src/views/", 'index.ejs'));
    res.render(path.join(__dirname, "src/views/", 'index'));
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