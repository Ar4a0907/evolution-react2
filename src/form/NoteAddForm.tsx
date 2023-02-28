import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { GradesInput } from "./GradesInput";
import { TranslateText } from "../lang/TranslateText";
import "./NoteAddForm.css";
import { Note } from "../types";
import { NetworkHandler } from "../network/NetworkHandler";
import { isResponseError, useRequest } from "../network/useRequest";
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";
import { ButtonWithSoundProps, withSound } from "../sound/withSound";

type ListProps = {
    lastId: number;
    listSetter: Dispatch<SetStateAction<Note[]>>;
};

type InputValues = {
    city: string;
    name: string;
    note: string;
    grades: number[];
    date: string;
};

const ButtonWithSound: React.FC<ButtonWithSoundProps> = withSound(({ children, ...props }) => {
    return (
        <button {...props}>{children}</button>
    );
});

export const NoteAddForm: React.FC<ListProps> = ({ lastId, listSetter }) => {
    const [submittingNote, setSubmitNote] = useState<Note>({
        id: "",
        city: "",
        favouriteDish: {
            name: "",
            note: "",
        },
        grades: [],
        date: "",
    });
    const [hasError, setHasError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputValues, setInputValue] = useState<InputValues>({
        city: "",
        name: "",
        note: "",
        grades: [],
        date: "",
    });

    const addNote = useCallback(() => {
        return NetworkHandler.addNote(submittingNote);
    }, [submittingNote]);

    const removeErrorNode = useCallback(() => {
        return NetworkHandler.removeNote(submittingNote.id);
    }, [submittingNote]);

    const { response, isLoading, makeRequest } = useRequest(addNote);
    const RemoveErrorRequest = useRequest(removeErrorNode);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputValue(current => ({ ...current, [name]: value }));
    }, []);

    useEffect(() => {
        if (submittingNote.id !== "") {
            makeRequest();
        }
    }, [submittingNote]);

    useEffect(() => {
        if (response !== null) {
            if (isResponseError(response)) {
                setHasError(true);
                RemoveErrorRequest.makeRequest();
            } else {
                setInputValue({
                    city: "",
                    name: "",
                    note: "",
                    grades: [],
                    date: "",
                });
                listSetter(response);
            }
        }
    }, [response]);

    const checkValidation = useCallback(() => {
        if (inputValues.city.trim() && inputValues.name.trim() && inputValues.date.trim() && inputValues.grades.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [inputValues]);

    useEffect(() => {
        checkValidation();
    }, [inputValues, checkValidation]);

    const handleButtonClick = useCallback(() => {
        const { city, name, note, grades, date } = inputValues;
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        const submitNote: Note = {
            id: `id${lastId + 1}`,
            city,
            favouriteDish: {
                name,
                note,
            },
            grades,
            date: formattedDate,
        };
        setSubmitNote(submitNote);
    }, [inputValues, lastId]);

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
                name="city"
                onChange={handleChange}
                value={inputValues.city}
            />
            <label htmlFor="city-name">
                <TranslateText translationKey="form.label.favouriteDish" />
            </label>
            <input
                data-test="form-dish"
                type="text"
                placeholder="Chicken Kyiv"
                id="favourite-dish"
                name="name"
                onChange={handleChange}
                value={inputValues.name}
            />
            <label htmlFor="note-field">
                <TranslateText translationKey="form.label.notes" />
            </label>
            <textarea
                data-test="form-dish-note"
                style={{ resize: "vertical" }}
                placeholder="Dear Slim, I wrote you but you still ain't callin'"
                id="note-field"
                name="note"
                onChange={handleChange}
                value={inputValues.note}
            />
            <label htmlFor="grades-field">
                <TranslateText translationKey="form.label.grades" />
            </label>
            <GradesInput gradesSetter={setInputValue} inputValues={inputValues.grades} />
            <label htmlFor="visit-date">
                <TranslateText translationKey="form.label.date" />
            </label>
            {/* NOTE! date has to be *saved* in format `DD/MM/YYYY` */}
            <input
                data-test="form-date"
                type="date"
                id="visit-date"
                name="date"
                onChange={handleChange}
                value={inputValues.date}
            />
            <div className="submit-button-container">
                {hasError && (
                    <div className="form-error" data-test="form-error">
                        <TranslateText translationKey="form.error" />
                    </div>
                )}
                <ButtonWithSound
                    soundType="positive"
                    data-test="form-save-button"
                    className="button-primary disabled"
                    type="submit"
                    value="Save note"
                    disabled={!isFormValid || isLoading}
                    onClick={handleButtonClick}
                >
                    <TranslateText translationKey="form.button.save" />
                </ButtonWithSound>
            </div>
            <LoadingOverlay isVisible={isLoading} />
        </div>
    );
};
