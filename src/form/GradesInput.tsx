import React from "react";
import { Grade } from "./Grade";

import "./GradesInput.css";
import { TranslateText } from "../lang/TranslateText";

// just a mock - use props/state whatever :)
const grades = [12, 2, 3, 4, 5];

// todo: implement the logic of adding new grades and removal on click
// validate so the value entered is >0.1 and <10. Numbers have to contain max two digits after coma
// Just disable button if grade is invalid
export const GradesInput: React.FC = () => {
    const onGradeRemove = (index: number) => () => {
        console.log(">>>", "Remove grade on index", index);
    };

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
                />
                <button data-test="add-grade-button">
                    <TranslateText translationKey="form.button.addGrade" />
                </button>
            </div>
            <div className="grades-list">
                {grades.map((grade, index) =>
                    <Grade key={index} value={grade} onRemove={onGradeRemove(index)} />,
                )}
            </div>
        </div>
    );
};
