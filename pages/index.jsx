import "date-fns";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";

import axios from "axios";
import Router from "next/router";

import { Box, Button, Modal } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

import ListIcon from "@material-ui/icons/List";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";

import { makeStyles } from "@material-ui/core/styles";

import { TodoForm, ListView, GridView, ConfirmBox } from "../components";

const useStyles = makeStyles({
	pickerStyle: {
		padding: " 3px 0px 3px 13px",
		backgroundColor: "#FFFFFF",
		width: "300px",
		border: "1px solid  #CCCCCC",
		borderRadius: "5px",
		color: "#AFAFAF",
	},
	navigation: {
		width: "100%",
		height: "80px",
		backgroundColor: "#FFFFFF",
	},
	navigationWrapper: {
		display: "flex",
		justifyContent: "space-between",
	},
	logo: {
		width: "130px",
		height: "40px",
	},
	icon: {
		backgroundColor: "#5BB85B",
		color: "#5BB85B",
		width: "30px",
		height: "30px",
	},

	logoutButton: {
		marginTop: "16px",
		marginRight: "29px",
		borderRadius: "5px",
		padding: "8px",
		height: "1%",
		width: "8%",
		color: "#FFFFFF",
	},
	bodyWrapper: {
		width: "100%",
		backgroundColor: " #F2F2F2",
	},
	toggleView: {},
	addTodoButton: {
		marginTop: "30px",
		padding: "8px",
		width: "8%",
		marginLeft: "46%",
		borderRadius: "5px",
		color: "#FFFFFF",
	},

	footer: {
		width: "100%",
		height: "60px",
		backgroundColor: "#444444",
		textAlign: "center",
		color: "#ffffff",
	},
	todoForm: {
		top: "14% !important",
		left: "29% !important",
		width: "500px",
	},
	confirmBox: {
		width: "500px",
		top: "14% !important",
		left: "29% !important",
		textAlign: "center",
	},
});

const initialValues = {
	input: "",
	body: "",
};

const Todo = () => {
	const {
		pickerStyle,
		navigation,
		navigationWrapper,
		logo,
		icon,
		logoutButton,
		bodyWrapper,
		addTodoButton,
		footer,
		todoForm,
		confirmBox,
	} = useStyles();

	const today = moment(new Date()).format("YYYY-MM-DD");

	const [selectedDate, setSelectedDate] = useState(today);
	const [open, setOpen] = useState({ action: false });
	const [selectedTodo, setSelectedTodo] = useState(initialValues);
	const [loading, setLoading] = useState(true);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoading(false);
			getTodos(selectedDate);
		} else {
			Router.push("/login");
		}
	}, []);

	const getTodos = async (selectedDate) => {
		{
			/* <Box onClick={toggleView} className={toggleView}>
	<img className={icon} src="/static/View.png" />
</Box> */
		}
		try {
			const token = localStorage.getItem("token");
			const { userID } = jwt_decode(token);
			const {
				data: { data },
			} = await axios.get(
				`${process.env.API_URL}/dateTodos?userID=${userID}&selectedDate=${selectedDate}`
			);
			setTodos(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addTodos = async (values) => {
		try {
			const token = localStorage.getItem("token");	
			const { userID } = jwt_decode(token);
			await axios.post(`${process.env.API_URL}/todos`, {
				...values,
				userID,
				selectedDate: selectedDate,
			});
			handleClose();
			getTodos(moment(values.selectedDate).format("YYYY-MM-DD"));
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodos = async (todoID) => {
		try {
			await axios.delete(`${process.env.API_URL}/todos?todoID=${todoID}`);
			getTodos(selectedDate);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const editTodo = async (values) => {
		try {
			await axios.put(
				`${process.env.API_URL}/todos?todoID=${values.todoID}`,
				values
			);
			handleClose();
			getTodos(moment(values.selectedDate).format("YYYY-MM- DD"));
		} catch (error) {
			console.log(error);
		}
	};

	const completeTodo = async (values) => {
		try {
			await axios.put(
				`${process.env.API_URL}/todos/complete?todoID=${values.todoID}`,
				{ ...values, completed: true }
			);
			getTodos(selectedDate);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		Router.push("/login");
	};

	const handleOpen = (mode, action) => {
		setOpen({ mode, action });
	};
	const handleClose = () => {
		setOpen({ ...open, action: false });
		setSelectedTodo(initialValues);
	};

	const handleDateChange = (date) => {
		const formatedDate = moment(new Date(date)).format("YYYY-MM-DD");
		setSelectedDate(formatedDate);
		getTodos(formatedDate);
	};

	const [view, setView] = useState("list");
	const toggleView = () => {
		view === "list" ? setView("grid") : setView("list");
	};

	return (
		<div>
			{loading ? (
				<p style={{ textAlign: "center" }}>Loading....</p>
			) : (
				<Box>
					<Modal
						className={
							["add", "edit"].includes(open.mode)
								? todoForm
								: confirmBox
						}
						open={open.action}
						onClose={handleClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
					>
						{["add", "edit"].includes(open.mode) ? (
							<TodoForm
								title=" Add Todo  "
								initialValues={selectedTodo}
								addTodos={addTodos}
								editTodo={editTodo}
								handleClose={handleClose}
							/>
						) : (
							<ConfirmBox
								title="Are you sure?"
								body="Once delete you can't recover it"
								onClose={handleClose}
								selectedTodo={selectedTodo}
								onConfirm={deleteTodos}
							/>
						)}
					</Modal>

<Box  >
					<Box className={navigation}>
						<Box className={navigationWrapper}>
							<Button>
								<img className={logo} src="/static/logo.jpg" />
							</Button>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid>
									<KeyboardDatePicker
										disableToolbar
										name="datepicker"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-inline"
										value={selectedDate}
										onChange={handleDateChange}
										placeholder="Please select a Date"
										KeyboardButtonProps={{
											"aria-label": "change date",
										}}
										InputProps={{
											disableUnderline: true,
											className: pickerStyle,
										}}
										variant="inline"
										autoOk
									/>
								</Grid>
							</MuiPickersUtilsProvider>

							<Button
								variant="contained"
								type="button"
								color="primary"
								onClick={logout}
								className={logoutButton}
							>
								Logout
							</Button>
						</Box>
					</Box>

					<Box className={bodyWrapper}>
						<Box display="flex" justifyContent="flex-end" padding="20px">
							{view === "list" ? (	
								<ViewComfyIcon onClick={toggleView}  />
							) : (
								<ListIcon onClick={toggleView} />
							)}
						</Box>

						{moment(selectedDate).isSameOrAfter(today) && (
							<Button
								type="button"
								color="primary"
								variant="contained"
								onClick={() => handleOpen("add", true)}
								className={addTodoButton}
							>
								Add Todo
							</Button>
						)}
						<Box height="52vh" overflow="scroll">
							{view === "list" ? (
								<ListView
									todos={todos}
									deleteTodos={deleteTodos}
									setSelectedTodo={setSelectedTodo}
									completeTodo={completeTodo}
									handleOpen={handleOpen}
									selectedDate={selectedDate}
								/>
							) : (
								<GridView
									todos={todos}
									deleteTodos={deleteTodos}
									setSelectedTodo={setSelectedTodo}
									completeTodo={completeTodo}
									handleOpen={handleOpen}
									selectedDate={selectedDate}
								/>
							)}
						</Box>
					</Box>
					</Box>
					<Box className={footer}>
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
export default Todo;
