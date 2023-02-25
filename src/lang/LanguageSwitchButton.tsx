import React from "react";
import { Language } from "../types";

import "./LanguageSwitch.css";

const langToFlagMap: Record<Language, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
};

// todo: toggles language on click
// no need of any fancy UX. Just toggle on click :)
export const LanguageSwitchButton: React.FC = () => {
    const lang = "en";

    return (
        <div data-test="land-switch-button" data-lang={lang} className="lang-switch">{langToFlagMap[lang]}</div>
    );
};
