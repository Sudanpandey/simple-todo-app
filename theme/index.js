import { createMuiTheme } from "@material-ui/core/styles";
import styledComponents from "styled-components";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#5BB85B",
			contrastText: "#ffffff",
		},
	},
});

export const styled  = styledComponents
export default theme;
