import React from "react";
import { useDispatch } from "react-redux";

import {
  // ICartSliceState,
  TCartItem,
  addItem,
  // selectCart,
  // selectCartItem,
} from "../../redux/slices/cartSlice";
import { useAppSelector } from "../../redux/store";

const typeNames = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  // function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  // const [pizzaCount, setPizzaCount] = React.useState(0)

  // const onCLickAdd = () => {
  //   setPizzaCount(pizzaCount + 1);
  // }
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  // const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id));

  // const addedCount = cartItem ? cartItem.count : 0;

  // const cartItem = useSelector((state) =>
  //   state.cart.items.find(
  //     (obj) =>
  //       obj.id === id &&
  //       obj.type === typeNames[activeType] &&
  //       obj.size === sizes[activeSize]
  //   )
  // );


  // const cartItem = useSelector(selectCartItem(id, typeNames, sizes));
  const cartItems = useAppSelector((state) => state.cart.items);
  // const [addedCount, setAddedCount] = React.useState(0);

  // React.useEffect(() => {
  //   const totalCount = cartItems.reduce((acc, item) => {
  //     if (item.id === id) {
  //       acc += item.count;
  //     }
  //     return acc;
  //   }, 0)
  //   setAddedCount(totalCount);
  // }, [cartItems]);



  const addedCount = React.useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.id === id) {
        acc += item.count;
      }
      console.log('acc', acc);
      return acc;
      
    }, 0);
  }, [cartItems]);  
  console.log('memo', addedCount);
  
  // setAddedCount(totalCount);

  // addedCount = cartItem ? cartItem.count : 0;

  const onCLickAdd = () => {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div className="pizza-full-block">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </div>

        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={(event) => {
                  setActiveType(typeId);
                  event.preventDefault();
                }}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((sizeId, index) => (
              <li
                key={sizeId}
                onClick={(event) => {
                  setActiveSize(index);
                  event.preventDefault();
                }}
                className={activeSize === index ? "active" : ""}
              >
                {sizeId} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={(event) => {
              onCLickAdd();
              event.preventDefault();
            }}
            // onClick={onCLickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>

            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
