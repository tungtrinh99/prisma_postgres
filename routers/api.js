const express = require('express');
const router = express.Router();
const multer = require('multer');

const {userController} = require('../controllers/user.controller');
const {womanController} = require('../controllers/woman.controller');
const {messageController} = require('../controllers/message.controller');
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true);
}

const upload = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// user
router.get('/users', userController().index);
router.get('/users/:id', userController().detail);
// woman
router.get('/women', womanController().index);
router.get('/women/:id', womanController().detail);
router.post('/women', womanController().create);
router.post('/women/:id', upload.single('file'), womanController().update);
// message
router.get('/messages', messageController().index);
module.exports = router;
