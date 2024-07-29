import { useCallback } from "react";
import { EpisodeDto } from "../dto/EpisodeDto";
import { Button, Card, Col, Row } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

// props
interface IOwnProps {
  episode: EpisodeDto;
  addToWatchlist: (episodeDto: EpisodeDto) => void;
}
export default function EpisodeInfo(props: IOwnProps) {
  const { episode, addToWatchlist } = props;

  const handleOnClick = () => {
    addToWatchlist(episode);
  };

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      title={<div>{"Episode Number " + episode.episodeNr}</div>}
      cover={
        <img
          src={episode.platform === "Netflix" ? "netflix-icon.png" : "max.png"}
          alt=""
          width="200"
          height="200"
        />
      }
      extra={
        <>
          <Button
            icon={
              episode.inWatchlist ? (
                <MinusOutlined></MinusOutlined>
              ) : (
                <PlusOutlined></PlusOutlined>
              )
            }
            onClick={handleOnClick}
          >
            {episode.inWatchlist ? "Remove" : "Add to watchlist"}{" "}
          </Button>
        </>
      }
    >
      <p>Release Date: {episode.releaseDate.toString()}</p>
      <p>Air Date: {episode.airDate.toString()}</p>
      <p>Country: {episode.country}</p>
      <p>Platform: {episode.platform}</p>
      <p>{episode.inWatchlist ? "In watchlist" : "Not in watchlist"}</p>
    </Card>
    // <div className="episodeCard" key={episode.id}>
    //   <span>Episode Number: {episode.episodeNr}</span>
    //   <div>Release Date: {episode.releaseDate.toDateString()}</div>
    //   <div>Air Date: {episode.airDate.toDateString()}</div>
    //   <div>
    //     <img
    //       src={episode.platform === "Netflix" ? "netflix-icon.png" : "max.png"}
    //       alt=""
    //       width="100"
    //       height="100"
    //     />
    //   </div>
    //   <div>Country: {episode.country}</div>
    //   <div>Platform: {episode.platform}</div>
    //   <span>{episode.inWatchlist ? "In watchlist" : "Not in watchlist"}</span>
    //   <button onClick={handleOnClick}>
    //     {episode.inWatchlist ? "Remove" : "Add to watchlist"}
    //   </button>
    // </div>
  );
}
