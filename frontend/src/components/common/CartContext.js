import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = props => {
  const [item, setItem] = useState([
    // {
    //   id: "1",
    //   avatarWord: "R",
    //   title: "Shrimp and Chorizo Paella",
    //   subheader: "September 14, 2019",
    //   img: "https://material-ui.com/static/images/cards/paella.jpg",
    //   desc: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    //   sellingPrice: 75,
    //   discount: 15
    // }
  ]);
  return <CartContext.Provider value={{ item, setItem }}>{props.children}</CartContext.Provider>;
};
