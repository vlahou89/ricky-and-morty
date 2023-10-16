export async function fetchData(endpoint: string) {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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
