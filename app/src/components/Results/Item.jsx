import React from "react";

function Item(props) {
  return (
    <tr>
      <td>{props.item.children[0].value}</td>
    </tr>
  );
}

export default Item;
