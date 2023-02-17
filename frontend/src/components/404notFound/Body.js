import React from "react";
import "./Body.css";
import image from "./Scarecrow.png";


const Body = () => {
  return (
    <>
    <header>
      <p>404 Not Found</p>
    </header>
    <section>
      <div className="contain-img">
        <img src={image} alt="Imagen" />
      </div>
      <div className="text-description">
        <h1>I have bad news for you</h1>
        <p>
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
      </div>
    </section>
    <footer>
    <p className="attribution">
      Made with &#10084; by <a href="https://github.com/vorachaitya/HackNiche_MightyDevs">MightyDevs</a> 
    </p>
  </footer>
    </>
  );
};

export default Body;
