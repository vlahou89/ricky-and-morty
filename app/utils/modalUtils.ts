import { Dispatch, SetStateAction } from "react";
import { Character } from "../types";

interface Page {
  next: string;
}

export async function loadMore(
  page: Page,
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  updateResults: Dispatch<SetStateAction<Character[]>>,
  updatePage: Dispatch<SetStateAction<Page>>
) {
  if (page.next) {
    const res = await fetch(page.next);
    const newData = await res.json();
    updateResults((prevResults) => [...prevResults, ...newData.results]);
    updatePage(newData.info);
  }
}

export async function openModal(
  character: Character,
  setSelectedCharacter: Dispatch<SetStateAction<Character | null>>,
  setModalVisible: Dispatch<SetStateAction<boolean>>,
  fetchEpisodes: (episodeUrls: any) => Promise<any[]>,
  setSelectedCharacterEpisodes: Dispatch<SetStateAction<any[]>>
) {
  setSelectedCharacter(character);
  setModalVisible(true);

  const episodeDetails = await fetchEpisodes(character.episode);
  setSelectedCharacterEpisodes(episodeDetails);
}

export function closeModal(
  setSelectedCharacter: Dispatch<SetStateAction<Character | null>>,
  setSelectedCharacterEpisodes: Dispatch<SetStateAction<any[]>>,
  setModalVisible: Dispatch<SetStateAction<boolean>>
) {
  setSelectedCharacter(null);
  setSelectedCharacterEpisodes([]);
  setModalVisible(false);
}
