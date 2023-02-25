import React from "react";
import { GradesInput } from "./GradesInput";
import { TranslateText } from "../lang/TranslateText";

import "./NoteAddForm.css";

// todo: implement Note add form
//  - The only validation you should apply for it is check for all non-empty inputs (except the optional `Notes about dish/city`)
//  - Disable save button while request is pending
export const NoteAddForm: React.FC = () => {
    const hasError = true;

    return (
        <div data-test="note-add-form">
            <h3 data-test="form-header">
                <TranslateText translationKey="form.header.add" />
            </h3>
            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.city" />
            </label>
            <input
                data-test="form-city"
                type="text"
                placeholder="Kyiv"
                id="city-name"
            />
            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.favouriteDish" />
            </label>
            <input
                data-test="form-dish"
                type="text"
                placeholder="Chicken Kyiv"
                id="favourite-dish"
            />
            <label htmlFor="note-field">
                <TranslateText translationKey="form.label.notes" />
            </label>
            <textarea
                data-test="form-dish-note"
                style={{ resize: "vertical" }}
                placeholder="Dear Slim, I wrote you but you still ain't callin'"
                id="note-field"
            />
            <label htmlFor="grades-field">
                <TranslateText translationKey="form.label.grades" />
            </label>
            <GradesInput />
            <label htmlFor="visit-date">
                <TranslateText translationKey="form.label.date" />
            </label>
            {/* NOTE! date has to be *saved* in format `DD/MM/YYYY` */}
            <input data-test="form-date" type="date" id="visit-date" />
            <div className="submit-button-container">
                {hasError && (
                    <div className="form-error" data-test="form-error">
                        <TranslateText translationKey="form.error" />
                    </div>
                )}
                <button
                    data-test="form-save-button"
                    className="button-primary disabled"
                    type="submit"
                    value="Save note"
                >
                    <TranslateText translationKey="form.button.save" />
                </button>
            </div>
        </div>
    );
};
