import "date-fns";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import axios from "axios";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
	Typography,
	Box,
	Button,
	Avatar,
	Input,
	Checkbox,
	Link,
	Divider,
	TextareaAutosize,
} from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const todoValidationSchema = Yup.object().shape({
	input: Yup.string()
		.min(5, " Your Entered task is Too Short!")
		.max(55, "  Your Entered task isToo Long!")
		.required(" First,Your Task  is required Here"),
	body: Yup.string()
		.min(10, " Your Entered task is Too Short!")
		.max(200, "  Your Entered task isToo Long!")
		.required(" First,Your DEscription  Task  is required Here"),
});

const styles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export function TransitionsModal() {
	const classes = styles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
}

const Wrapper = styled.div`
	.MuiExpansionPanelSummary-content {
		justify-content: space-between;
		align-items: center;
		margin: 0px;
	}
`;

const DatePickerWrapper = styled.div`
	.MuiPopover-paper {
		display: none !important;
	}
`;

const useStyles = makeStyles({
	pickerStyle: {
		padding: "2px 5px",
		backgroundColor: "white",
		width: "300px",
		border: "1px solid #CCCCCC",
		borderRadius: "5px",
		color: "#AFAFAF",
	},
	root: {
		marginTop: "80px",
		width: "100%",
	},
	heading: {
		// fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
		color: "Black",
	},
	secondaryHeading: {
		color: "green",
		// fontSize: theme.typography.pxToRem(15),
		// color: theme.palette.text.secondary,
	},
	strikeText: {
		textDecoration: "line-through",
	},
});

const initialValues = {
	input: "",
	selectedDate: new Date(),
	body: "",
};

const todo = () => {
	const classes = useStyles();

	const [selectedDate, setSelectedDate] = React.useState(
		moment(new Date()).format("YYYY-MM-DD")
	);

	const [open, setOpen] = React.useState(false);
	const [selectedTodo, setSelectedTodo] = useState(initialValues);
	const [loading, setLoading] = useState(true);
	const [todos, setTodos] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div
			style={{
				marginTop: "100px",
				marginLeft: "350px",
				width: "600px",
				height: "auto",
				backgroundColor: "#FFFFFF",
				borderRadius: "20px",
			}}
		>
			<h2>The Todo list is here.</h2>
			<p style={{}}>
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			</p>
			{/* <SimpleModal /> */}
		</div>
	);

	const getTodos = async (selectedDate) => {
		// console.log("from here;");
		try {
			const token = localStorage.getItem("token");
			const { userID } = jwt_decode(token);

			const {
				data: { data },
			} = await axios.get(
				`http://localhost:3000/dateTodos?userID=${userID}&selectedDate=${selectedDate}`
			);
			// const response = await axios.get("http://localhost:3000");
			// const data = response.data.data;
			// console.log(data);
			setTodos(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addTodos = async (values) => {
		try {
			const token = localStorage.getItem("token");
			const { userID } = jwt_decode(token);
			await axios.post("http://localhost:3000/todos", {
				...values,
				userID,
			});
			getTodos(moment(values.selectedDate).format("YYYY-MM-DD"));
			console.log(values);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodos = async (todoID) => {
		try {
			await axios.delete(`http://localhost:3000/todos?todoID=${todoID}`);
			getTodos(selectedDate);
		} catch (error) {
			console.log(error);
		}
	};

	const putTodo = async (values) => {
		try {
			await axios.put(
				`http://localhost:3000/todos?todoID=${values.todoID}`,
				values
			);
			setSelectedTodo(initialValues);
			getTodos(moment(values.selectedDate).format("YYYY-MM-DD"));
		} catch (error) {
			console.log(error);
		}
	};
	//  Task for Completed  todo
	const completeTodo = async (values) => {
		try {
			await axios.put(
				`http://localhost:3000/todos/complete?todoID=${values.todoID}`,
				{ ...values, completed: true }
			);
			getTodos(selectedDate);
		} catch (error) {
			console.log(error);
		}
	};

	// Get data from todos list Datewise
	// const getTodos = async () => {
	// 			try {
	// 		const token = localStorage.getItem("token");
	// 		const { userID } = jwt_decode(token);
	// 		const {
	// 			data: { data ,selectedDate }

	// 		} = await axios.get(`http://localhost:3000/todos?userID=${userID}`);
	// 		// const response = await axios.get("http://localhost:3000");
	// 		// const data = response.data.data;
	// 		// console.log(data);
	// 		setTodos(data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoading(false);
			getTodos(selectedDate);
		} else {
			Router.push("/login");
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		Router.push("/login");
	};

	// const handleDateChange = (date) => {
	// 	setSelectedDate(date);
	// };

	console.log({ selectedDate });
	return (
		<div>
			{loading ? (
				<p style={{ textAlign: "center" }}>Loading....</p>
			) : (
				<Box>
					<Formik
						enableReinitialize
						// initialValues={initialValues}
						initialValues={selectedTodo}
						onSubmit={(values, { resetForm }) => {
							if (values.todoID) {
								putTodo(values);
							} else {
								addTodos(values);
							}
							// addTodos(values);
							// console.log(values);
							resetForm({});
						}}
						validationSchema={todoValidationSchema}
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
							const handleDateChange = (date) => {
								setFieldValue("selectedDate", date);
								setSelectedDate(
									moment(date).format("YYYY-MM-DD")
								);
								getTodos(moment(date).format("YYYY-MM-DD"));
							};

							return (
								<form onSubmit={handleSubmit}>
									<Box
										style={{
											width: "100%",
											height: "80px",
											backgroundColor: "#FFFFFF",
										}}
									>
										<Box
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Button style={{ padding: "0px" }}>
												<img
													style={{
														width: "130px",
														height: "40px",
													}}
													src="/static/logo.jpg"
												/>
											</Button>
											<MuiPickersUtilsProvider
												utils={DateFnsUtils}
											>
												<Grid>
													<KeyboardDatePicker
														disableToolbar
														name="datepicker"
														onChange={handleChange}
														format="MM/dd/yyyy"
														margin="normal"
														id="date-picker-inline"
														value={
															values.selectedDate
														}
														onChange={
															handleDateChange
														}
														placeholder="Please select a Date"
														KeyboardButtonProps={{
															"aria-label":
																"change date",
														}}
														InputProps={{
															disableUnderline: true,
															className: useStyles()
																.pickerStyle,
														}}
														InputLabelProps={{
															shrink: true,
														}}
														variant="inline"
														autoOk
													/>
												</Grid>
											</MuiPickersUtilsProvider>

											<Button
												style={{
													marginTop: "5px",
													// padding: "5px",
													// marginRight: "15px",
													borderRadius: "5px",
													width: "10%",
													backgroundColor: "#5BB85B",
													color: "#FFFFFF",
												}}
												variant="contained"
												type="button"
												onClick={logout}
											>
												Logout
											</Button>
										</Box>
									</Box>
									<Box
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: " #F2F2F2",
										}}
									>
										<button
											style={{ marginLeft: "600px" }}
											type="button"
											onClick={handleOpen}
										>
											Open Modal
										</button>
										<Modal
											style={{ outline: 0 }}
											open={open}
											onClose={handleClose}
											aria-labelledby="simple-modal-title"
											aria-describedby="simple-modal-description"
										>
											{body}
										</Modal>

										{/* <Box
											style={{
												paddingTop: "15px",
												textAlign: "center",
											}}
										>
											<MuiPickersUtilsProvider
											

												utils={DateFnsUtils}
											>
												<label
													style={{
														paddingTop: "20px",
														fontSize: "20px",
														paddingleft: "10px",
													}}
												>
													Select a Date and time{" "}
												</label>

												<Grid>
													<KeyboardDatePicker
														style={{
															fontSize: "25",
														}}
														disableToolbar
														name="datepicker"
														onChange={handleChange}
														format="MM/dd/yyyy"
														margin="normal"
														id="date-picker-inline"
														value={
															values.selectedDate
														}
														onChange={
															handleDateChange
														}
														placeholder="Please select a Date"
														KeyboardButtonProps={{
															"aria-label":
																"change date",
														}}
														InputProps={{
															disableUnderline: true,
															className: useStyles()
																.pickerStyle,
														}}
														InputLabelProps={{
															shrink: true,
														}}
														variant="inline"
														autoOk
													/>
												</Grid>
											</MuiPickersUtilsProvider>
										</Box> */}
										<Box style={{}}>
											<Box
												style={{ textAlign: "center" }}
											>
												<Input
													style={{
														width: "300px",
														backgroundColor:
															"#ffffff",
														border:
															touched.input &&
															errors.input
																? "1px solid red"
																: "1px solid #CCCCCC",
														outline: "none",
														borderRadius: "5px",
														padding: "2px 10px",
														boxShadow: "none",
														marginTop: "50px",
													}}
													name="input"
													value={values.input}
													onBlur={handleBlur}
													onChange={handleChange}
													type="text"
													placeholder="Type  Title of your Task here."
													border="1px"
													disableUnderline={true}
												/>
												<Typography
													style={{
														textAlign: "left",
														marginLeft: "485px",
														fontSize: 12,
														color: "red",
													}}
												>
													{touched.input &&
														errors.input}
												</Typography>
											</Box>
											<Box
												style={{ textAlign: "center" }}
											>
												<TextareaAutosize
													style={{
														paddingLeft: "10px",
														width: "290px",
														backgroundColor:
															"#ffffff",
														border:
															touched.body &&
															errors.body
																? "1px solid red"
																: "1px solid #CCCCCC",
														outline: "none",
														borderRadius: "5px",
														boxShadow: "none",
														marginTop: "60px",
														fontFamily:
															"times new roman",
														fontSize: "18px",
														color: "black",
													}}
													name="body"
													value={values.body}
													onChange={handleChange}
													onBlur={handleBlur}
													aria-label="minimum height"
													rowsMin={6}
													placeholder="Type Description of Task  here"
												/>
												<Typography
													style={{
														textAlign: "left",
														marginLeft: "485px",
														fontSize: 12,
														color: "red",
													}}
												>
													{touched.body &&
														errors.body}
												</Typography>
											</Box>

											<Box
												style={{ textAlign: "center" }}
											>
												<Button
													variant="contained"
													type="submit"
													style={{
														marginTop: "20px",
														padding: "5px",
														color: "#FFFFFF",
														backgroundColor:
															"#5BB85C",
														boxShadow: "none",
														marginLeft: "8px",
													}}
												>
													Add Task
												</Button>
											</Box>
										</Box>
										<Box
											style={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Box
												style={{
													width: "60%",
													height: "500px",
													overflow: "scroll",
												}}
											>
												<div className={classes.root}>
													{todos.map((todo) => {
														return (
															<ExpansionPanel>
																<Wrapper>
																	<ExpansionPanelSummary
																		expandIcon={
																			<ExpandMoreIcon />
																		}
																		aria-controls="panel1bh-content"
																		id="panel1bh-header"
																	>
																		<Typography
																			className={
																				todo.completed
																					? `${classes.secondaryHeading} ${classes.strikeText}`
																					: `${classes.secondaryHeading}`
																			}
																		>
																			{
																				todo.input
																			}
																		</Typography>
																		<Box>
																			<FormControlLabel
																				aria-label="Acknowledge"
																				onClick={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				onFocus={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				control={
																					<Button
																						onClick={() =>
																							deleteTodos(
																								todo.todoID
																							)
																						}
																					>
																						<DeleteIcon />
																					</Button>
																				}
																			/>

																			<FormControlLabel
																				aria-label="Acknowledge"
																				onClick={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				onFocus={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				control={
																					<Button
																						disabled={
																							todo.completed
																						}
																						onClick={() =>
																							setSelectedTodo(
																								todo
																							)
																						}
																					>
																						<EditIcon />
																					</Button>
																				}
																			/>
																			<FormControlLabel
																				aria-label="Acknowledge"
																				onClick={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				onFocus={(
																					event
																				) =>
																					event.stopPropagation()
																				}
																				control={
																					<Button
																						disabled={
																							todo.completed
																						}
																						onClick={() =>
																							completeTodo(
																								todo
																							)
																						}
																					>
																						<DoneIcon />
																					</Button>
																				}
																			/>
																		</Box>
																	</ExpansionPanelSummary>
																</Wrapper>

																<ExpansionPanelDetails>
																	<Typography
																		style={{
																			wordBreak:
																				"break-all",
																		}}
																	>
																		{
																			todo.body
																		}
																	</Typography>
																</ExpansionPanelDetails>
															</ExpansionPanel>
														);
													})}
												</div>
											</Box>
										</Box>
									</Box>
								</form>
							);
						}}
					</Formik>

					<Box
						style={{
							width: "100%",
							height: "60px",
							backgroundColor: "#444444",
							textAlign: "center",
							color: "#ffffff",
						}}
					>
						<p style={{ padding: "20px" }}>
							Lewin © 2020| Silicon Bit Technology. All rights
							reserved.
						</p>
					</Box>
				</Box>
			)}
		</div>
	);
};
export default todo;
