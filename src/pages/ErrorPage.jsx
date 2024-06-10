import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <h1>Oh no! This route doesn&apos;t exist!!</h1>
            <Link to='/'>Go back home</Link>
            <h2>Error:</h2>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;
