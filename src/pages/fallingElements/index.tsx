import React, { useState, useEffect } from "react";
import FallingElement from "./fallingElement";

const elements: string[] = [
    "trophy.png",
    "dice.png",
    "sword.png",
    "witchHat.png",
    "pawn.png",
    "pacman.png",
    "sheild.png",
    "bomb.png",
    "coin.png",
    "potion.png",
    "bowArrow.png",
];

const getElement = (): number => {
    return Math.floor(Math.random() * 11); //used to generate a random index from the assets array
};

const getSize = () => {
    let size = Math.floor(Math.random() * (60 - 40)) + 40;
    return { width: size, height: size }; //used to generate a random size every time an element is made to fall
};

const FallingElements: React.FC = () => {
    const [fallingElements, setFallingElements] = useState<React.ReactNode[]>(
        []
    ); //used to append new elements to the falling elements

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFallingElements((prev) => [
                ...prev,
                <FallingElement
                    src={elements[getElement()]}
                    size={getSize()}
                    key={Date.now()}
                />,
            ]);
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <>{fallingElements}</>;
};

export default FallingElements;
