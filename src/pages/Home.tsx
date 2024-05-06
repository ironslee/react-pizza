import React from "react";
import { useSelector } from "react-redux";
// import axios from "axios";
import QueryString from "qs";
import { Link, useNavigate } from "react-router-dom";

import {
  FetchPizzasArgs,
  fetchPizzas,
  // selectPizzaData,
} from "../redux/slices/pizzaSlice";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../redux/store";
// import { SearchContext } from "../App";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // const [items, setItems] = React.useState([]);
  const { items, status } = useAppSelector((state) => state.pizza);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const { searchValue } = React.useContext(SearchContext);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  // const sortType = useSelector((state) => state.filter.sort);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMount = React.useRef(false);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  // const setSortType = () => {};

  const getPizzas = async () => {
    // setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `title=${searchValue}` : "";

    // fetch(
    //   `https://657b39e9394ca9e4af140258.mockapi.io/items?page= ${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     if (Array.isArray(arr) === false) {
    //       setItems([]);
    //     } else {
    //       setItems(arr);
    //     }

    //     setIsLoading(false);
    //   })
    // .catch((err) => {
    //   setItems([]);
    //   console.log({ ...err });
    // });

    // await axios
    //   .get(
    //     `https://657b39e9394ca9e4af140258.mockapi.io/items?page= ${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    // setItems([]);
    // setIsLoading(false);
    // console.log({ ...err });
    //   });

    //   try {
    //     const { data } = await axios.get(
    //       `https://657b39e9394ca9e4af140258.mockapi.io/items?page= ${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`
    //     );
    //     dispatch(setItems(data));
    //     setIsLoading(false);
    //   } catch (err) {
    //     dispatch(setItems([]));
    //     console.log({ ...err });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    // try {
    //   dispatch(fetchPizzas({
    //     order,
    //     sortBy,
    //     category,
    //     search,
    //     currentPage,
    //   }));
    //   setIsLoading(false);
    // } catch (err) {
    //   dispatch(fetchPizzas([]));
    //   console.log({ ...err });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // проверяет на первый рендер
  React.useEffect(() => {
    if (isMount.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
      console.log(queryString);
    }
    isMount.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // если был первый рендер то проверяем url параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArgs;
      console.log(params);
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      // if (sort) {
      //   params.sortBy = sort;
      // }

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          sort: sort || sortList[0],
          currentPage: Number(params.currentPage),
          // ...params,
        })
      );
      // dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log(isSearch);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const pizzas = items.map((obj) => (
    <Link to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  // .filter((obj) => {
  //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true;
  //   }
  //   return false;
  // })

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          // onChangeCategory={(id) => onChangeCategory(id)}
          onChangeCategory={onChangeCategory}
        />
        {/* <Sort value={sortType} onChangeSort={(id) => setSortType(id)} /> */}
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading..." ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  );
};

export default Home;
