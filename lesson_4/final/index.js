const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkBody, checkParams } = require('./validations/validator');  
const { idScheme, articleScheme } = require('./validations/schema');

const app = express();
let uniqueID = 0;
const articles = [];

app.use(express.json());

/* 
Позволяет получить все стати
*/
app.get('/articles', (req, res) => {
    res.send({ articles })
});

/* 
Позволяет получить конерктную статью
*/
app.get('/articles/:id', checkParams(idScheme), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.param.id));

    if (article) {
        res.send({ article })
    } else {
        res.status(400);
        res.send({ article: null });
    }
});

/* 
Позволяет создать статью
*/
app.post('/articles', checkBody(articleScheme), (req, res) => {
    uniqueID += 1;

    articles.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID
    });
});


/* 
Позволяет получить отредактировать определённую статью
*/
app.put('/articles/:id', checkParams(idScheme), checkBody(articleScheme), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

/* 
Позволяет удалить статью
*/
app.delete('/articles/:id', (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        const articleIndex = articles.indexOf(article);
        articles.splice(articleIndex, 1);

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});


/* 
Отображает информацию что страница не найдена
*/
app.use((req, res) => {
    res.status(404).send({
        message: 'Url not found'
    })
});

app.listen(3000);