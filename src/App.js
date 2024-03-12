import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHolder from './components/layout/AppHolder';
import CategoryForm from './components/views/CategoryForm';
import CourseForm from './components/views/CourseForm';
import Dashboard from './components/views/Dashboard';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppHolder />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-category" element={<CategoryForm />} />
          <Route path="/create-course" element={<CourseForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;