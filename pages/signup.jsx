import React, { useState, useEffect } from "react";
import Router from "next/router";

import axios from "axios";

import {
	Typography,
	Box,
	Button,
	Avatar,
	Input,
	Checkbox,
	Link,
	Divider,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signupValidationSchema } from "../validations/form/sign-up";

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
		width: "380px",
		height: "auto",
		backgroundColor: "#F7F7F7 ",
		padding: "20px",
		margin: "30px",
		border: "1px solid #CCCCCC",
	},
	title: {
		color: "333333",
		textAlign: "center",
		fontSize: "25px ",
		fontWeight: "bold",
		paddingBottom: "10px",
	},
	formContent: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	inputBorder: {
		border: "1px solid #CCCCCC",
	},
	inputBorderWithError: {
		border: "1px solid red",
	},
	inputStyle: {
		width: "100%",
		backgroundColor: "#ffffff",
		outline: "none",
		marginTop: "25px",
		borderRadius: "4px",
		padding: "5px 10px",
	},
	errorMessageStyle: {
		fontSize: 12,
		color: "red",
	},
	checkBox: {
		marginTop: "16px",
		color: "#9C9C9C",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	signupButton: {
		borderRadius: "5px",
		width: "60%",
		// backgroundColor: "#5BB85C",
		color: "#FFFFFF",
		marginTop: "10px",
		marginLeft: "70px",
		marginBottom: "9px",
		padding: "10px",
	},
});

const STRING_OF_CHARACTERS = /^(?![ .]+$)[a-zA-Z .]*$/g;

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValues = {
	_id: undefined,
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	cpassword: "",
	accept_terms: false,
};

const signup = () => {
	const {
		bodyWrapper,
		formWrapper,
		title,
		formContent,
		inputBorder,
		inputBorderWithError,
		inputStyle,
		errorMessageStyle,
		checkBox,
		signupButton,
	} = useStyles();

	const [loading, setLoading] = useState(true);
	const [selecteduser, setSelecteduser] = useState(initialValues);
	const [message, setMessage] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			Router.push("/");
		} else {
			setLoading(false);
		}
	});

	const signUp = async (values) => {
		try {
			console.log("form here");
			delete values.cpassword;
			delete values.accept_terms;
			const {
				data: { data },
			} = await axios.post(`${process.env.API_URL}/sign-up`, values);
			if (data) {
				Router.push("/login");
				// setSelecteduser({ ...initialValues, id: data[0]._id });
				// setMessage("Signed up successfully");
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

	console.log({ message });

	return (
		<div style={{ paddingBottom: "40px" }}>
			<div className={bodyWrapper}>
				{loading ? (
					<p style={{ textAlign: "center" }}>Loading.....</p>
				) : (
					<Formik
						enableReinitialize
						// initialValues={initialValues}
						initialValues={selecteduser}
						onSubmit={(values) => {
							signUp(values);
						}}
						validationSchema={signupValidationSchema}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							errors,
							touched,
							setFieldValue,
						}) => {
							return (
								<form onSubmit={handleSubmit}>
									<Box className={formWrapper} boxShadow={1}>
										<Typography className={title}>
											Create your Todo Account
										</Typography>
										<Typography
											style={{
												color: "#9C9C9C",
												padding: "5px",
											}}
										>
											Please fill in this form to create
											an account!
										</Typography>
										<Divider
											style={{
												width: "100%",
												marginBottom: "25px",
											}}
										/>
										<Box>
											<Box className={formContent}>
												<Box
													style={{
														marginRight: "5px",
													}}
												>
													<Input
														name="firstname"
														type="text"
														value={values.firstname}
														onChange={handleChange}
														onBlur={handleBlur}
														placeholder="First Name"
														border="1px"
														disableUnderline={true}
														className={`${inputStyle} ${
															touched.input &&
															errors.input
																? inputBorderWithError
																: inputBorder
														}`}
													/>
													<Typography
														className={
															errorMessageStyle
														}
													>
														{touched.firstname &&
															errors.firstname}
													</Typography>
												</Box>

												<Box
													style={{
														marginLeft: "5px",
													}}
												>        
													<Input
														name="lastname"
														type="text"
														value={values.lastname}
														onChange={handleChange}
														onBlur={handleBlur}
														placeholder="Last Name"
														border="1px"
														disableUnderline={true}
														className={`${inputStyle} ${
															touched.input &&
															errors.input
																? inputBorderWithError
																: inputBorder
														}`}
													/>
													<Typography
														className={
															errorMessageStyle
														}
													>
														{touched.lastname &&
															errors.lastname}
													</Typography>
												</Box>
											</Box>
											<Input
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												type="text"
												placeholder="Email"
												border="1px"
												disableUnderline={true}
												className={`${inputStyle} ${
													touched.input &&
													errors.input
														? inputBorderWithError
														: inputBorder
												}`}
											/>
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
													className={`${inputStyle} ${
														touched.input &&
														errors.input
															? inputBorderWithError
															: inputBorder
													}`}
												/>
												<Typography
													className={
														errorMessageStyle
													}
												>
													{touched.password &&
														errors.password}
												</Typography>
											</Box>
											<Box>
												<Input
													name="cpassword"
													value={values.cpassword}
													onChange={handleChange}
													onBlur={handleBlur}
													type="password"
													placeholder="Confirm Password"
													border="1px"
													disableUnderline={true}
													className={`${inputStyle} ${
														touched.input &&
														errors.input
															? inputBorderWithError
															: inputBorder
													}`}
												/>
												<Typography
													className={
														errorMessageStyle
													}
												>
													{touched.cpassword &&
														errors.cpassword}
												</Typography>
											</Box>
											<Box className={checkBox}>
												<Checkbox
													name="accept_terms"
													checked={
														values.accept_terms
													}
													onChange={() => {
														setFieldValue(
															"accept_terms",
															!values.accept_terms
														);
													}}
													style={{ color: "#A8A19C" }}
													size="small"
													inputProps={{
														"aria-label":
															"checkbox with small size",
													}}
												/>
												<Typography>
													I Accept the Term and
													Condition
												</Typography>
											</Box>
											{/* <Typography
												style={{
													fontSize: 12,
													color: "red",
												}}
											>
												{touched.veneu && errors.veneu}
											</Typography> */}
										</Box>
										<Box style={{ alignContent: "center" }}>
											<Button
												variant="contained"
												color="primary"
												type="submit"
												disabled={!values.accept_terms}
												className={signupButton}
											>
												Sign up
											</Button>
										</Box>
										<p
											style={{
												textAlign: "center",
											}}
										>
											<a href="/login">
												Already have an account ? Sign
												In
											</a>
										</p>
									</Box>
								</form>
							);
						}}
					</Formik>
				)}
			</div>
			<Snackbar
				open={message}
				autoHideDuration={6000}
				onClose={() => setMessage(false)}
			>
				<Alert onClose={() => setMessage(false)} severity="error">
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default signup;
