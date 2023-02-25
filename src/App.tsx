import React from "react";
import "./App.css";
import { LoadingOverlay } from "./loading-overlay/LoadingOverlay";
import { LanguageSwitchButton } from "./lang/LanguageSwitchButton";
import { SoundsContainer } from "./sound/SoundsContainer";
import { NoteAddForm } from "./form/NoteAddForm";
import { List } from "./list/List";

// todo: get data on initial render
export const App: React.FC = () => {
    return (
        <div className="container root-container">
            <div className="row header">
                <h2>Bob&apos;s admin</h2>
                <LanguageSwitchButton />
            </div>

            <div className="row content">
                <div className="column column-60 left-column">
                    <List />
                </div>
                <div className="column column-40 right-column">
                    <NoteAddForm />
                </div>
            </div>
            <LoadingOverlay isVisible={false} />
            <SoundsContainer />
        </div>
    );
};
