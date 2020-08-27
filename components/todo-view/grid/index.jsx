import { Box, makeStyles } from "@material-ui/core";

import { TodoItem, NoTodo } from "../../";
import { styled } from "../../../theme";

const Wrapper = styled.div`
	margin: 0px 20px 20px 20px;
	flex-grow: 1;
`;

const useStyles = makeStyles({
	root: {
		marginTop: "30px",
		display: "flex",
		flexWrap: "wrap",
	},
});

const Grid = ({
	todos,
	deleteTodos,
	setSelectedTodo,
	completeTodo,
	handleOpen,
	selectedDate,
}) => {
	const { root } = useStyles();
	return (
		<Box className={root}>
			{todos.length ? (
				todos.map((todo) => {
					return (
						<Wrapper>
							<TodoItem
								todo={todo}
								deleteTodos={deleteTodos}
								setSelectedTodo={setSelectedTodo}
								completeTodo={completeTodo}
								handleOpen={handleOpen}
							/>
						</Wrapper>
					);
				})
			) : (
				<NoTodo selectedDate={selectedDate} />
			)}
		</Box>
	);
};

export default Grid;
