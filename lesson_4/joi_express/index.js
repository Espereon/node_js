const express = require('express');
const joi = require('joi');

const app = express();

let uniqueID = 0;
const articles = [];

const articleScheme = joi.object({
    title: joi.string().min(5).required(),
    content: joi.string().min(10).required(),
});

const idScheme = joi.object({
    id: joi.number().required(),
});

app.use(express.json());

app.get('/articles', (req, res) => {
    res.send({ articles })
});

app.get('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const article = articles.find((article) => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.post('/articles', (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({ error: 'Invalid title' });
    }

    if (!req.body.content) {
        return res.status(400).send({ error: 'Invalid content' });
    }

    if (req.body.title.length <= 5) {
        return res.status(400).send({ error: 'Title must be more than 5 characters' })
    }

    if (req.body.content.length <= 10) {
        return res.status(400).send({ error: 'Content must be more than 10 characters' })
    }

    uniqueID += 1;
    articles.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID
    });
});

app.put('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const articleValidateResult = articleScheme.validate(req.body);
    if (articleValidateResult.error) {
        return res.status(400).send(articleValidateResult.error.details);
    }
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

app.listen(3000);
