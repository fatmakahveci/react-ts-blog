"use client";

import { Link } from "react-router-dom";

import "./MainHeader.css";

const MainHeader = () => {
	return (
		<header className="header">
			<nav>
				<ul>
					<li>
						<Link to="/welcome">Welcome</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
