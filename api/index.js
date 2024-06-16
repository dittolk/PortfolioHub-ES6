//////////ES6////////////////

import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import router from './main.router.js';
import redisClient from './config/redis.config.js';

const PORT = 2000;
const app = express();

redisClient.connect().catch(console.error);
app.use(cors());
app.use(express.json());
app.use('/public', express.static('./public'))
app.use('/api', router);

app.get('/api', (req, res) => {
  res.send('My API');
});

app.listen(PORT, async () => {
  // Uncomment and sync database as needed
  // await db.sequelize.sync({ alter: true });
  // await db.sequelize.sync({ force: true });
  console.log(`Server running on Port: ${PORT}`);
});

