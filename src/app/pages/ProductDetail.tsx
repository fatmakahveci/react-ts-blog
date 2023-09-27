"use client";

import { Link, Params, useParams } from "react-router-dom";

const ProductDetailPage = (): JSX.Element => {
	const params: Params<string> = useParams();

	return (
		<section>
			<h1>Product Details</h1>
			<p>{params.productId}</p>
			<p>
				<Link to=".." relative="path">Back</Link>
			</p>
		</section>
	);
};
export default ProductDetailPage;
