import React from "react";

import "./ItemActions.css";
import { TranslateText } from "../lang/TranslateText";

export const ItemActions: React.FC = () => {
    return (
        <div className="item-actions">
            <button data-test="edit-item-button" className="button button-small" disabled={true}>
                <TranslateText translationKey="actions.edit" />
            </button>
            <button data-test="remove-item-button" className="button button-small">
                <TranslateText translationKey="actions.remove" />
            </button>
        </div>
    );
};
