import React from "react";
import Item from "./Item";

function Items(props) {
  if (props.items === null || props.items === undefined || props.items.length === 0) return [
    <tr>
    <td>-</td>
  </tr>
  ];

  return props.items.map(item => (
    <Item key={item.children[0].value} item={item} />
  ));
}

export default Items;
