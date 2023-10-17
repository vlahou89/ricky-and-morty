import React, { useRef, useEffect, useState } from "react";
import { CharacterCardProps } from "../types";
import Image from "next/image";

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  openModal,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const getStatusCircleColor = () => {
    switch (character.status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-white";
    }
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      openModal(character);
    } else if (e.key === "ArrowRight" && cardRef.current) {
      navigateCard("right");
    } else if (e.key === "ArrowLeft" && cardRef.current) {
      navigateCard("left");
    } else if (e.key === "ArrowDown" && cardRef.current) {
      navigateCard("down");
    } else if (e.key === "ArrowUp" && cardRef.current) {
      navigateCard("up");
    }
  };

  const navigateCard = (direction: "left" | "right" | "up" | "down") => {
    if (cardRef.current) {
      const cards = document.querySelectorAll(".character-card");
      const currentIndex = Array.from(cards).indexOf(cardRef.current);
      let newIndex = currentIndex;

      if (direction === "right") {
        newIndex += 1;
      } else if (direction === "left") {
        newIndex -= 1;
      } else if (direction === "down") {
        newIndex += 5;
      } else if (direction === "up") {
        newIndex -= 5;
      }

      if (newIndex < 0) newIndex = 0;
      if (newIndex >= cards.length) newIndex = cards.length - 1;
      (cards[newIndex] as HTMLElement).focus();
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("focus", (e: FocusEvent) =>
        setIsFocused(true)
      );
      cardRef.current.addEventListener("focus", () => setIsFocused(true));
      cardRef.current.addEventListener("blur", () => setIsFocused(false));
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.addEventListener("focus", (e: FocusEvent) =>
          setIsFocused(true)
        );
        cardRef.current.removeEventListener("focus", () => setIsFocused(true));
        cardRef.current.removeEventListener("blur", () => setIsFocused(false));
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      className={`rounded overflow-hidden shadow-lg max-h-42 bg-gray-600 cursor-pointer border-2 border-transparent hover:border-lime-400 ${
        isFocused ? "outline-card" : ""
      }`}
      onClick={openModal}
      onKeyDown={handleKeyDown}
      role="button"
      data-testid="character-card"
    >
      <div className="h-12 flex items-center justify-center">
        <div
          className={`h-2 w-2 rounded-full mr-2 ${getStatusCircleColor()}`}
          data-testid="status-circle"
        />
        <h3 className="text-sm text-lime-300 py-2 font-bold text-center">
          {character.name}
        </h3>
      </div>
      <Image
        src={character.image}
        alt={`${character.name} Thumbnail`}
        width={220}
        height={200}
      />
    </div>
  );
};

export default CharacterCard;
