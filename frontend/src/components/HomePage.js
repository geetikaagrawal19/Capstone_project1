// HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const initialHeroHeight = window.innerHeight * 0.8;
  const finalHeroHeight = 60;
  const scrollThreshold = window.innerHeight * 0.3;

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/session-over');
  };
  const handleMainPage = async () => {
    navigate('/home');
  }

  const heroProgress = Math.min(1, scrollPosition / scrollThreshold);
  const heroHeight = initialHeroHeight * (1 - heroProgress) + finalHeroHeight * heroProgress;
  const heroScale = 1 - heroProgress * 0.3;
  const heroTranslateY = -scrollPosition * 0.6 * heroProgress;
  const heroOpacity = 1 - heroProgress * 0.7;

  const heroWidth = '100%'; // Always full width

  const aboutPaddingTop = Math.max(finalHeroHeight, initialHeroHeight * (1 - heroProgress));

  const heroStyle = {
    height: `${heroHeight}px`,
    transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
    opacity: Math.max(0, heroOpacity),
    position: 'fixed',
    top: 0,
    left: 0,
    width: heroWidth,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
  };

  const aboutStyle = {
    paddingTop: `${aboutPaddingTop}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    zIndex: 5,
    paddingBottom: '150px',
    textAlign: 'center',
  };

  return (
    <div className="home-container">
      {/* Blue Top Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-content" style={{ opacity: Math.max(0, 1 - heroProgress * 2) }}>
          <h1>Welcome to DetectifAI</h1>
          <p>Empowering your analysis journey with cutting-edge technology. Detect, Analyze, and Evolve with us!</p>
          <div className="scroll-down-arrow">↓</div>
        </div>
      </section>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      {/* White About Section */}
      <section className="about-section" style={aboutStyle}>
        <div className="about-content">
          <h2>About DetectifAI</h2>
          <p>
            DetectifAI is a platform designed to revolutionize your analysis workflows.
            We leverage the power of artificial intelligence to provide you with
            intelligent insights and powerful tools. Whether you are a seasoned professional
            or just starting your analytical journey, DetectifAI is here to empower you.
          </p>
          <p>
            Explore our features to discover how DetectifAI can help you detect patterns,
            analyze complex data, and evolve your understanding. Join our community and
            unlock the future of analysis.
          </p>
          <div className="auth-button-container">
            {user ? (
              <>
                <p>Hello, {user.displayName || user.email}!</p>
                <button onClick={handleLogout} className="auth-button">Logout</button>
                <button onClick={handleMainPage} className="auth-button">Home</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="auth-button">Login</button>
                <button onClick={() => navigate('/register')} className="auth-button">Register</button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;