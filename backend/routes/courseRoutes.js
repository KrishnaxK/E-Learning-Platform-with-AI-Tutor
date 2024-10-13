// backend/routes/courseRoutes.js
const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
    const { title, description, instructor, materials } = req.body;
    const newCourse = new Course({ title, description, instructor, materials });
    await newCourse.save();
    res.status(201).json(newCourse);
});

// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find().populate('instructor', 'username');
    res.json(courses);
});

module.exports = router;
