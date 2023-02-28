import React, { useCallback, useContext } from "react";
import { Language } from "../types";
import { LanguageContext } from "./LanguageContext";

import "./LanguageSwitch.css";

const langToFlagMap: Record<Language, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
};

// todo: toggles language on click
// no need of any fancy UX. Just toggle on click :)
export const LanguageSwitchButton: React.FC = () => {
    const languageContext = useContext(LanguageContext);
    const lang: Language = languageContext?.currentLanguage || "en";

    const handleClick = useCallback(() => {
        languageContext?.toggleLanguage();
    }, [languageContext]);

    return (
        <div onClick={handleClick} data-test="land-switch-button" data-lang={lang} className="lang-switch">
            {langToFlagMap[lang]}
        </div>
    );
};
