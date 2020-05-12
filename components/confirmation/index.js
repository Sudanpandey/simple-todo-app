import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
	boxWrapper: {
		backgroundColor: " #F2F2F2",
		textAlign: "center",
	},
	modelWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	closeButtonStyle: {
		marginTop: "100px",
		marginBottom: "60px",
		padding: "5px",
		color: "#FFFFFF",
		// backgroundColor: "#52AF51",
		boxShadow: "none",
		marginLeft: "8px",
	},
	confirmButtonStyle: {
		marginTop: "100px",
		marginBottom: "60px",
		padding: "5px",
		color: "#FFFFFF",
		// backgroundColor: "#E94336",
		boxShadow: "none",
		marginLeft: "8px",
	},
});

const confirmBox = ({ title, body, onClose, onConfirm, selectedTodo }) => {
	const {
		boxWrapper,
		closeButtonStyle,
		confirmButtonStyle,
		modelWrapper,
	} = useStyles();
	console.log({ title, body, onClose, onConfirm });
	return (
		<Box className={boxWrapper}>
			<Typography>{title}</Typography>
			<Typography>{body}</Typography>
			<Box className={modelWrapper}>
				<Button
					color="primary"
					variant="contained"
					onClick={onClose}
					className={closeButtonStyle}
				>
					Cancel
				</Button>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => onConfirm(selectedTodo.todoID)}
					className={confirmButtonStyle}
				>
					Confirm
				</Button>
			</Box>
		</Box>
	);
};
export default confirmBox;
