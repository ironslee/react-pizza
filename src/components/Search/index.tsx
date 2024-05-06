import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import styles from "./Search.module.scss";
// import { SearchContext } from "../../App";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  // const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    // setSearchValue("");
    dispatch(setSearchValue(""));
    setValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
  };

  // const debounce = (fn, ms) => {
  //   let timeout;
  //   return function () {
  //     const fnCall = () => {
  //       fn.apply(this, arguments);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(fnCall, ms);
  //   };
  // };

  // const debounce = (callback, wait) => {
  //   let timeoutId = null;
  //   return (...args) => {
  //     window.clearTimeout(timeoutId);
  //     timeoutId = window.setTimeout(() => {
  //       callback(...args);
  //     }, wait);
  //   };
  // };

  // function useDebounce(value: string, delay: number = 500) {
  //     const [debouncedValue, setDebouncedValue] = useState(value);

  //     useEffect(() => {
  //       const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

  //       return () => {
  //         clearTimeout(timer);
  //       };
  //     }, [value, delay]);

  //     return debouncedValue;
  //   }

  const updateSearchValue = React.useCallback(
    debounce((event: string) => {
      // setSearchValue(event);
      dispatch(setSearchValue(event));
    }, 500),
    []
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  // const onChange = debounce((event) => setSearchValue(event.target.value), 500);
  // const debouncedSearchvalue = useDebounce(searchValue, 500);
  // const debouncedValue = debounce(onChange, 500);

  // useEffect(() => {
  //   if (debouncedSearchvalue) {
  //     // onSearch(debouncedSearchvalue);
  //   }
  // }, [debouncedSearchvalue]);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.close}
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
