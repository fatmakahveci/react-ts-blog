"use client";

import { Link, Params, useParams } from "react-router-dom";
import { PRODUCTS } from "../../shared/constants";

const ProductDetailPage = (): JSX.Element => {
	const params: Params<string> = useParams();
	const product = PRODUCTS.find((item) => item.id === params.productId);
	if (!product) return <section><h1>Product not found</h1><p>This product is not in the catalog.</p><Link to="/products">Browse products</Link></section>;

	return (
		<section>
			<h1>Product Details</h1>
			<p>{product.title}</p>
			<p>
				<Link to=".." relative="path">Back</Link>
			</p>
		</section>
	);
};
export default ProductDetailPage;
