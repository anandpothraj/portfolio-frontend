import './App.css';
import React from 'react';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Report from './pages/Report';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';
import Projects from './pages/Projects';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoToTop from './components/GoToTop/GoToTop';


const App = () => {
  return (
    <Router>
        <GoToTop/>
        <Header/>
        <div className="bg-dark p-1">
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/projects' element={<Projects/>} exact/>
          <Route path='/blogs' element={<Blogs/>} exact/>
          <Route path='/about' element={<About/>} exact/>
          <Route path='/contact' element={<Contact/>} exact/>
          <Route path='/report' element={<Report/>} exact/>
          <Route path='/privacy-policy' element={<Privacy/>} exact/>
          <Route path='/feedback' element={<Feedback/>} exact/>
        </Routes>
        </div>
        <Footer/>
    </Router>
  );
};

export default App;