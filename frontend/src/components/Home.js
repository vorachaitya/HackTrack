
import './css/home.css'
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
      <h1>Manage</h1>
      <p><strong>We make it easy to get the most out of your virtual machine.</strong> Our tools make it simple to track how your Droplets are performing and help you to respond quickly if there is a problem</p>
      <button>Sign Up</button>
    </div>
  </div>
  <img className="banner-image" src="https://preview.ibb.co/bMi5Y6/banner_img.png" alt="monitoring" />
</section>


    </>
  );
}

export default Home;