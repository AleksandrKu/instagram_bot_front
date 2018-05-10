const fs = require('fs');
const requestModul = require('request');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

const webdriverio = require('webdriverio');
const options = {desiredCapabilities: {browserName: 'chrome'}};
const client = webdriverio.remote(options);

const file_name = path.join(__dirname, "Test_Worked.jpg");
const login = 'aleksander.kun';
const password = '7773439';
const number_photo = 2;
const search_word = "sea";

app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));

//.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')

app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName}   ${request.body.password}
    ${request.body.number}
    ${request.body.searchWord}`);
    client
        .init()
        .url('https://www.instagram.com/')
        .pause(1000)
        .click('//a [@href="/accounts/login/"]')
        .pause(1000)
        .setValue('//input[@name="username"]', login)
        .pause(1000)
        .setValue('//input[@name="password"]', password)
        .pause(1000)
        .click('//button').then(() => console.log("logged"))
        .pause(1000)
        .click('//a [@href="/"]')
        .pause(2000)
        .setValue('/html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/input[1]', '#'+search_word)
        .pause(2000)
        .click('/html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/a[1]/div[1]')
        .pause(4000)
        .getAttribute('/html[1]/body[1]/span[1]/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[1]/div[' + number_photo + ']/a[1]/div[1]/div[1]/img[1]', 'src')
        .then(src => {
            console.log(src);
            console.log(request);
            requestModul.head(src, (err, res) => {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
                requestModul(src).pipe(fs.createWriteStream(file_name)).on('close', () => console.log('done'));
            });
        })
        .pause(4000)
        .end();
});

app.get('/', (req, res) => res.render('pages/index'));


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
