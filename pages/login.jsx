import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

import {
	Typography,
	Box,
	Button,
	Avatar,
	Input,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logInValidationSchema  } from "../validations/form/login";

import MuiAlert from "@material-ui/lab/Alert";
import { Formik } from "formik";


const useStyles = makeStyles({
	bodyWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	formWrapper: {
		borderRadius: "13px",
		width: "310px",
		height: "auto",
		backgroundColor: "#F7F7F7",
		padding: "10px",
		margin: "60px",
	},
	image: {
		marginLeft: "115px",
		width: "80px",
		height: "80px",
		marginTop: "20px",
	},
	logIn: {
		color: "333333",
		textAlign: "center",
		fontSize: "30px ",
		marginTop: "5px",
	},
	formContentWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: "115px",
	},
	inputStyle: {
		width: "100%",
		backgroundColor: "#ffffff",
		marginTop: "15px",
		border: "1px solid #CCCCCC",
		outline: "none",
		borderRadius: "5px",
		padding: "0px 10px",
	},
	errorMessageStyle: {
		fontSize: 12,
		color: "red",
	},
	buttonStyle: {
		borderRadius: "5px",
		width: "100%",
		// backgroundColor: "#5BB85C",
		color: "#FFFFFF",
		marginTop: "35px",
		marginBottom: "10px",
	},
});

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}



// const logInValidationSchema = Yup.object().shape({
// 	email: Yup.string()
// 		.email("Please enter valid email")
// 		.min(2, "Too Short!")
// 		.max(25, "Too Long!")
// 		.required("Email is required"),
// 	password: Yup.string()
// 		.min(2, "Too Short!")
// 		.max(25, "Too Long!")
// 		.min(6, "Password has to be longer than 6 characters!")
// 		.required(" Password is required"),
// });

const initialValues = {
	email: "",
	password: "",
};

const Index = () => {
	const {
		bodyWrapper,
		formWrapper,
		image,
		logIn,
		formContentWrapper,
		inputStyle,
		errorMessageStyle,
		buttonStyle,
	} = useStyles();

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			Router.push("/");
		} else {
			setLoading(false);
		}
	});

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
		<div className={bodyWrapper}>  
			{loading ? (
				<p>Loading.....</p>
			) : (
				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
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
						return (
							<form onSubmit={handleSubmit}>
								<Box className={formWrapper} boxShadow={1}>
									<Avatar
										src="/static/images.png"
										className={image}
									></Avatar>

									<Typography className={logIn}>
										Log in
									</Typography>
									<Box
										style={{
											padding: "10px",
										}}
									>
										<Box
											className={formContentWrapper}
										></Box>
										<Box>
											<Input
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												type="text"
												placeholder="Email"
												border="1px"
												disableUnderline={true}
												className={inputStyle}
											/>
										</Box>
										<Typography
											className={errorMessageStyle}
										>
											{touched.email && errors.email}
										</Typography>

										<Box>
											<Input
												name="password"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												type="password"
												placeholder="Password"
												border="1px"
												disableUnderline={true}
												className={inputStyle}
											/>
										</Box>
										<Typography
											className={errorMessageStyle}
										>
											{touched.password &&
												errors.password}
										</Typography>

										<Button
										variant="contained"
										color="primary"
											type="submit"
											className={buttonStyle}
										>
											Sign in
										</Button>
									</Box>
									<p
										style={{
											textAlign: "center",
										}}
									>
										<a href="/signup">
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
