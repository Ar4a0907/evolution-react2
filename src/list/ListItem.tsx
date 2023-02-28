import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { ItemActions } from "./ItemActions";
import { Note } from "../types";
import { useRequest } from "../network/useRequest";
import { NetworkHandler } from "../network/NetworkHandler";
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";

interface ListItemProps {
    item: Note;
    listSetter: Dispatch<SetStateAction<Note[]>>;
}

export const ListItem: React.FC<ListItemProps> = ({ item, listSetter }) => {
    const { response, isLoading, makeRequest } = useRequest(() => NetworkHandler.removeNote(id));

    useEffect(() => {
        if (Array.isArray(response)) {
            listSetter(response);
        }
    }, [response, listSetter]);

    const handleRemove = useCallback(() => {
        makeRequest();
    }, [makeRequest]);

    const { id, city, favouriteDish, grades, date } = item;
    return (
        <>
            <tr data-test="list-item" data-id={id}>
                <td data-test="list-item-city">{city}</td>
                <td data-test="list-item-date">{date}</td>
                <td data-test="list-item-dish">{favouriteDish.name}</td>
                <td data-test="list-item-grades">{grades.join(", ")}</td>
                <td data-test="list-item-actions"><ItemActions onRemove={handleRemove} /></td>
            </tr>
            <LoadingOverlay isVisible={isLoading} />
        </>
    );
};
