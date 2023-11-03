import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import CountryList from '../pages/CountryList/CountryList';
import CountryPage from '../pages/CountryPage/CountryPage';
import Map from '../pages/Map/Map'

interface IRoute {
    path: string;
    element: React.ReactNode;
    exact?: boolean;
}

const routes: IRoute[] = [
    {
        path: '/',
        element: <Map />,
    },
    {
        path: '/country/:id',
        element: <CountryPage />,
    },
    {
        path: '/countrys',
        element: <CountryList />,
    },
];

const AppRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            routes.map((el) => <Route path={el.path} element={el.element} key={el.path} />),
        ),
    );

    return router;
};

export default AppRouter;
