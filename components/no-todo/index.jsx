import moment from "moment";

const NoTodo = ({ selectedDate }) => {
	return (
		<p
			style={{
				textAlign: "center",
				color: "#606F89",
			}}
		>
			{`No todos found for
${moment(selectedDate).format("dddd, MMMM Do YYYY")}`}
		</p>
	);
};

export default NoTodo;
