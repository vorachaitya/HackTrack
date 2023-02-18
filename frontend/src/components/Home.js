
import './css/home.css'
import Footer from './Footer';
import Navi from './Navi';
const Home = () => {
  return (
    <>
    {/* <nav>
  <div className="logo">
    <div className="arrow-down"></div>
  </div>
  <ul >
    <a style={{textDecoration:'none'}} href="/"><li>Home</li></a>
    <a style={{textDecoration:'none'}} href="/video"><li>Video Conferencing</li></a>
    <a style={{textDecoration:'none'}} href="/chat"><li>Chat</li></a>
    <a style={{textDecoration:'none'}} href="/timeline"><li>Timeline</li></a>
    <a style={{textDecoration:'none'}} href="/admin"><li>Admin</li></a>
    <a style={{textDecoration:'none'}} href="/logout"><li>Logout</li></a>
 
  
  </ul>
</nav> */}
<Navi/>
<section className="banner">
  <div className="container">
    <div className="banner-text">
      <h1>Hack Track</h1>
      <p>We make it easy to streamline the process of shortlisting teams for Hackathons. Our tools along with it's user friendly features make it simple to select best teams from a large volume of applicants for your hackathon</p>
      <button><a href="http://localhost:8501" style={{color:"white"}}>Sign Up</a></button>
    </div>
  </div>
  <img className="banner-image" src="https://preview.ibb.co/bMi5Y6/banner_img.png" alt="monitoring" />
</section>
<Footer/>


    </>
  );
}

export default Home;