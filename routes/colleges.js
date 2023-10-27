const express = require('express');
const router = express.Router();
const colleges = require('../controllers/colleges');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCollege } = require('../middleware');

const College = require('../models/college');
const college = require('../models/college');

router.route('/')
    .get(catchAsync(colleges.index))
    .post(isLoggedIn, validateCollege, catchAsync(colleges.createCollege))

router.get('/new', isLoggedIn, colleges.renderNewCollegeForm)

router.route('/:id')
    .get(catchAsync(colleges.showCollege))
    .put(isLoggedIn, isAuthor, validateCollege, catchAsync(colleges.updateCollege))
    .delete(isLoggedIn, isAuthor, catchAsync(colleges.deleteCollege));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(colleges.renderEditCollegeForm))



module.exports = router;