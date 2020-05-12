import * as Yup from "yup";

export const todoValidationSchema = Yup.object().shape({
	input: Yup.string()
		.min(5, "Title must be more than 5 letters.")
		.max(55, "Title must be less than 55 letters.")
		.required("Please enter title of your task."),
	body: Yup.string()
		.min(10, "Description must be more than 10 letters.")
		.max(500, "Description must be less than 500 letters.")
		.required("Please enter description of your task."),
});
