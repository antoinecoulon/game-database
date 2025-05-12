import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { fetchGames } from "./api";
import logo from "/logo.png";
import Search from "./components/Search";
import GameCard from "./components/GameCard";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";
import GameDetails from "./components/GameDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);

  const { data, loading, fetchData, error, reset } = useFetch(() =>
    fetchGames({ query: searchQuery })
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData();
        return;
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <main className="w-full p-2 flex flex-col items-center">
      <div className="flex items-center">
        <h1 className="text-gradient text-4xl font-bold">Game Database</h1>
        <img src={logo} alt="Logo" className="w-25 h-25" />
      </div>
      <div className="w-full max-w-4xl">
        <Search
          query={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="w-full">
          {!loading && !showGameDetails ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data?.results.map(
                  (game) =>
                    game.added > 30 && (
                      <GameCard
                        key={game.slug}
                        name={game.name}
                        coverLink={game.background_image}
                        playtime={game.playtime}
                        genres={game.genres}
                        onClick={() => {
                          setCurrentGame(game);
                          setShowGameDetails(true);
                        }}
                      />
                    )
                )}
              </div>
              {data?.results.length === 0 && (
                <ErrorMessage message={"No games found!"} />
              )}
            </>
          ) : showGameDetails ? (
            <GameDetails
              currentGame={currentGame}
              goBack={() => {
                setShowGameDetails(false);
                setCurrentGame(null);
              }}
            />
          ) : (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {error && <ErrorMessage message={"Network Error Occurred!"} />}
        </div>
      </div>
    </main>
  );
}

export default App;
