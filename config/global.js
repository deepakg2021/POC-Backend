'use strict';

var path = require('path');
var _ = require('lodash');

//database credentials for development mode
 var db_development = {
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/mynodedb',
    options: {
        //useMongoClient: true,
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,  
    }
  }
}
//database credentials for production mode 
 var db_production = {
  mongo: {
    uri:'mongodb://mongo_db_user:mongodb_password@localhost:27019/mynodedb',
    options: {
        useNewUrlParser: true,
        //useMongoClient: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,  
    }
  }
}


var all = {
    mailconfig: {
      transport: {
            smtp: {
                host: 'mail.dotsquares.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'samay.singh@dotsquares.com',
                    pass: 'iyXP_@X4LU@2'
                },
                tls: {
                    rejectUnauthorized:false
                }
            }
      },
      adminEmail: 'wwwsmtp@24livehost.com',
      mailOptions: {
        from: '"MyProject" <samay.singh@dotsquares.com>', // sender address
        sender: 'samay.singh@dotsquares.com',
        replyTo: 'samay.singh@dotsquares.com'  
      }
  },
 
  ENV: process.env.NODE_ENV,
  // Root path of server
  ROOTPATH: path.normalize(__dirname + '/../'),
  // Upload files directory path of server
  UPLOADDIRPATH: path.normalize(__dirname + '/../uploads/'),
  // Server port
  PORT: process.env.PORT || 3001,//80,
  // Server IP
  IP: process.env.IP || '0.0.0.0',
  // Should we populate the DB with sample data?
  seedDB: false,
  // Secret for session, you will want to change this and make it an environment variable
  SECRETES: {
    session: 'PjH7XCkNlI8mhvm747gMnz3A'
  },
  //mail configs
  ADMINEMAIL: 'admin@example.com', 
  NOREPLYEMAIL: 'noleply@example.com',
  //token refresh time
  TOKEN_REFRESH_TIME: 2 * 60,
  TOKEN_EXPIRY_TIME: 60 * 60 * 24 * 365 * 200, //number of seconds (here it's 200 years)
  jwtSecret: "PjH7XCkNlI8mhvm747gMnz3AisIMjHzUCa3TJAJ4lWDe6duxKkKY0gFklCFi4i1wh7BU2iYpxmKOGwJqwmWKR6Idsx5w5yGpq2Ea0By8JvNi7TSGf04szRBrhaumVQSd",
  jwtSession: {
     session: false
  },
  siteurl : "http://localhost:3000",
  backendUrl: "http://localhost:3001", 
  whitelistOrigins : ['http://localhost:3000'],
  whitelistHosts : ['localhost:3000']
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(
  all,
  process.env.NODE_ENV !== 'development' ? db_development : db_development
);
