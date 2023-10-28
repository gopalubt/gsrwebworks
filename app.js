const express = require('express');
const app = express();
const path = require('path');

const port = 3000

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname,"src/views/", 'index.html'));
});
// Remove .html extension from other routes
app.get('/:page', (req, res) => {
    const { page } = req.params;
    res.sendFile(path.join(__dirname, "src/views/", `${page}.html`));
});


// app.get('/', (req, res) => {
//   res.send('Hello World!')  
// })

app.listen(port, () => {
  console.log(`gsrwebworks listening on port ${port}`)
})