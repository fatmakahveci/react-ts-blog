"use client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";

export const routes = [
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "products", element: <Products /> },
			{ path: "products/:productId", element: <ProductDetailPage /> },
		],
	},
];

const router = createBrowserRouter(routes);

const App = (): JSX.Element => {
	return <RouterProvider router={router} />;
};

export default App;
