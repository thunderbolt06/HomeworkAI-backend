const express = require('express');

const homeworkController = require('../controllers/homework-controllers');

const router = express.Router();

router.post(
  '/ask',homeworkController.askQuestion
);



module.exports = router;
