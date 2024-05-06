import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const params = useParams();
  console.log(params);
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://657b39e9394ca9e4af140258.mockapi.io/items/" + params.id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>LOADING...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
