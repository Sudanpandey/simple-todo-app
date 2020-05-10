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
		backgroundColor: " #F2F2F2",
		textAlign: "center",
	},
	inputBorder: {
		border: "1px solid #CCCCCC",
	},
	inputBorderWithError: {
		border: "1px solid red",
	},
	inputStyle: {
		width: "300px",
		backgroundColor: "#ffffff",
		outline: "none",
		borderRadius: "5px",
		padding: "2px 10px",
		boxShadow: "none",
		marginTop: "50px",
	},
	errorMessageStyle: {
		fontSize: 12,
		color: "red",
	},
	cancelButtonStyle: {
		marginTop: "100px",
		marginBottom: "60px",
		padding: "5px",
		color: "#FFFFFF",
		backgroundColor: "#FEC134",
		boxShadow: "none",
		marginLeft: "8px",
	},
	addButtonStyle: {
		marginTop: "100px",
		marginBottom: "60px",
		padding: "5px",
		color: "#FFFFFF",
		backgroundColor: "#5AB85B",
		boxShadow: "none",
		marginLeft: "8px",
	},
});

const TodoForm = ({ initialValues, addTodos, editTodo, handleClose }) => {
	const {
		formWrapper,
		inputBorder,
		inputBorderWithError,
		inputStyle,
		errorMessageStyle,
		cancelButtonStyle,
		addButtonStyle,
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
							<Box>
								<Input
									name="input"
									type="text"
									value={values.input}
									onBlur={handleBlur}
									onChange={handleChange}
									placeholder="Type  Title of your Task here."
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
									placeholder="Type Description of Task  here"
									className={`${inputStyle} ${
										touched.input && errors.input
											? inputBorderWithError
											: inputBorder
									}`}
								/>
								<Typography className={errorMessageStyle}>
									{touched.body && errors.body}
								</Typography>
							</Box>

							<Box
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
								}}
								boxShadow={1}
							>
								<Button
									onClick={handleClose}
									variant="contained"
									className={cancelButtonStyle}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									type="submit"
									className={addButtonStyle}
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
