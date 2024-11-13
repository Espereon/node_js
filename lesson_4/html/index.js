const express = require('express');
const app = express();

const articles = [
    { title: 'Article 1', description: 'First awesome article' },
    { title: 'Article 2', description: 'Second awesome article' },
    { title: 'Article 3', description: 'Third awesome article' },
];

app.get('/', (req, res) => {
    let html = '<h1>Article liest</h1>';

    for (const articleDate of articles) {
        html += `<h2>${articleDate.title}</h2>`;
        html += `<p>${articleDate.description}</p>`;
    }

    res.send(html);
});

app.listen(3000);
console.log('Сервер запущен');