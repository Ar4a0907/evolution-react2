import React from "react";
import { NEGATIVE_SOUND_ID, POSITIVE_SOUND_ID } from "./SoundsContainer";

interface WithSoundProps {
    soundType: "positive" | "negative";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ButtonWithSoundProps =
    WithSoundProps &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// todo: implement HOC such way, that sound is played on wrapped component click
// you can play sounds from SoundsContainer by getting those sounds by id or through the context - your choice
export function withSound<P extends WithSoundProps>(Component: React.FC<P>): React.FC<P> {
    const ButtonWithSound: React.FC<P> = ({ soundType, onClick, ...props }) => {
        const playSound = React.useCallback(() => {
            const audioElement = document.getElementById(soundType === "positive" ?
                POSITIVE_SOUND_ID : NEGATIVE_SOUND_ID) as HTMLAudioElement || null;
            if (audioElement !== null) {
                audioElement.play();
            }
        }, [soundType]);

        const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(event);
            }
            playSound();
        }, [onClick, playSound]);

        return <Component {...props as P} onClick={handleClick} />;
    };

    return ButtonWithSound;
}
