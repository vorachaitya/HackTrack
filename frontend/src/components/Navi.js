import './css/home.css'

const Navi = () => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return (
        <>
            <nav>
                <div className="logo">
                    <div className="arrow-down"></div>
                </div>
                <ul >
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/"><li>Home</li></a>
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/video"><li>Video Conferencing</li></a>
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/chat"><li>Chat</li></a>
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/timeline"><li>Timeline</li></a>
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/admin"><li>Admin</li></a>
                    <a style={{ textDecoration: 'none', marginLeft:'1rem', fontSize:'large', fonteWeight:'700' }} href="/" onClick={handleLogout}><li>Logout</li></a>


                </ul>
            </nav>
        </>
    );
}

export default Navi;