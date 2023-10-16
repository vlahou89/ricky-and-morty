import { useEffect, useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";
import { fetchData } from "../app/utils/index";

interface Character {
  id: number;
  name: string;
}
interface Data {
  results: Character[];
}

const defaultEndpoint = "https://rickandmortyapi.com/api/character";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }: { data: Data }) {
  const { results: defaultResults = [] } = data;

  const [results, updateResults] = useState(defaultResults);

  const router = useRouter();

  useEffect(() => {
    fetchData(
      router.query.page
        ? `https://rickandmortyapi.com/api/character/?page=${router.query.page}&per_page=20`
        : defaultEndpoint
    );
  }, [router.query.page]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Characters
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-between md:px-20 px-4 max-w-7xl m-auto">
        {results.map((result: any) => (
          <li role="listitem" key={result.id}>
            {" "}
            {result.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
