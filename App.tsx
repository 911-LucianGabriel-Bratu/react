import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Episode from "./components/Episode";
import Header from "./components/Header";
import { EpisodeDto } from "./dto/EpisodeDto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Watchlist from "./components/Watchlist";
import { get } from "http";
import { addEpisode, getEpisodes } from "./service/EpisodeService";
import { addCharacter, getCharacters } from "./service/CharacterService";
import { CharacterDto } from "./dto/CharacterDto";
import Character from "./components/Character";
import { CharacterFullDto } from "./dto/CharacterFullDto";

function App() {
  const [episodeList, setEpisodeList] = useState<EpisodeDto[]>([]);
  const [characterList, setCharacterList] = useState<CharacterDto[]>([]);
  const addEpisodeToList = (episode: EpisodeDto) => {
    setEpisodeList([...episodeList, episode]);
  };
  const addEpisodeToListBackend = (episode: EpisodeDto) => {
    addEpisode(episode)
      .then(() => getEpisodes().then((response) => response.data))
      .then((data) => setEpisodeList(data))
      .catch((error) => console.log(error));
  };

  const addCharacterToList = (characterFullDto: CharacterFullDto) => {
    addCharacter(characterFullDto)
      .then(() => getCharacters().then((response) => response.data))
      .then((data) => setCharacterList(data))
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   fetch("episodes.json")
  //     .then((value) =>
  //       value.json().then((finalListWithNull) => {
  //         const finalList = finalListWithNull.map((value: EpisodeDto) => {
  //           return { ...value, releaseDate: new Date(), airDate: new Date() };
  //         });
  //         setEpisodeList(finalList);
  //       })
  //     )
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    getEpisodes()
      .then((response) => {
        return response.data;
      })
      .then((data) => setEpisodeList(data))
      .catch((error) => console.log(error));

    getCharacters()
      .then((response) => {
        return response.data;
      })
      .then((data) => setCharacterList(data))
      .catch((error) => console.log(error));
  }, []);

  const addToWatchlist = useCallback(
    (episode: EpisodeDto) => {
      setEpisodeList(
        episodeList.map((e) => {
          return e.id !== episode.id
            ? e
            : { ...e, inWatchlist: !e.inWatchlist };
        })
      );
    },
    [episodeList]
  );

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Episode
                episodes={episodeList}
                addEpisodeToList={addEpisodeToListBackend}
                addEpisodeToWatchlist={addToWatchlist}
              />
            }
          ></Route>
          <Route
            path="/watchlist"
            element={
              <Watchlist
                episodes={episodeList}
                addToWatchlist={addToWatchlist}
              />
            }
          ></Route>
          <Route
            path="/characters"
            element={
              <Character
                characters={characterList}
                addCharacterToList={addCharacterToList}
              ></Character>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
