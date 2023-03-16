const express = require('express');
const courseRouter = require('./course.router');
const studentRouter = require('./student.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/students', studentRouter)
router.use('/courses', courseRouter)


module.exports = router;