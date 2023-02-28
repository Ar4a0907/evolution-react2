import React from "react";
import "./ItemActions.css";
import { TranslateText } from "../lang/TranslateText";
import { ButtonWithSoundProps, withSound } from "../sound/withSound";

interface ItemActionsProps {
    onRemove: () => void;
}

const ButtonWithSound: React.FC<ButtonWithSoundProps> = withSound(({ children, ...props }) => {
    return (
        <button {...props}>{children}</button>
    );
});

export const ItemActions: React.FC<ItemActionsProps> = ({ onRemove }) => {
    return (
        <div className="item-actions">
            <button data-test="edit-item-button" className="button button-small" disabled={true}>
                <TranslateText translationKey="actions.edit" />
            </button>
            <ButtonWithSound soundType="negative" onClick={onRemove} data-test="remove-item-button" className="button button-small">
                <TranslateText translationKey="actions.remove" />
            </ButtonWithSound>
        </div>
    );
};
