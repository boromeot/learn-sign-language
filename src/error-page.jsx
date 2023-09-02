import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1>404 x_x </h1>
      <p>Sorry, that page doesn't exist!</p>
      <p>
        <i><i>{error.statusText || error.message}</i></i>
      </p>
    </div>
  );
}