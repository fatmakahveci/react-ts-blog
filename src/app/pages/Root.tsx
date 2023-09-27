"use client";

import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

const RootLayout = (): JSX.Element => {
	return (
		<>
			<MainHeader />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
