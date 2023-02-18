import { useState } from "react";
import './signup.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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

	return (
		// <div className={styles.signup_container} style={{backgroundImage: "url('https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80')" }}>		
		// 	<div className={styles.signup_form_container}>
		// 		<div className={styles.left}>
		// 			<h1>Welcome Back</h1>
		// 			<Link to="/login">
		// 				<button type="button" className={styles.white_btn}>
		// 					Sign in
		// 				</button>
		// 			</Link>
		// 		</div>
		// 		<div className={styles.right}>
		// 			<form className={styles.form_container} onSubmit={handleSubmit}>
		// 				<h1>Create Account</h1>
		// 				<input
		// 					type="text"
		// 					placeholder="First Name"
		// 					name="firstName"
		// 					onChange={handleChange}
		// 					value={data.firstName}
		// 					required
		// 					className={styles.input}
		// 				/>
		// 				<input
		// 					type="text"
		// 					placeholder="Last Name"
		// 					name="lastName"
		// 					onChange={handleChange}
		// 					value={data.lastName}
		// 					required
		// 					className={styles.input}
		// 				/>
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
		// 					Sign Up
		// 				</button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>
		<>
			<h1 style={{ textAlign: 'center', padding: '1rem', color: '#5052ea' }}>HackTrack</h1>
			<div class="signup-form">
				<div class="container">
					<div class="header">
						<h1>Create an Account</h1>
						<p>Get started for free!</p>
					</div>
					<form onSubmit={handleSubmit}>
						<div class="input">
							<i class="fa-solid fa-user"></i>
							<input type="text"
								placeholder="First Name"
								name="firstName"
								onChange={handleChange}
								value={data.firstName}
								required />
						</div>
						<div class="input">
							<i class="fa-solid fa-envelope"></i>
							<input type="text"
								placeholder="Last Name"
								name="lastName"
								onChange={handleChange}
								value={data.lastName}
								required />
						</div>
						<div class="input">
							<i class="fa-solid fa-envelope"></i>
							<input type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required />
						</div>
						<div class="input">
							<i class="fa-solid fa-lock"></i>
							<input type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required />
						</div>
						{error && <div>{error}</div>}
						<button type="submit" class="signup-btn" value="SIGN UP">
							Sign Up
						</button>
					</form>

					<p>Already have an account <a href="/login">sign in</a></p>
				</div>
			</div>
		</>
	);
};

export default Signup;
