const router = require('express').Router();
const { signin, signup, userid } = require('../controllers/users.controllers');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/userid', userid);

module.exports = router;
