// src/pages/CourseList.js
import React from 'react';
import useFetch from '../hooks/useFetch';
import CourseCard from '../components/CourseCard';

const CourseList = () => {
  // Use the useFetch hook to fetch courses from your API
  const { data: courses, loading, error } = useFetch('http://localhost:5000/courses');

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error fetching courses: {error.message}</div>; // Handle errors

  return (
    <div>
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
