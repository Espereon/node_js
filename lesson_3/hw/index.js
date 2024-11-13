const express = require('express');
const fs = require('fs');
const path = require('path');
const counterFilePath = path.join(__dirname, 'Counter.json');
const Counter = JSON.parse(fs.readFileSync(counterFilePath, 'utf-8'));

// let countMain = 0;
// let countAbout = 0;

const app = express();

fs.writeFileSync(
    path.join(__dirname, 'Counter.json'),
    JSON.stringify(Counter, null, 2)
);

app.get('/', (req, res) => {
    Counter[0].count++;
    fs.writeFileSync(counterFilePath, JSON.stringify(Counter, null, 2));
    res.send(
        `<h1>Главная страница</h1><p>Количество просмотров: ${Counter[0].count}</p><a href = '/about'>Перейти на страницу о сайте</a>`
    );

    // fs.appendFile('./count.txt', `\nКоличество обращений к основной странице = ${countMain}`, (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log('запись добавлена');
    // });
});

app.get('/about', (req, res) => {
    Counter[1].count++;
    fs.writeFileSync(counterFilePath, JSON.stringify(Counter, null, 2));
    res.send(
        `<h1>Страница обо мне</h1><p>Количество просмотров: ${Counter[1].count}</p><a href = '/'>Перейти на главную страницу о сайте</a>`
    );
});


const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен по порту ${port}`);
});