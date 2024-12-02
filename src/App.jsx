import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPages from "./Pages/LayoutPages";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Home from "./Pages/Home";
import TermsofService from "./Pages/TermsofService";
import Blogs from "./Pages/Blogs";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LayoutPages />}>
            <Route path="/" element={<Home title={"YouTube to MP4 Converter"}/>} />
            <Route path="youtube-to-wav-downloader" element={<Home title={"YouTube to WAV Downloader"}/>} />
            <Route path="youtube-to-aac" element={<Home title={"Youtube To AAC"}/>} />
            <Route path="youtube-to-flac" element={<Home title={"Youtube To FLAC"}/>} />
            <Route path="about-us" element={<About />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsofService />} />
            <Route path="blogs" element={<Blogs />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
