const puppeteer = require('puppeteer');
const Mongo = require('mongodb').MongoClient;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/v1/users/');
  // Get Array Emails
  const data = await page.evaluate(() => Array.from(document.querySelectorAll('.email'),
    (element) => element.innerHTML));

  // Connect to the DB
  const client = new Mongo('mongodb://localhost:27017', { useUnifiedTopology: true });

  client.connect().then(() => {
    const db = client.db('users_db');
    // Insterted Emails to DB
    db.collection('GrabbingEmails').insertOne({ email: data }, (err) => {
      if (err) throw err;
      console.log('Emails inserted to the database');
      client.close();
    });
  });
  await browser.close();
})();
