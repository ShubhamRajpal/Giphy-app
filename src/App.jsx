import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Favorites from "./components/Favorites";
import Category from "./components/Category";
import GifPage from "./components/GifPage";
import AppLayout from "./components/AppLayout";
import GifProvider from "./context/gifContext";
import GPTSearch from "./components/GPTSearch";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },
      {
        path: "/:type/:slug",
        element: <GifPage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/gptSearch",
        element: <GPTSearch />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={appRouter} />
    </GifProvider>
  );
};

export default App;
