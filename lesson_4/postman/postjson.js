const express = require('express');

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('<h1>This is a post request!</h1>');
});

const port = 3000;
app.listen(port);

console.log(`Сервер запущен на порте ${port}`);