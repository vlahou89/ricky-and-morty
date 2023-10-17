export async function fetchEpisodes(episodeUrls: any) {
  try {
    const episodeDetails = [];
    for (const url of episodeUrls) {
      const response = await fetch(url);
      const episodeData = await response.json();
      episodeDetails.push(episodeData);
    }
    return episodeDetails;
  } catch (error) {
    console.error("Error fetching episode data:", error);
    return [];
  }
}
