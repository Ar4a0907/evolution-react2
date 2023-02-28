import React, { useEffect, useState } from "react";
import "./App.css";
import { LoadingOverlay } from "./loading-overlay/LoadingOverlay";
import { LanguageSwitchButton } from "./lang/LanguageSwitchButton";
import { SoundsContainer } from "./sound/SoundsContainer";
import { NoteAddForm } from "./form/NoteAddForm";
import { List } from "./list/List";
import { NetworkHandler } from "./network/NetworkHandler";
import { useRequest } from "./network/useRequest";
import { Note } from "./types";

// todo: get data on initial render
export const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { response, isLoading, makeRequest } = useRequest(NetworkHandler.getNotes);
    const [list, setList] = useState<Note[]>([]);

    useEffect(() => {
        makeRequest();
    }, []);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (Array.isArray(response)) {
            setList(response);
        }
    }, [response]);

    return (
        <div className="container root-container">
            <div className="row header">
                <h2>Bob&apos;s admin</h2>
                <LanguageSwitchButton />
            </div>

            <div className="row content">
                <div className="column column-60 left-column">
                    <List listItems={list} listSetter={setList} />
                </div>
                <div className="column column-40 right-column">
                    <NoteAddForm lastId={list.length} listSetter={setList} />
                </div>
            </div>
            <LoadingOverlay isVisible={loading} />
            <SoundsContainer />
        </div>
    );
};
