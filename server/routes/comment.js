const router = require('express').Router();
const { all, add, remove, upvote, downvote} = require('../controllers/comments.controller');

router.get('/all', all);
router.post('/add', add);
router.delete('/delete/:id', remove);
router.post('/upvote/:id', upvote);
router.post('/downvote/:id', downvote);

module.exports = router;
