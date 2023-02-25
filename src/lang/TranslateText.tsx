import React from "react";
import { TranslationKey, TRANSLATIONS } from "./translations";
import { Language } from "../types";

interface TranslateTextProps {
    translationKey: TranslationKey;
}

// todo: use LanguageContext to get translated value
export const TranslateText: React.FC<TranslateTextProps> = ({ translationKey }) => {
    const lang: Language = "en";

    const translated = TRANSLATIONS[lang][translationKey];

    return (
        <span data-test="translated-text" data-test-key={translationKey}>{translated}</span>
    );
};
