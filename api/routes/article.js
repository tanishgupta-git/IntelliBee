const express = require('express');
const { body } = require('express-validator/check');
const articleController = require('../controllers/article');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/',isAuth,articleController.getArticles);
router.get('/toparticles',isAuth,articleController.getTopArticles)
router.get('/dashboard',isAuth,articleController.getUserArticles);
router.post('/article',isAuth,[
    body('title').trim().isLength({ min : 5}),
    body('content').trim().isLength({ min : 5})
],articleController.createArticle);
router.get('/article/:articleId',isAuth,articleController.getArticle);
router.put('/article/:articleId',isAuth,[
    body('title').trim().isLength({ min : 5}),
    body('content').trim().isLength({ min : 5})
],articleController.updateArticle)
router.delete('/article/:articleId',isAuth,articleController.deleteArticle);
module.exports = router;