// ./routers/frontend/index.js
const express = require('express');
const router = express.Router();

router.use(require('./albums/photo-album.route'));
router.use(require('./albums/video-album.route'));
router.use(require('./specialty.route'));
router.use(require('./employee.route'))
router.use(require('./news.route'));
router.use(require('./events.route'));
router.use(require('./socials.route'));
router.use(require('./models.route'));

module.exports = router;
