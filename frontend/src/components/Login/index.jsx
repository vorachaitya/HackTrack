import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import './login.css'
import Footer from "../Footer";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	console.log(data.email);
	localStorage.setItem('name', JSON.stringify(data.email));

	return (
		<>
			<h1 style={{textAlign:'center',paddingTop:'1rem',color:'#5052ea'}}>HackTrack</h1>
			<div class="card" id="card">

				<div class="front">
					<p class="login_word">LOG IN</p>
					{/* <img src="https://drive.google.com/uc?export=view&id=1K5_tAX_taOQQ0wwmFx3P--V05kjvg4cu" alt="person picture" /> */}
					<form onSubmit={handleSubmit}>
						<input type="email" name="email" placeholder="Email" class="f1" onChange={handleChange} value={data.email} required />

						{error && <div className={styles.error_msg}>{error}</div>}
						<input type="password" name="password" placeholder="Password" class="f1" onChange={handleChange} value={data.password} required />
						<button class="f1" type="submit">Log in</button>

					</form>
					<p>New Here? <Link to="/signup">

						Sign Up

					</Link>
					</p>
				</div>



			</div>
			{/* <main class="main">
				<div class="container">
					<section class="wrapper">
						<div class="heading">
							<h1 class="text text-large">Sign In</h1>
							<p class="text text-normal">New user? <span><a href="#" class="text text-links">Create an account</a></span>
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<div class="input-control">
								<label for="email" class="input-label" hidden>Email Address</label>
								<input type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required />
							</div>
							<div class="input-control">
								<label for="password" class="input-label" hidden>Password</label>
								<input type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
									required />
							</div>
							<div class="input-control">
								
								<button type="submit">
									Sign In
								</button>
							</div>
						</form>

					</section>
				</div>
			</main> */}
			<Footer />
		</>
		// <div className={styles.login_container} >

		// 	<div className={styles.login_form_container}>
		// 		<div className={styles.left}>
		// 			<form className={styles.form_container} onSubmit={handleSubmit}>
		// 				<h1>Login to Pehchan</h1>
		// 				<input
		// 					type="email"
		// 					placeholder="Email"
		// 					name="email"
		// 					onChange={handleChange}
		// 					value={data.email}
		// 					required
		// 					className={styles.input}
		// 				/>
		// 				<input
		// 					type="password"
		// 					placeholder="Password"
		// 					name="password"
		// 					onChange={handleChange}
		// 					value={data.password}
		// 					required
		// 					className={styles.input}
		// 				/>
		// 				{error && <div className={styles.error_msg}>{error}</div>}
		// 				<button type="submit" className={styles.green_btn}>
		// 					Sign In
		// 				</button>
		// 			</form>
		// 		</div>
		// 		<div className={styles.right}>
		// 			<h1>New Here ?</h1>
		// 			<Link to="/signup">
		// 				<button type="button" className={styles.white_btn}>
		// 					Sign Up
		// 				</button>
		// 			</Link>
		// 		</div>
		// 	</div>
		// </div>

	);
};

export default Login;
