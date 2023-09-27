"use client";

import MainHeader from "../components/MainHeader";

const ErrorPage = (): JSX.Element => {
	return (
		<>
			<MainHeader />
			<main>
				<h1>An error occurred!</h1>
				<p>Could not find this page!</p>
			</main>
		</>
	);
};

export default ErrorPage;
