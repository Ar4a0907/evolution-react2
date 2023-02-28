import React, { useContext } from "react";
import { TranslationKey } from "./translations";
import { LanguageContext } from "./LanguageContext";

interface TranslateTextProps {
    translationKey: TranslationKey;
}

// todo: use LanguageContext to get translated value
export const TranslateText: React.FC<TranslateTextProps> = ({ translationKey }) => {
    const languageContext = useContext(LanguageContext);
    const translated = languageContext?.getTranslatedValue(translationKey);

    return (
        <span data-test={translated} data-test-key={translationKey}>{translated}</span>
    );
};
