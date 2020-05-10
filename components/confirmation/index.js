import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
	boxWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: " #F2F2F2",
		textAlign: "center",
	},
});

const confirmBox = ({ title, body, onClose, onConfirm, selectedTodo }) => {
	const { boxWrapper } = useStyles();
	console.log({ title, body, onClose, onConfirm });
	return (
		<Box className={boxWrapper}>
			<Typography>{title}</Typography>
			<Typography>{body}</Typography>
			<Box>
				<Button onClick={onClose}>Close</Button>
				<Button onClick={() => onConfirm(selectedTodo.todoID)}>
					Confirm
				</Button>
			</Box>
		</Box>
	);
};
export default confirmBox;
