import * as Yup from "yup";

import { STRING_OF_CHARACTERS } from "../../";

export const signupValidationSchema = Yup.object().shape({
	firstname: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.matches(STRING_OF_CHARACTERS, "Only enter name with alphabets")
		.required("First name  is required"),
	lastname: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.matches(STRING_OF_CHARACTERS, "Only enter name with alphabets")
		.required("Last name is required"),
	email: Yup.string()
		.email("Enter valid email")
		.min(2, "Too Short!")
		.max(25, "Too Long!")

		.required("Email is required"),
	password: Yup.string()
		.min(2, "Too Short!")
		.max(25, "Too Long!")
		.min(6, "Password has to be longer than 6 characters!")
		.required("Password  is required"),
	cpassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required(" Confirm Password  is required"),
	venue: Yup.bool().oneOf([true], "Must agree to something"),
});
