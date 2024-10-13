const Course = require('../models/Course');
const responseHandler = require('../utils/responseHandler');

const CourseController = {
  
  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find().populate('instructor', 'name');
      return responseHandler.success(res, 'Courses fetched successfully', courses);
    } catch (error) {
      return responseHandler.error(res, 'Failed to fetch courses');
    }
  },

  // Get a course by ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate('instructor', 'name');
      if (!course) {
        return responseHandler.error(res, 'Course not found', 404);
      }
      return responseHandler.success(res, 'Course fetched successfully', course);
    } catch (error) {
      return responseHandler.error(res, 'Failed to fetch course');
    }
  },

  // Create a new course
  createCourse: async (req, res) => {
    const { title, description, instructor } = req.body;
    try {
      const course = new Course({ title, description, instructor });
      await course.save();
      return responseHandler.success(res, 'Course created successfully', course, 201);
    } catch (error) {
      return responseHandler.error(res, 'Failed to create course');
    }
  },

  // Update an existing course by ID
  updateCourse: async (req, res) => {
    const { title, description } = req.body;
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return responseHandler.error(res, 'Course not found', 404);
      }

      // Update course details
      course.title = title || course.title;
      course.description = description || course.description;
      await course.save();

      return responseHandler.success(res, 'Course updated successfully', course);
    } catch (error) {
      return responseHandler.error(res, 'Failed to update course');
    }
  },

  // Delete a course by ID
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return responseHandler.error(res, 'Course not found', 404);
      }
      return responseHandler.success(res, 'Course deleted successfully', {});
    } catch (error) {
      return responseHandler.error(res, 'Failed to delete course');
    }
  },
};

module.exports = CourseController;
