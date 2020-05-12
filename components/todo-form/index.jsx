import React from "react";
import "date-fns";
import { Formik } from "formik";

import {
	Typography,
	Box,
	Button,
	Input,
	TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { todoValidationSchema } from "../../validations/form/todo";

const useStyles = makeStyles({
	formWrapper: {
		width: "100%",
		height: "100%",
		borderRadius: "5px",
		backgroundColor: " #F2F2F2",

		padding: "0px 30px",
	},
	inputBorder: {
		border: "1px solid #CCCCCC",
	},
	inputBorderWithError: {
		border: "1px solid red",
	},
	inputStyle: {
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
		color: "#3F3738",
		width: "100%",
		backgroundColor: "#ffffff",
		outline: "none",
		borderRadius: "5px",
		padding: "2px 15px",
		boxShadow: "none",
	},
	messageStyle: {
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
		fontSize: "16px",
		color: "#3F3738",
		width: "93.7%",
		backgroundColor: "#ffffff",
		outline: "none",
		borderRadius: "5px",
		padding: "8px 15px",
		boxShadow: "none",

		"&::placeholder": {
			color: "#9B9FAE",
		},
	},
	errorMessageStyle: {
		fontSize: 12,
		color: "red",
	},

	buttonWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "25px 0px",
		boxShadow: "none",
	},
	formTitle: {
		paddingTop: "20px",
		paddingBottom: "20px",
		fontSize: "18px",
		textAlign: "center",
		color: "#3F3738",
	},
});

const TodoForm = ({ initialValues, addTodos, editTodo, handleClose }) => {
	const {
		formWrapper,
		inputBorder,
		inputBorderWithError,
		inputStyle,
		errorMessageStyle,
		buttonWrapper,
		messageStyle,
		formTitle,
	} = useStyles();

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			onSubmit={(values) => {
				values.todoID ? editTodo(values) : addTodos(values);
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
			}) => {
				return (
					<form onSubmit={handleSubmit}>
						<Box className={formWrapper}>
							<Typography className={formTitle}>
								{values.todoID ? "Edit Todo" : "Add  Todo"}
							</Typography>
							<Box style={{ marginBottom: "25px" }}>
								<Input
									name="input"
									type="text"
									value={values.input}
									onBlur={handleBlur}
									onChange={handleChange}
									placeholder="Enter the title of your task."
									disableUnderline={true}
									className={`${inputStyle} ${
										touched.input && errors.input
											? inputBorderWithError
											: inputBorder
									}`}
								/>
								<Typography className={errorMessageStyle}>
									{touched.input && errors.input}
								</Typography>
							</Box>

							<Box>
								<TextareaAutosize
									name="body"
									value={values.body}
									onChange={handleChange}
									onBlur={handleBlur}
									aria-label="minimum height"
									rowsMin={6}
									placeholder="Enter the description of your task."
									className={`${messageStyle} ${
										touched.body && errors.body
											? inputBorderWithError
											: inputBorder
									}`}
								/>
								<Typography className={errorMessageStyle}>
									{touched.body && errors.body}
								</Typography>
							</Box>

							<Box className={buttonWrapper} boxShadow={1}>
								<Button
									onClick={handleClose}
									color="secondary"
									variant="outlined"
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="primary"
									type="submit"
								>
									{values.todoID ? "Edit Task" : "Add Task"}
								</Button>
							</Box>
						</Box>
					</form>
				);
			}}
		</Formik>
	);
};
export default TodoForm;
