// const newArray = [1, 2, 3, 4, 5];
// const sum = newArray.reduce((acc, nubmer) => acc += nubmer, 0);
// console.log('Результат сложения массива: ', sum);

const http = require('http');
let countMain = 0;
let countAbout = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        ++countMain;
        res.writeHead
        res.writeHead(200, {
            'Content-type': 'text/html; charset=UTF-8'
        });
        res.end(`<a href="/about">Ссылка на страницу About</a> <p>На текущей странице кол-во: ${countMain}</p>`);
    }
    else if (req.url === '/about') {
        ++countAbout;
        res.writeHead(200, {
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end(`<a href="/">Ссылка на основную страницу</a> <p>На текущей странице кол-во: ${countAbout}</p>`);
    } else {
        res.writeHead(200, {
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Страница не найда</h1>');
    }
});
const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
})