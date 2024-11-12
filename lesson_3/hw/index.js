const express = require('express');
const fs = require('fs');
const countMain = 0;

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Добро пожаловать на мой сайт</h1>');
    // ++count;
    fs.appendFile('./count.txt', `<p>Количество обращений к основной странице = ${++countMain}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('запись добавлена');
    });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен по порту ${port}`);
});