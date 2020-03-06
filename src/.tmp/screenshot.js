const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const MongoClient = require('mongodb').MongoClient;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://node-js.loc:3000/v1/users/');
  await page.screenshot({path: 'src/.tmp/files/photo.jpg'});

// If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  const TOKEN_PATH = 'token.json';

/**
* Create an OAuth2 client with the given credentials, and then execute the given callback function.
*/
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                  if (err) return console.error(err);
                  console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
          });
      });
  }
  /**
  * Describe with given media and metaData and upload it using google.drive.create method()
  */ 
  function uploadFile(auth) {
    const drive = google.drive({version: 'v3', auth});
    const fileMetadata = {
      'name': 'photo.jpg',
      parents: ['0B0-DahDqsgS_WTk4TlBWamVOeTA']
    };
    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('src/.tmp/files/photo.jpg')
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        let link = 'https://drive.google.com/open?id='+file.data.id;
        // Connect to the db
        const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});
        client.connect().then((client)=>{
          const db = client.db('users_db')
          db.collection('screenshots').insertOne({imageLink: link}, (err, result)=>{
            if(err) throw err;    
            console.log('Link inserted to the database');
            client.close();
          });
        })
      }
    });
  }
  
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadFile);
  });

  await browser.close();
})();
  



