const express = require('express');
const router = express.Router();
const notifications = require('./notifications/notifications');

router.get('/api/notifications', notifications.getNotifications);
router.get('/api/notifications/unread', notifications.getUnReadNotifications);
router.get('/api/notifications/unread/count', notifications.getUnReadNotificationsCount);
router.put('/api/notifications/read/all', notifications.readAllNotifications);
router.put('/api/notifications/read/:id', notifications.readNotificationById);
router.get('/api/notifications/:id', notifications.getNotificationById);

module.exports = router;