const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Добро пожаловать на мой сайт</h1>')
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен по порту ${port}`);
});