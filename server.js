'use strict';

const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const MONGO_HOST = config.get('MONGO_HOST');

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
  },
});
const NotificationModel = mongoose.model('Notification', NotificationSchema);

app.get('/api/notifications', function (req, res, next) {
  NotificationModel.find({}).exec(function (error, notifications) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }
    res.json(notifications);
  });
});
app.get('/api/notifications/unread', function (req, res, next) {
  NotificationModel.find({ read: false }).exec(function (error, notifications) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }
    res.json(notifications);
  });
});
app.get('/api/notifications/unread/count', function (req, res, next) {
  NotificationModel.find({ read: false }).exec(function (error, notifications) {
    if (error) {
      console.log('Internal Error: ', error);
      res.sendStatus(500);
    }
    res.json({ count: notifications.length });
  });
});
app.put('/api/notifications/read/all', function (req, res, next) {
  NotificationModel.updateMany({ read: false }, { $set: { read: true } }).exec(
    function (error, updateResult) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json({ count: updateResult.modifiedCount });
    }
  );
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  try {
    await mongoose.connect(MONGO_HOST, { dbName: 'interview' });
    console.log(`Example app listening on port ${3000}`);
  } catch (error) {
    console.log('There was an error connecting to MongoDB', error);
    process.exit(1);
  }
});
