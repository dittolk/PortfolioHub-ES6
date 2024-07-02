////////////////////ES6
import 'dotenv/config';
import mysql2 from 'mysql2';

const config = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        host: process.env.DEV_DB_HOST,
        dialect: process.env.DEV_DB_DIALECT
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        host: process.env.TEST_DB_HOST,
        dialect: process.env.TEST_DB_DIALECT
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,
        host: process.env.PROD_DB_HOST,
        dialect: process.env.PROD_DB_DIALECT
    }
};

// const connection = mysql2.createConnection(config);

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as id', connection.threadId);
// });

export default config;

