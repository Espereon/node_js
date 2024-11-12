const fs = require('fs');

fs.writeFile('./test.txt', 'console.log("Hello world")', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Hello world!');
})