 import * as Yup from "yup";

export const logInValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please enter valid email")
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.required("Email is required"),
	password: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.min(6, "Password has to be longer than 6 characters!")
		.required(" Password is required"),
});
