import React from 'react'

import './App.css'

import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import AboutUs from './components/student/AboutUs'
import ContactUs from './components/student/ContactUs'
import PrivacyPolicy from './components/student/PrivacyPolicy'
import Footer from './components/student/Footer'



const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute&&<Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/course-list' element={<CoursesList/>}/>
        <Route path='/course-list/:input' element={<CoursesList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
          <Route path='/educator' element={<Dashboard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-courses' element={<MyCourses/>}/>
          <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>  
      
    </div>
  )
}

export default App