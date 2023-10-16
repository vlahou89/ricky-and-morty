import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { CharacterModalProps } from "../../types";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.5, y: -100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: -100,
    transition: {
      duration: 0.3,
    },
  },
};

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  episodes,
  closeModal,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const h3Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
      },
    },
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          ref={modalRef}
        >
          <motion.h3
            className="text-xl text-center font-bold text-sky-600"
            variants={h3Variants}
          >
            {character.name}
          </motion.h3>
          <div className="flex flex-col md:flex-row text-gray-950">
            <Image
              src={character.image}
              alt={character.name}
              height={200}
              width={300}
              className="border-2 border-lime-400 mr-12"
            />
            <div className="space-y-2 w-96">
              <div>
                <div className="flex flex-row text-sm pb-2">
                  <p className="font-bold">Species:</p>
                  <p> {character.species}</p>
                </div>
                <div className="flex flex-row text-sm pb-2">
                  <p className="font-bold">Type:</p>
                  <p> {character.type}</p>
                </div>
                <div className="flex flex-row text-sm pb-2">
                  <p className="font-bold">Gender:</p>
                  <p> {character.gender}</p>
                </div>
                <div className="flex flex-row text-sm pb-2">
                  <p className="font-bold">Origin:</p>
                  <p> {character.origin.name}</p>
                </div>
                <div className="flex flex-row text-sm pb-2">
                  <p className="font-bold">Location:</p>
                  <p> {character.location.name}</p>
                </div>
              </div>
              <h4 className="text-base font-semibold text-sm">Episodes:</h4>
              <div className="h-auto max-h-32 border-2 border-gray-200 overflow-auto text-sm">
                {episodes.map((episode) => (
                  <p key={episode.id}>{episode.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex float-right">
            <Button text="Close" onClick={closeModal} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterModal;
