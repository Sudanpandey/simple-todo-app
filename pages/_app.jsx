import React from "react";
import App from "next/app";
import Head from "next/head";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<title>Todo App</title>
				</Head>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		);
	}
}

export default MyApp;
