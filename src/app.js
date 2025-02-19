require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const logger = require('../utils/logger');

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(routes);

const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('✅ MongoDB connected!');
    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
