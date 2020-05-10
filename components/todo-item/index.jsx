import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Box, Typography, FormControlLabel, Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const Wrapper = styled.div`
	.MuiExpansionPanelSummary-content {
		justify-content: space-between;
		align-items: center;
		margin: 0px;
	}
`;

const useStyles = makeStyles({
	secondaryHeading: {
		color: "green",
	},
	strikeText: {
		textDecoration: "line-through",
	},
});

const TodoItem = ({
	todo,
	setSelectedTodo,
	completeTodo,
	handleOpen,
}) => {
	const { secondaryHeading, strikeText } = useStyles();

	return (
		<ExpansionPanel>
			<Wrapper>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography
						className={
							todo.completed
								? `${secondaryHeading} ${strikeText}`
								: `${secondaryHeading}`
						}
					>
						{todo.input}
					</Typography>
					<Box>
						<FormControlLabel
							aria-label="Acknowledge"
							onClick={(event) => event.stopPropagation()}
							onFocus={(event) => event.stopPropagation()}
							control={
								<Button
									onClick={() => {
										setSelectedTodo(todo);
										handleOpen("delete", true);
									}}
								>
									<DeleteIcon style={{ color: "#DC4146" }} />
								</Button>
							}
						/>

						<FormControlLabel
							aria-label="Acknowledge"
							onClick={(event) => event.stopPropagation()}
							onFocus={(event) => event.stopPropagation()}
							control={
								<Button
									disabled={todo.completed}
									onClick={() => {
										setSelectedTodo(todo);
										handleOpen("edit", true);
									}}
								>
									<EditIcon style={{ color: "#178FEB" }} />
								</Button>
							}
						/>
						<FormControlLabel
							aria-label="Acknowledge"
							onClick={(event) => event.stopPropagation()}
							onFocus={(event) => event.stopPropagation()}
							control={
								<Button
									disabled={todo.completed}
									onClick={() => completeTodo(todo)}
								>
									<DoneIcon style={{ color: "#5BB85B" }} />
								</Button>
							}
						/>
					</Box>
				</ExpansionPanelSummary>
			</Wrapper>

			<ExpansionPanelDetails>
				<Typography
					style={{
						wordBreak: "break-all",
					}}
				>
					{todo.body}
				</Typography>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
export default TodoItem;
