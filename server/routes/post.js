const router = require('express').Router();
const { add, all, downvote, edit, upvote, remove } = require('../controllers/posts.controller');

router.get('/all', all);
router.post('/add', add);
router.put('/edit/:id', edit);
router.post('/upvote/:id', upvote);
router.post('/downvote/:id', downvote);
router.delete('/delete/:id', remove);

module.exports = router;
