import React, { createContext, useMemo, useState } from "react";
import { Language } from "../types";
import { TRANSLATIONS } from "./translations";

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

export const LanguageContext = createContext<LanguageState | null>(null);

/*
 * todo: replace mock provider with real one
 * hint: TranslateText is used as component and main consumer of translation context
 * hint: LanguageSwitchButton is a component that uses the context to change the language
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const [currentLanguage, setLanguage] = useState<Language>("en");

    const contextValue = useMemo(() => {
        const toggleLanguage = () => {
            setLanguage(prevLanguage => {
                if (prevLanguage === "en") {
                    return "es";
                }
                return "en";
            });
        };

        const getTranslatedValue = (key: string) => {
            return TRANSLATIONS[currentLanguage][key];
        };

        return { currentLanguage, toggleLanguage, getTranslatedValue };
    }, [currentLanguage]);
    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
