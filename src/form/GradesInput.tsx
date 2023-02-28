import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Grade } from "./Grade";
import { TranslateText } from "../lang/TranslateText";
import "./GradesInput.css";
import { ButtonWithSoundProps, withSound } from "../sound/withSound";

type InputValues = {
    city: string;
    name: string;
    note: string;
    grades: number[];
    date: string;
};

type GradesInputProps = {
    gradesSetter: Dispatch<SetStateAction<InputValues>>;
    inputValues: number[];
};

const ButtonWithSound: React.FC<ButtonWithSoundProps> = withSound(({ children, ...props }) => {
    return (
        <button {...props}>{children}</button>
    );
});

export const GradesInput: React.FC<GradesInputProps> = ({ gradesSetter, inputValues }) => {
    const [validGrade, setValidGrade] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onGradeRemove = (index: number) => () => {
        gradesSetter(current => ({ ...current, grades: current.grades.filter((grade, gradeIndex) => gradeIndex !== index) }));
    };

    const onAddGrade = useCallback(() => {
        if (inputRef.current !== null) {
            const inputValue = parseFloat(inputRef.current?.value || "10");
            gradesSetter(current => ({ ...current, grades: [...current.grades, inputValue] }));
            setValidGrade(false);
        }
        if (inputRef.current !== null) {
            inputRef.current.value = "";
        }
    }, [gradesSetter]);

    const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && parseFloat(event.target.value) >= 0.1 && parseFloat(event.target.value) <= 10) {
            setValidGrade(true);
        } else {
            setValidGrade(false);
        }
    }, []);

    return (
        <div>
            <div className="grades-input-container">
                <input
                    id="grades-field"
                    data-test="add-grade-input"
                    className="grades-input"
                    type="number"
                    min={0.1}
                    max={10}
                    placeholder="10"
                    ref={inputRef}
                    onChange={handleInput}
                />
                <ButtonWithSound soundType="positive" onClick={onAddGrade} disabled={!validGrade} data-test="add-grade-button">
                    <TranslateText translationKey="form.button.addGrade" />
                </ButtonWithSound>
            </div>
            <div className="grades-list">
                {inputValues.map((grade, index) =>
                    // eslint-disable-next-line
                    <Grade key={index} value={grade} onRemove={onGradeRemove(index)} />,
                )}
            </div>
        </div>
    );
};
