import type { JSX } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import ThemeToggle from "./ThemeToggle";

const MainHeader = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <button
        type="button"
        className="skip-link"
        aria-controls="main-content"
        onClick={() => {
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </button>
      <span className={classes.brand}>
        <span className={classes.brandMark} aria-hidden="true">
          f.
        </span>
        form<span className={classes.brandDot}> / </span>
      </span>
      <nav aria-label="Main navigation">
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default MainHeader;
