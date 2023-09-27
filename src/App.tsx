"use client";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import "./globals.css";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
	return (
		<Router>
			<MainHeader />
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/products" element={<Products />} />
				<Route path="/welcome" element={<Welcome />} />
			</Routes>
		</Router>
	);
}

export default App;
