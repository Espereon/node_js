const express = require('express');
const path = require('path');
const app = express();

// app.use((req, res, next) => {
//     console.log('Поступил запрос', req.method, req.url);
//     next();
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'))
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен по порту ${port}`);
});