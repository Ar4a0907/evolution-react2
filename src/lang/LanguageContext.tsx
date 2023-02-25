import React from "react";
import { Language } from "../types";

// the context interface
// todo: hint: use this interface to represent the context and remove 'eslint-disable' on the next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface LanguageState {
    currentLanguage: Language;
    toggleLanguage: () => void;
    getTranslatedValue: (key: string) => string;
}

interface LanguageProviderProps {
    children: React.ReactNode;
}

/*
 * todo: replace mock provider with real one
 * hint: TranslateText is used as component and main consumer of translation context
 * hint: LanguageSwitchButton is a component that uses the context to change the language
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    return <>{children}</>;
};
