require('dotenv').config();

const dbConfig = {
  db: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    name: process.env.MONGO_NAME || 'migranthub',
  },
  mongoAtlasConnectionString: "mongodb://mernuser:DvKLAu2heewbme4q@cluster0-shard-00-00-vhsbh.gcp.mongodb.net:27017,cluster0-shard-00-01-vhsbh.gcp.mongodb.net:27017,cluster0-shard-00-02-vhsbh.gcp.mongodb.net:27017/migranthub?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
};

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/accounts/auth/facebook/callback',
  profileFields: ['id', 'name', 'email'],
};

module.exports = { dbConfig, facebookConfig, mongoAtlasConnectionString };
