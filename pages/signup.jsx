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

import MuiAlert from "@material-ui/lab/Alert";

import { Formik } from "formik";
import * as Yup from "yup";

const STRING_OF_CHARACTERS = /^(?![ .]+$)[a-zA-Z .]*$/g;

// function Alert(props) {
// 	return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const signupValidationSchema = Yup.object().shape({
	firstname: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.matches(STRING_OF_CHARACTERS, "Only enter name with alphabets")
		.required("First name  is required"),
	lastname: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.matches(STRING_OF_CHARACTERS, "Only enter name with alphabets")
		.required("Last name is required"),
	email: Yup.string()
		.email("Enter valid email")
		.min(2, "Too Short!")
		.max(25, "Too Long!")

		.required("Email is required"),
	password: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.min(6, "Password has to be longer than 6 characters!")
		.required("Password  is required"),
	cpassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match"
	) 	.required(" Confirm Password  is required"),
	venue: Yup.bool().oneOf([true], "Must agree to something"),
});

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
			console.log("form here")
					delete values.cpassword;
					delete values.accept_terms;
				const {
					data: { data },
				} = 
		 await axios.post("http://localhost:3000/sign-up", values);
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
								<Box
									style={{
										borderRadius: "13px",
										width: "380px",
										height: "auto",
										backgroundColor: "#F7F7F7 ",
										padding: "20px",
										margin: "30px",
										border: "1px solid #CCCCCC",
										
									}}
									boxShadow={1}
								>
									<Typography
										style={{
											color: "333333",
											textAlign: "center",
											fontSize: "25px ",
											fontWeight: "bold",
											paddingBottom: "10px",
										}}
									>
										Create your Todo Account{" "}
									</Typography>
									<Typography
										style={{
											color: "#9C9C9C",
											padding: "5px",
										}}
									>
										Please fill in this form to create an
										account!
									</Typography>
									<Divider
										style={{
											width: "100%",
											marginBottom: "25px",
										}}
									/>
									<Box>
										<Box
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<Box style={{ marginRight: "5px" }}>
												<Input
													style={{
														width: "100%",
														backgroundColor:
															"#FFFFFF",
														border:
															touched.firstname &&
															errors.firstname
																? "1px solid red"
																: "1px solid #CCCCCC",

														outline: "none",

														borderRadius: "4px",
														padding: "5px 10px",
													}}
													name="firstname"
													value={values.firstname}
													onChange={handleChange}
													onBlur={handleBlur}
													type="text"
													placeholder="First Name"
													border="1px"
													disableUnderline={true}
												/>
												<Typography
													style={{
														fontSize: 12,
														color: "red",
													}}
												>
													{touched.firstname &&
														errors.firstname}
												</Typography>
											</Box>

											<Box style={{ marginLeft: "5px" }}>
												<Input
													style={{
														width: "100%",
														backgroundColor:
															"#ffffff",
														border:
															touched.lastname &&
															errors.lastname
																? "1px solid red"
																: "1px solid #CCCCCC",
														outline: "none",

														borderRadius: "4px",
														padding: "5px 10px",
													}}
													name="lastname"
													value={values.lastname}
													onChange={handleChange}
													onBlur={handleBlur}
													type="text"
													placeholder="Last Name"
													border="1px"
													disableUnderline={true}
												/>
												<Typography
													style={{
														fontSize: 12,
														color: "red",
													}}
												>
													{touched.lastname &&
														errors.lastname}
												</Typography>
											</Box>
										</Box>
										<Input
											style={{
												width: "100%",
												backgroundColor: "#ffffff",
												marginTop: "25px",
												outline: "none",
												marginRight: "5px",
												borderRadius: "4px",
												
												border:
													touched.email &&
													errors.email
														? "1px solid red"
														: "1px solid #CCCCCC",
												padding: "5px 10px",
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
													width: "100%",
													backgroundColor: "#ffffff",
													border:
														touched.password &&
														errors.password
															? "1px solid red"
															: "1px solid #CCCCCC",
													// border: "1px solid #CCCCCC",
													outline: "none",
													marginTop: "25px",
													marginRight: "5px",

													borderRadius: "4px",
													padding: "5px 10px",
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
											<Typography
												style={{
													fontSize: 12,
													color: "red",
												}}
											>
												{touched.password &&
													errors.password}
											</Typography>
										</Box>
										<Box>
											<Input
												style={{
													width: "100%",
													backgroundColor: "#ffffff",
													border:
														touched.cpassword &&
														errors.cpassword
															? "1px solid red"
															: "1px solid #CCCCCC",
													outline: "none",
													marginTop: "25px",
													marginRight: "5px",
													borderRadius: "4px",
													padding: "5px 10px",
												}}
												name="cpassword"
												value={values.cpassword}
												onChange={handleChange}
												onBlur={handleBlur}
												type="password"
												placeholder="Confirm Password"
												border="1px"
												disableUnderline={true}
											/>
											<Typography
												style={{
													fontSize: 12,
													color: "red",
												}}
											>
												{touched.cpassword &&
													errors.cpassword}
											</Typography>
										</Box>
										<Box
											style={{
												marginTop: "16px",
												color: "#9C9C9C",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Checkbox
												name="accept_terms"
												checked={values.accept_terms}

												
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
												I Accept the Term and Condition
											</Typography>
										</Box>
										<Typography
											style={{
												fontSize: 12,
												color: "red",
											}}
										>
											{touched.veneu && errors.veneu}
										</Typography>
									</Box>
									<Box style={{ alignContent: "center" }}>
										<Button
											style={{
												borderRadius: "5px",
												width: "60%",
												backgroundColor: "#5BB85C",
												color: "#FFFFFF",
												marginTop: "10px",
												marginLeft: "70px",
												marginBottom: "9px",
												padding: "10px",
											}}
											// onClick={() =>
											// 	// Router.push("/login")
											// }
											variant="contained"
											color="#1873E8"
											type="submit"
											disabled={!values.accept_terms}
										>
											Sign up
										</Button>
									</Box>
									<p style={{
												textAlign:"center",
												
											}}
										>
								
										<a
											
											href="/login"
											
										>
												Already have an account ? Sign In
										</a>
									</p>
								</Box>
							</form>
						);
					}}
				</Formik>
			)}
			</div>
			{/* <Snackbar
				open={message}
				autoHideDuration={6000}
				onClose={() => setMessage(false)}
			>
				<Alert onClose={() => setMessage(false)} severity="error">
					{message}
				</Alert>
			</Snackbar> */}
		</div>
	);
};

export default signup;
