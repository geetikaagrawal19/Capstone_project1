// src/components/Contact.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="form-section">
        <h2 className="contact-title">Get the support you need!</h2>
        <form className="contact-form">
          <div className="input-group">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Email" required />
          <input
            type="text"
            placeholder="Mobile Number"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <textarea placeholder="Query" rows="4" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="info-section">
        <div className="info-box">
          <p className="info-title">Our Email-ID:</p>
          <p className="info-email">DetectifAI@gmail.com</p>
        </div>
        <div className="social-box">
          <p className="info-title">Connect With Us</p>
          <div className="social-images">
            <a
              href="https://www.instagram.com/detectifai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/instagram.jpg"
                alt="Instagram"
                className="social-image"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/detectifai-958086363/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/linkdein.png"
                alt="LinkedIn"
                className="social-image"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
