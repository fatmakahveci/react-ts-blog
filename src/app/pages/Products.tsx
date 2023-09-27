"use client";

import { Link } from "react-router-dom";
import { PRODUCTS } from "../../shared/constants";
import { Product } from "../../shared/types";

const Products = (): JSX.Element => {
	return (
		<>
			<h1>Products</h1>
			<ul>
				{PRODUCTS.map((product: Product) => (
					<li key={product.id}>
						<Link to={product.id}>{product.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default Products;
