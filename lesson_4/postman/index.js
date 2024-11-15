const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

app.listen(3000);
const port = 3000;
app.listen(port);

console.log(`Сервер запущен на порте ${port}`);
