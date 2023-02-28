import React from "react";
import ReactDOM from "react-dom";
import "./LoadingOverlay.css";

interface LoadingOverlayProps {
    isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
    const overlay = (
        <div data-test="loading-overlay" className="loader-overlay">
            <span className="loader" />
        </div>
    );

    return isVisible
        ? ReactDOM.createPortal(
            overlay,
            document.getElementById("loading-overlay") as HTMLElement,
        )
        : null;
};
