import React from "react";
import { ListItem } from "./ListItem";

import "./List.css";
import { TranslateText } from "../lang/TranslateText";

export const List: React.FC = () => {
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
                <ListItem />
            </tbody>
        </table>
    );
};
