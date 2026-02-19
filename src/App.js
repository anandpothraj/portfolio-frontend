import './App.css';
import React from 'react';
import Home from './pages/Home';
// import Chat from './pages/Chat';
// import Blogs from './pages/Blogs';
import About from './pages/About';
import Report from './pages/Report';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Socials from './pages/Socials';
import Feedback from './pages/Feedback';
import Projects from './pages/Projects';
import Invoice from './pages/Invoice';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import GoToTop from './components/GoToTop/GoToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
        <ToastContainer/>
        <GoToTop/>
        <Header/>
        <div className="bg-dark p-1">
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/projects' element={<Projects/>} exact/>
          {/* <Route path='/blogs' element={<Blogs/>} exact/> */}
          <Route path='/about' element={<About/>} exact/>
          <Route path='/contact' element={<Contact/>} exact/>
          <Route path='/socials' element={<Socials/>} exact/>
          <Route path='/report' element={<Report/>} exact/>
          <Route path='/privacy-policy' element={<Privacy/>} exact/>
          <Route path='/feedback' element={<Feedback/>} exact/>
          <Route path='/invoice' element={<Invoice/>} exact/>
          {/* <Route path='/chat' element={<Chat/>} exact/> */}
        </Routes>
        </div>
        <Footer/>
    </Router>
  );
};

export default App;