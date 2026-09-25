import type { JSX } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage, { ErrorContent } from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <p role="status">Loading page…</p>,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorContent />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "products/:productId", element: <ProductDetailPage /> },
          {
            path: "*",
            element: <></>,
            loader: () => {
              throw new Response("Not found", { status: 404 });
            },
          },
        ],
      },
    ],
  },
];

const router =
  import.meta.env.VITE_ROUTER_MODE === "hash"
    ? createHashRouter(routes)
    : createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
