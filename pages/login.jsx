import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

import {
	Typography,
	Box,
	Button,
	Avatar,
	Input,
	Link,
	Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Formik } from "formik";
import * as Yup from "yup";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const logInValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please enter valid email")
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.required("Email is required"),
	password: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.min(6, "Password has to be longer than 6 characters!")
		.required(" Password is required"),
});

const initialValues = {
	email: "",
	password: "",
};

const Index = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			Router.push("/");
		} else {
			setLoading(false);
		}
	});

	const [message, setMessage] = useState();

	const login = async (values) => {
		try {
			const {
				data: {
					data: { token },
				},
			} = await axios.post("http://localhost:3000/login", values);
			if (token) {
				localStorage.setItem("token", token);
				Router.push("/");
			}
		} catch (error) {
			const {
				response: {
					data: { message },
				},
			} = error;
			setMessage(message);
		}
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{loading ? (
				<p>Loading.....</p>
			) : (
				<Formik
					initialValues={initialValues}
					onSubmit={(values, { resetForm }) => {
						login(values);
					}}
					validationSchema={logInValidationSchema}
				>
					{({
						values,
						handleChange,
						handleBlur,
						handleSubmit,
						errors,
						touched,
					}) => {
						console.log(values);
						return (
							<form onSubmit={handleSubmit}>
								<Box
									style={{
										borderRadius: "13px",
										width: "310px",
										height: "auto",
										backgroundColor: "#F7F7F7",
										padding: "10px",
										margin: "60px",
									}}
									boxShadow={1}
								>
									<Avatar
										src="/static/images.png"
										style={{
											marginLeft: "115px",
											width: "80px",
											height: "80px",
											marginTop: "20px",
										}}
									></Avatar>
									<Typography
										style={{
											color: "333333",
											textAlign: "center",
											fontSize: "30px ",
											// marginBottom:"8px",
											marginTop: "5px",
										}}
									>
										Log in{" "}
									</Typography>
									<Box
										style={{
											padding: "10px",
										}}
									>
										<Box
											style={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												width: "115px",
											}}
										></Box>
										<Box>
											<Input
												style={{
													width: "100%",
													backgroundColor: "#ffffff",
													border: "1px solid #CCCCCC",
													outline: "none",
													borderRadius: "5px",
													padding: "0px 10px",
												}}
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												type="text"
												placeholder="Email"
												border="1px"
												disableUnderline={true}
											/>
										</Box>
										<Typography
											style={{
												fontSize: 12,
												color: "red",
											}}
										>
											{touched.email && errors.email}
										</Typography>

										<Box>
											<Input
												style={{
													marginTop: "15px",
													width: "100%",
													backgroundColor: "#ffffff",
													border: "1px solid #CCCCCC",
													outline: "none",
													borderRadius: "5px",
													padding: "0px 10px",
												}}
												name="password"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												type="password"
												placeholder="Password"
												border="1px"
												disableUnderline={true}
											/>
										</Box>
										<Typography
											style={{
												fontSize: 12,
												color: "red",
											}}
										>
											{touched.password &&
												errors.password}
										</Typography>

										<Button
											style={{
												borderRadius: "5px",
												width: "100%",
												backgroundColor: "#5BB85C",
												color: "#FFFFFF",
												marginTop: "35px",
												marginBottom: "10px",
											}}
											variant="contained"
											color="#337AB7"
											type="submit"
										>
											Sign in
										</Button>
									</Box>
									<p style={{
												textAlign:"center",
												
											}}>
								
										<a
											
											href="/signup"
											
										>
												Not a Member? Sign Up Now
										</a>
									</p>
								</Box>  
							</form>
						);
					}}
				</Formik>
			)}

			<Snackbar
				style={{ marginBottom: "70px" }}
				open={message}
				showDuration={1000}
				autoHideDuration={3000}
				onClose={() => setMessage(false)}
			>
				<Alert
					style={{ marginBottom: "5	0px" }}
					onClose={() => setMessage(false)}
					severity="error"
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};
export default Index;
