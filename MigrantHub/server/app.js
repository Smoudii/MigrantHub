const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const expressSession = require('express-session');
const router = require('./routes/Index');

const { dbConfig } = require('./config');
const passport = require('./passport');
const { logger, formatMessage } = require('./config/winston');

<<<<<<< HEAD

const OrgService = require('./models/OrgService');
=======
const fs = require('fs');
const OrgService = require("./models/OrgService");
>>>>>>> 0c3e1ad8f70330f5a6d4d17fbddb967694b7ab62


const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer"', { stream: logger.streamProd }));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer"', { stream: logger.streamDev }));
}

app.use(
  expressSession({
    secret: 'publication-biology',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (err) {
      logger.info(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, err.status, req.referer, '-', err.message));
    } else {
      logger.info(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, req.statusCode, req.referer, '-', '-'));
    }
  } else if (err) {
    logger.debug(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, err.status, req.referer, '-', err.message));
  } else {
    logger.debug(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion, req.statusCode, req.referer, '-', '-'));
  }
  next();
});

// MongoDB/Mongoose Connection
const { db: { host, port, name } } = dbConfig;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, (error) => {
  if (error) {
    console.error('Check if MongoDB is installed and running.');
    throw error;
  }
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));


// Inputting all the Services Located in Montreal
const servicesSchemaKeyList = ['categorie', 'category', 'subCategorie', 'subCategory', 'acronym', 'organisation', 'organization', 'description', 'address', 'city',
  'province', 'postalCode', 'metro', 'openHours', 'phone1', 'phone2', 'fax', 'website', 'email', 'notes'];

const date = new Date();
const lineList = fs.readFileSync('mtlServices.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.

// Recursively go through file adding services.
function createDocRecurse(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  if (lineList.length) {
    let line = lineList.shift();
    const doc = new OrgService();
    let location = {
      address: '',
      city: '',
      province: '',
      postalCode: '',
      metro: '',
    };
    line.split(';').forEach(function (entry, i) {
      doc[servicesSchemaKeyList[i]] = entry;
      doc['dateCreated'] = date;

      //Location
      if(i == 8) location.address = entry;
      else if (i == 9) location.city = entry;
      else if (i == 10) location.province = entry;
      else if (i == 11) location.postalCode = entry;
      else if (i == 12) location.metro = entry;
      else if (i == 13) doc['location'] = location;
    });
    doc.save(createDocRecurse);
  } else {
      
  }
}

createDocRecurse(null);

module.exports = app;
