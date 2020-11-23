import React from "react";
import Item from "./Item";

function Items(props) {
  if (props.items === null || props.items === undefined) return null;

  return props.items.map(item => (
    <Item key={item.children[0].value} item={item} />
  ));
}

export default Items;
