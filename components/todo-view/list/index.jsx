import { Box, makeStyles } from "@material-ui/core";

import { TodoItem, NoTodo } from "../../";

const useStyles = makeStyles({
	root: {
		marginTop: "30px",
		marginTop: "20px",
		width: "100%",
	},
	scrollWrapper: {
		display: "flex",
		justifyContent: "center",
	},
	scrollbar: {
		width: "60%",
	},
});

const List = ({
	todos,  
	deleteTodos,
	setSelectedTodo,
	completeTodo,
	handleOpen,
	selectedDate,
}) => {
	const { root, scrollWrapper, scrollbar } = useStyles();
	return (
		<Box className={scrollWrapper}>
			<Box className={scrollbar}>
				<Box className={root}>
					{todos.length ? (
						todos.map((todo) => {
							return (
								<TodoItem
									todo={todo}
									deleteTodos={deleteTodos}
									setSelectedTodo={setSelectedTodo}
									completeTodo={completeTodo}
									handleOpen={handleOpen}
								/>
							);
						})
					) : (
						<NoTodo selectedDate={selectedDate} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default List;
