import React from "react";
import { ItemActions } from "./ItemActions";

export const ListItem: React.FC = () => {
    // todo: pass item id here
    const id = "item-id";
    return (
        <tr data-test="list-item" data-id={id}>
            <td data-test="list-item-city">Warsaw</td>
            <td data-test="list-item-date">22/02/2022</td>
            <td data-test="list-item-dish">Zurek</td>
            <td data-test="list-item-grades">10, 7, 6.5, 8.3</td>
            <td data-test="list-item-actions"><ItemActions /></td>
        </tr>
    );
};
