const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkBody, checkParams } = require('./validations/validator');
const { idUser, userScheme } = require('./validations/schema');
const { number } = require('joi');
const dataFilePath = path.join(__dirname, 'users.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
let uniqueID = 0;
const app = express();


const readUsersFromFile = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};
const users = readUsersFromFile();
uniqueID = users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
const writeUsersToFile = (users) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

app.use(express.json());

/* 
Позволяет получить все стати
*/
app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

/* 
Позволяет получить конерктную статью
*/
app.get('/users/:id', checkParams(idUser), (req, res) => {
    const users = readUsersFromFile();
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user })
    } else {
        res.status(400);
        res.send({ user: null });
    }
});

/* 
Позволяет создать статью
*/
app.post('/users', checkBody(userScheme), (req, res) => {
    const users = readUsersFromFile();
    uniqueID += 1;
    const newUser = {
        id: uniqueID,
        ...req.body,
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.send({ id: uniqueID });
});


/* 
Позволяет получить отредактировать определённую статью
*/
app.put('/users/:id', checkParams(idUser), checkBody(userScheme), (req, res) => {
    const users = readUsersFromFile();
    const index = users.findIndex((u) => u.id === Number(req.params.id));
    if (index !== -1) {
        users[index] = { id: Number(req.params.id), ...req.body };
        writeUsersToFile(users);
        res.json(users[index]);
    } else {
        res.status(404);
        res.send({ user: null });
    }
});

/* 
Позволяет удалить статью
*/
app.delete('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const newUsers = users.filter((u) => u.id !== Number(req.params.id));
    if (users.length !== newUsers.length) {
        writeUsersToFile(newUsers);
        res.send({ newUsers });
    } else {
        res.status(400);
        res.send({ user: null });
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