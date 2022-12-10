const schema = require('../../config/schema');

const getNotifications = function (req, res, next) {
    schema.notificationModel.find({}).exec(function (error, notifications) {
        if (error) {
            console.log('Internal Error: ', error);
            res.sendStatus(500);
        }
        res.json(notifications);
    });
}

const getUnReadNotifications = function (res, res, next) {
    schema.notificationModel.find({ read: false }).exec(function (error, notifications) {
        if (error) {
            console.log('Internal Error: ', error);
            res.sendStatus(500);
        }
        res.json(notifications);
    });
}

const getUnReadNotificationsCount = function (req, res, next) {
    schema.notificationModel.find({ read: false }).exec(function (error, notifications) {
        if (error) {
            console.log('Internal Error: ', error);
            res.sendStatus(500);
        }
        res.json({ count: notifications.length });
    });
}

const readAllNotifications = function (req, res, next) {
    schema.notificationModel.updateMany({ read: false }, { $set: { read: true } }).exec(
        function (error, updateResult) {
            if (error) {
                console.log('Internal Error: ', error);
                res.sendStatus(500);
            }
            res.json({ count: updateResult.modifiedCount });
        });
}
const readNotificationById = function (req, res, next) {
    schema.notificationModel.updateOne({ _id: req.params.id }, { $set: { read: true } }).exec(
        function (error, updateResult) {
            if (error) {
                console.log('Internal Error: ', error);
                res.sendStatus(500);
            }
            res.json({ count: updateResult.modifiedCount });
        }
    );
}

const getNotificationById = function (req, res, next) {
    schema.notificationModel.find({ _id: req.params.id }).exec(function (error, notifications) {
        if (error) {
            console.log('Internal Error: ', error);
            res.sendStatus(500);
        }
        res.json(notifications);
    });
}

module.exports = {
    getNotifications: getNotifications,
    getUnReadNotifications: getUnReadNotifications,
    getUnReadNotificationsCount: getUnReadNotificationsCount,
    readAllNotifications: readAllNotifications,
    readNotificationById: readNotificationById,
    getNotificationById:getNotificationById
}