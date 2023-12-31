import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import CountryList from '../pages/CountryList/CountryList';
import CountryPage from '../pages/CountryPage/CountryPage';
import Map from '../pages/Map/Map';

interface IRoute {
    path: string;
    element: React.ReactNode;
    exact?: boolean;
}

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/world',
            element: <Map />,
        },
        {
            path: '/world/country/:id',
            element: <CountryPage />,
        },
        {
            path: '/world/countrys',
            element: <CountryList />,
        },
    ]);

    return router;
};

export default AppRouter;
