const express = require('express');
const { body } = require('express-validator');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// get all posts
router.get(
  '/posts',
  isAuth,
  feedController.getPosts
);

// create a post 
router.post(
  '/post',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

// get a single post
router.get(
  '/post/:postId',
  isAuth,
  feedController.getPost
);

// edit a post
router.put(
  '/post/:postId',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete(
  '/post/:postId',
  isAuth,
  feedController.deletePost,
)

module.exports = router;