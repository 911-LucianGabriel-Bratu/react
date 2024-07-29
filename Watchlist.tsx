import { useEffect, useMemo } from "react";
import { EpisodeDto } from "../dto/EpisodeDto";
import EpisodeInfo from "./EpisodeInfo";
import { Row } from "antd";

interface IOwnProps {
  episodes: EpisodeDto[];
  addToWatchlist: (episodeDto: EpisodeDto) => void;
}

export default function Watchlist(props: IOwnProps) {
  const { episodes, addToWatchlist } = props;
  // useEffect(() => {
  //   console.log(episodes.filter((value: EpisodeDto) => value.inWatchlist));
  // }, [episodes.map((e) => e.inWatchlist)]);

  const filteredCards = () => {
    return episodes.filter((value: EpisodeDto) => value.inWatchlist);
  };

  return (
    <>
      {"WATCHLIST"}
      <Row gutter={3}>
        {filteredCards().map((episode: EpisodeDto) => (
          <EpisodeInfo
            episode={episode}
            addToWatchlist={addToWatchlist}
            key={episodes.indexOf(episode)}
          />
        ))}
      </Row>
    </>
  );
}
