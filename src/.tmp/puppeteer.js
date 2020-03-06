const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://node-js.loc:3000/v1/users/');
  // Get Array Emails
  const data = await page.evaluate(() => 
    Array.from(document.querySelectorAll('.email'), 
    e => e.innerHTML));

  // Connect to the db
  const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});

  client.connect().then((client)=>{
    const db = client.db('users_db');
  // Insterted Emails to DB
    db.collection('GrabbingEmails', (err, collection) => {
      data.forEach(element => {
        collection.insertOne({email:element});
      });
      if(err) throw err;    
      console.log('Emails inserted to the database');
    });  
  // Close MongoClient
    setTimeout(function(){
      client.close();
    },1000);
  });

  await browser.close();
})();