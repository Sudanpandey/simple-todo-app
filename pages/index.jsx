import "date-fns";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";

import axios from "axios";
import Router from "next/router";

import { Box, Button } from "@material-ui/core";

import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { TodoForm, TodoItem, ConfirmBox } from "../components";

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
	logoutButton: {
		marginTop: "5px",
		borderRadius: "5px",
		width: "10%",
		backgroundColor: "#5BB85B",
		color: "#FFFFFF",
	},
	bodyWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: " #F2F2F2",
	},
	addTodoButton: {
		marginTop: "50px",
		marginLeft: "600px",
		borderRadius: "5px",
		color: "#FFFFFF",
		backgroundColor: "#5BB85B",
		padding: "15px",
	},
	scrollWrapper: {
		display: "flex",
		justifyContent: "center",
	},
	scrollbar: {
		width: "60%",
		height: "500px",
		overflow: "scroll",
	},
	footer: {
		width: "100%",
		height: "60px",
		backgroundColor: "#444444",
		textAlign: "center",
		color: "#ffffff",
	},
});

const initialValues = {
	input: "",
	body: "",
};

const Todo = () => {
	const {
		pickerStyle,
		root,
		navigation,
		navigationWrapper,
		logo,
		logoutButton,
		bodyWrapper,
		addTodoButton,
		scrollWrapper,
		scrollbar,
		footer,
	} = useStyles();

	const [selectedDate, setSelectedDate] = useState(
		moment(new Date()).format("YYYY-MM-DD")
	);
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
		try {
			const token = localStorage.getItem("token");
			const { userID } = jwt_decode(token);
			const {
				data: { data },
			} = await axios.get(
				`http://localhost:3000/dateTodos?userID=${userID}&selectedDate=${selectedDate}`
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
			await axios.post("http://localhost:3000/todos", {
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
			await axios.delete(`http://localhost:3000/todos?todoID=${todoID}`);
			getTodos(selectedDate);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const editTodo = async (values) => {
		try {
			await axios.put(
				`http://localhost:3000/todos?todoID=${values.todoID}`,
				values
			);
			handleClose();
			getTodos(moment(values.selectedDate).format("YYYY-MM-DD"));
		} catch (error) {
			console.log(error);
		}
	};

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

	return (
		<div>
			{loading ? (
				<p style={{ textAlign: "center" }}>Loading....</p>
			) : (
				<Box>
					<Modal
						style={{
							width: "500px",
							top: "14%",
							left: "29%",
						}}
						open={open.action}
						onClose={handleClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
					>
						{["add", "edit"].includes(open.mode) ? (
							<TodoForm
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
											className: { pickerStyle },
										}}
										// InputLabelProps={{
										// 	shrink: true,
										// }}
										variant="inline"
										autoOk
									/>
								</Grid>
							</MuiPickersUtilsProvider>

							<Button
								variant="contained"
								type="button"
								onClick={logout}
								className={logoutButton}
							>
								Logout
							</Button>
						</Box>
					</Box>
					<Box className={bodyWrapper}>
						<Button
							type="button"
							onClick={() => handleOpen("add", true)}
							className={addTodoButton}
						>
							Add Todo
						</Button>

						<Box className={scrollWrapper}>
							<Box className={scrollbar}>
								<div className={root}>
									{todos.map((todo) => {
										return (
											<TodoItem
												todo={todo}
												deleteTodos={deleteTodos}
												setSelectedTodo={
													setSelectedTodo
												}
												completeTodo={completeTodo}
												handleOpen={handleOpen}
											/>
										);
									})}
								</div>
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
