import * as Yup from "yup";

export const todoValidationSchema = Yup.object().shape({
	input: Yup.string()
		.min(5, " Your Entered task is Too Short!")
		.max(55, "  Your Entered task isToo Long!")
		.required(" First,Your Task  is required Here"),
	body: Yup.string()
		.min(10, " Your Entered task is Too Short!")
		.max(500, "  Your Entered task isToo Long!")
		.required(" First,Your DEscription  Task  is required Here"),
});
 

