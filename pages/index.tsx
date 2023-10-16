import { useState, Dispatch, SetStateAction } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";
import Button from "@/app/components/Button";
import CharacterCard from "@/app/components/CharacterCard";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEpisodes } from "../app/utils/apiUtils";
import { loadMore, openModal, closeModal } from "../app/utils/modalUtils";
import CharacterModal from "@/app/components/CharacterModal";
import { Character, Data } from "../app/types";
import Header from "@/app/components/Header";

const defaultEndpoint = "https://rickandmortyapi.com/api/character";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }: { data: Data }) {
  const { results: defaultResults = [], info } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState(info);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [selectedCharacterEpisodes, setSelectedCharacterEpisodes] = useState<
    any[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();

  const handleSearchInput = (e: any) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        search();
      }, 1000)
    );
  };

  async function search() {
    if (searchTerm) {
      const endpoint = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        const { info, results } = data;

        const partialMatchResults = results.filter((result: any) =>
          result.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        updatePage({ ...info, current: endpoint });
        updateResults(partialMatchResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      updateResults(defaultResults);
      updatePage((prevState) => ({
        ...prevState,
        next: defaultEndpoint,
      }));
    }
  }
  return (
    <main className="bg-gray-900">
      <Header searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

      <div className="flex min-h-screen flex-col items-center justify-between  ">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-between  px-4 max-w-7xl m-auto">
          <AnimatePresence initial={false}>
            {results.map((result: Character) => (
              <motion.li
                role="listitem"
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CharacterCard
                  character={result}
                  openModal={() =>
                    openModal(
                      result,
                      setSelectedCharacter,
                      setModalVisible,
                      fetchEpisodes,
                      setSelectedCharacterEpisodes
                    )
                  }
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {page.next && (
          <Button
            text="Load More"
            onClick={() => loadMore(page, fetch, updateResults, updatePage)}
            className="flex right-0 my-12"
          />
        )}
        {modalVisible && selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            episodes={selectedCharacterEpisodes}
            closeModal={() =>
              closeModal(
                setSelectedCharacter,
                setSelectedCharacterEpisodes,
                setModalVisible
              )
            }
          />
        )}
      </div>
    </main>
  );
}
