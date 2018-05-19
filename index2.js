const webdriverio = require('webdriverio');
const options = {desiredCapabilities: {browserName: 'chrome'}};
const client = webdriverio.remote(options);

const fs = require('fs');
const path = require('path');
const request = require('request');

const file_name = path.join(__dirname, "Test_Worked.jpg");
const login = 'aleksander.kun';
const password = '7773439';
const number_photo = 2;
describe('instagram', function() {
    it('should do some chai assertions', function() {
    browser.url('https://www.instagram.com/');
     browser.pause(1000);
        browser.click('//a [@href="/accounts/login/"]');
        browser.pause(1000);
        browser.setValue('//input[@name="username"]', login);
        browser.setValue('//input[@name="password"]', password);
        browser.pause(1000);
        browser.click('//button');
        browser.pause(1000);
        browser.click('//a [@href="/"]');
        browser.setValue('//html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/input[1]', '#sea');
        browser.pause(1000);
        browser.click('//html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/a[1]/div[1]');
        browser.timeouts('page load', 4000);
        browser.waitForVisible('//html[1]/body[1]/span[1]/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[1]/div[' + number_photo + ']/a[1]/div[1]/div[1]/img[1]');
       var src = browser.getAttribute('//html[1]/body[1]/span[1]/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[1]/div[' + number_photo + ']/a[1]/div[1]/div[1]/img[1]', 'src')
        browser.pause(5000);
                   console.log(src);
                   request.head(src, (err, res) => {
                       console.log('content-type:', res.headers['content-type']);
                       console.log('content-length:', res.headers['content-length']);
                       request(src).pipe(fs.createWriteStream(file_name)).on('close', () => console.log('done'));
                   });

    });
});