const fs = require('fs');

fs.appendFile('./test.txt', 'console.log("Bye bye world")', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Hello world!');
})