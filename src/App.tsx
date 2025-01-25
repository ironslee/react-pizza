import React from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from 'react-loadable';


import "./scss/app.scss";

// import Header from "./components/Header";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
// import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>'Идет загрузка корзины...'</div>,
});


const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

// import pizzas from './assets/pizzas.json';

// export const SearchContext = React.createContext();
// console.log(SearchContext);

function App() {
  // const [searchValue, setSearchValue] = React.useState("");
  // console.log(searchValue);

  return (
    // <div className="wrapper">
    //  <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    // <Header />
    // <div className="content">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="react-pizza" element={<Home />} />
        <Route
          path="cart"
          element={
            // <React.Suspense fallback={<div>'Идет загрузка корзины...'</div>}>
              <Cart />
            // </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>'Идет загрузка пиццы...'</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>'Идет загрузка...'</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
    // </div>
    // </SearchContext.Provider>
    //  </div>
  );
}

export default App;
