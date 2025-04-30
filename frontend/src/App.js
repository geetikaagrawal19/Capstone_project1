import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SessionOverPage from './components/SessionOverPage';
import Tutorial from "./components/Tutorial";
import Home from "./components/Home";
import Header from "./components/Header";
import Contact from "./components/Contact";
//import AnalyzeLogs from "./components/AnalyzeLogs";        // <-- NEW
//import AnalyzeImages from "./components/AnalyzeImages";    // <-- NEW
//import AnalyzeDocuments from "./components/AnalyzeDocuments"; // <-- NEW

// New model components
import ImagePredictor from "./components/ImagePredictor";
import DocPredictor from "./components/DocPredictor";
import LogPredictor from "./components/LogPredictor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/session-over' element={<SessionOverPage />} />

        <Route path='/home' element={
          <>
            <Header />
            <Home />
          </>
        } />
        <Route path='/tutorial' element={
          <>
            <Header />
            <Tutorial />
          </>
        } />
        <Route path='/contacts' element={
          <>
            <Header />
            <Contact />
          </>
        } />
        <Route path='/analyze/logs' element={
          <>
            <Header />
            <LogPredictor />
          </>
        } />
        <Route path='/analyze/images' element={
          <>
            <Header />
            <ImagePredictor />
          </>
        } />
        <Route path='/analyze/documents' element={
          <>
            <Header />
            <DocPredictor />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;