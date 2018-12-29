const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const expressSession = require('express-session');
const router = require('./routes/Index');

const { dbConfig } = require('./config');
const passport = require('./passport');
const { logger, formatMessage } = require('./config/winston');

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
var fs = require('fs');
var lineList = fs.readFileSync('mtlServices.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.

var servicesSchemaKeyList = ['Categorie', 'Category', 'SubCategorie', 'SubCategory', 'Acronym', 'Organisation', 'Organization', 'Description', 'Address', 'City', 'Province', 'PostalCode', 'Metro', 'OpenHours', 'Phone1', 'Phone2', 'Fax', 'Website', 'Email', 'Notes'];

var servicesMtlSchema = new mongoose.Schema({
  Categorie: String,
  Category: String,
  SubCategorie: String,
  SubCategory: String, 
  Acronym: String,
  Organisation: String,
  Organization: String,
  Description: String,
  Address: String,
  City: String,
  Province: String,
  PostalCode: String,
  Metro: String,
  OpenHour: String,
  Phone1: String,
  Phone2: String,
  Fax: String,
  Website: String,
  Email: String,
  Notes: String
});

var servicesMtlDoc = mongoose.model('ServicesMtl', servicesMtlSchema);

function queryAllEntries () {
  servicesMtlDoc.aggregate([
      {
        Categorie: '$Categorie',
        Category: '$Category',
        SubCategorie: '$SubCategorie',
        SubCategory: '$SubCategory', 
        Acronym: '$Acronym',
        Organisation: '$Organisation',
        Organization: '$Organization',
        Description: '$Description',
        Address: '$Address',
        City: '$City',
        Province: '$Province',
        PostalCode: '$PostalCode',
        Metro: '$Metro',
        OpenHour: '$OpenHour',
        Phone1: '$Phone1',
        Phone2: '$Phone2',
        Fax: '$Fax',
        Website: '$Website',
        Email: '$Email',
        Notes: '$Notes'
      }, function(err, qDocList) {
      console.log(util.inspect(qDocList, false, 10));
      process.exit(0);
  }]);
}

// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse (err) {
  if (err) {
      console.log(err);
      process.exit(1);
  }
  if (lineList.length) {
      var line = lineList.shift();
      var doc = new servicesMtlDoc();
      line.split(';').forEach(function (entry, i) {
          doc[servicesSchemaKeyList[i]] = entry;
      });
      doc.save(createDocRecurse);
  } else {
      // After the last entry query to show the result.
      queryAllEntries();
  }
}

createDocRecurse(null);

module.exports = app;
