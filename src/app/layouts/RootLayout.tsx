import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import RouteAnnouncer from "../components/RouteAnnouncer";

const RootLayout = (): JSX.Element => {
  return (
    <>
      <RouteAnnouncer />
      <MainHeader />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>form / everyday objects</span>
        <span>A little less. A little better.</span>
      </footer>
    </>
  );
};

export default RootLayout;
