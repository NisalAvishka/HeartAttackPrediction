import React from "react";
import Navigation from "../Navigation/Navigation";
import './Home.css';

function Home() {
  return (
    <div>
      <Navigation />
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="fourth.png" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="second.png" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="third.png" alt="Third slide" />
        </div>
      </div>
    </div>
    <footer className="footer-bar">
      <p className="footer-text">Contact Us On - contact@hearthealth.com</p>
    </footer>
    </div>

    
  );
}

export default Home;
