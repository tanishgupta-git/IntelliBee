const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Article = require('../models/article');
const User = require('../models/user');

exports.getArticles = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const totalItems = await Article.find().countDocuments();
    const articles = await Article.find()
      .populate('creator')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched articles successfully.',
      articles: articles,
      totalItems: totalItems
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTopArticles = async (req,res,next) => {
  try {
    const articles = await Article.find().sort({ clicks : -1}).limit(5);
    res.status(200).json({
      message: 'Fetched top articles successfully.',
      articles: articles
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUserArticles = async (req,res,next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   try {
    const totalItems =await Article.find({ creator : req.userId}).countDocuments();
    const articles =await Article.find({ creator : req.userId})
       .populate('creator')
       .sort({ createdAt: -1 })
       .skip((currentPage - 1) * perPage)
       .limit(perPage);
 
     res.status(200).json({
       message: 'Fetched articles successfully.',
       articles: articles,
       totalItems: totalItems
     });
 
   } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   } 
}
exports.createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    return next(error);
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    return next(error);
  }
  const imageUrl = req.file.path.replace(/\\/g ,"/");
  const title = req.body.title;
  const content = req.body.content;
  const article = new Article({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  try {
    await article.save();
    const user = await User.findById(req.userId);
    user.articles.push(article);
    await user.save();
    res.status(201).json({
      message: 'P created successfully!',
      article: article,
      creator: { _id: user._id, name: user.username }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findById(articleId);
    article.clicks = article.clicks + 1;
    await article.save();
    if (!article) {
      const error = new Error('Could not find Article.');
      error.statusCode = 404;
      return next(error);
    }
    const user = await User.findById(article.creator);
    res.status(200).json({ message: 'Article Fetched.', article:article,username:user.username });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateArticle = async (req, res, next) => {
const articleId = req.params.articleId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    return next(error);
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path.replace(/\\/g ,"/");
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    return next(error);
  }
  try {
    const article = await Article.findById(articleId).populate('creator');
    if (!article) {
      const error = new Error('Could not find Article.');
      error.statusCode = 404;
      return next(error);
    }
    if (article.creator._id.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      return next(error);
    }
    if (imageUrl !== article.imageUrl) {
      clearImage(article.imageUrl);
    }
    article.title = title;
    article.imageUrl = imageUrl;
    article.content = content;
    const result = await article.save();
    res.status(200).json({ message: 'Article updated!', article: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteArticle = async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findById(articleId);

    if (!article) {
      const error = new Error('Could not find article.');
      error.statusCode = 404;
      return next(error);
    }
    if (article.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(article.imageUrl);
    await Article.findByIdAndRemove(articleId);

    const user = await User.findById(req.userId);
    user.articles.pull(articleId);
    await user.save();
    res.status(200).json({ message: 'Deleted article.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// function for clear image
const clearImage = filePath => {
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => {
        console.log(err);
    })
  }
