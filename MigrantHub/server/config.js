require('dotenv').config();

const dbConfig = {
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    name: process.env.MONGO_NAME || 'migranthub',
  },
  mongoAtlasConnectionString: process.env.MONGO_ATLAS,
};

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://35.203.28.214:3000/api/accounts/auth/facebook/callback',
  profileFields: ['id', 'name', 'email'],
};

module.exports = { dbConfig, facebookConfig };
