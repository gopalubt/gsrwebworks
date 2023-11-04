// myModule.js
const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
// const filenameToCheck = 'myFile.txt';

function isRouteValid(route) {
  console.log({route})
  const filePath = path.join(directoryPath, route);
  // Implement your route validation logic here
  if (fs.existsSync(filePath)) {
    return true
  } else {
    return false
  }
}



// Function to greet a user
function greetUser(username) {
  return `Hello, ${username}!`;
}


module.exports = {
  // greetUser,
  isRouteValid
};