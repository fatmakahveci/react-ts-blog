import type { JSX } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import RouteAnnouncer from "../components/RouteAnnouncer";

export function ErrorContent() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <section>
      <h1>{notFound ? "Page not found" : "Something went wrong"}</h1>
      <p>
        {notFound
          ? "The page you requested does not exist."
          : "We could not display this page. Please try again."}
      </p>
      <Link to="/">Return to home</Link>
    </section>
  );
}

export default function ErrorPage(): JSX.Element {
  return (
    <>
      <RouteAnnouncer />
      <MainHeader />
      <main id="main-content" tabIndex={-1}>
        <ErrorContent />
      </main>
    </>
  );
}
