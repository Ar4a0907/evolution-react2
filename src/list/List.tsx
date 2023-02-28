import React, { Dispatch, SetStateAction } from "react";
import { ListItem } from "./ListItem";
import "./List.css";
import { TranslateText } from "../lang/TranslateText";
import { Note } from "../types";

type ListProps = {
    listItems: Note[];
    listSetter: Dispatch<SetStateAction<Note[]>>;
};

export const List: React.FC<ListProps> = ({ listItems, listSetter }) => {
    return (
        <table className="list">
            <thead>
                <tr>
                    <th><TranslateText translationKey="tableHeader.city" /></th>
                    <th><TranslateText translationKey="tableHeader.date" /></th>
                    <th><TranslateText translationKey="tableHeader.dish" /></th>
                    <th><TranslateText translationKey="tableHeader.grades" /></th>
                    <th style={{ width: "15rem" }}><TranslateText translationKey="tableHeader.actions" /></th>
                </tr>
            </thead>
            <tbody>
                {listItems.map(item => (
                    <ListItem key={item.id} item={item} listSetter={listSetter} />
                ))}
            </tbody>
        </table>
    );
};
