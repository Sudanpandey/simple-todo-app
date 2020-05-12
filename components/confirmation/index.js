import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
	boxWrapper: {
		backgroundColor: " #F2F2F2",
		borderRadius: "5px",
		textAlign: "center",
	},
	modelWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",

		padding: " 0px 20px 17px 20px",
	},
	titleStyle: {
		paddingTop: "10px",
		fontSize: "20px",
		color: "#3F3738",
	},
	bodyStyle: {
		padding: "15px 20px 20px",
		fontSize: "15px",
		color: "#8E9190",
	},
});

const confirmBox = ({ title, body, onClose, onConfirm, selectedTodo }) => {
	const { boxWrapper, modelWrapper, titleStyle, bodyStyle } = useStyles();
	console.log({ title, body, onClose, onConfirm });
	return (
		<Box className={boxWrapper}>
			<Typography className={titleStyle}>{title}</Typography>
			<Typography className={bodyStyle}>{body}</Typography>
			<Box className={modelWrapper}>
				<Button color="primary" variant="outlined" onClick={onClose}>
					Cancel
				</Button>
				<Button
					color="secondary"
					variant="outlined"
					onClick={() => onConfirm(selectedTodo.todoID)}
				>
					Confirm
				</Button>
			</Box>
		</Box>
	);
};
export default confirmBox;
