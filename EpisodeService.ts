import axios from "axios";
import { EpisodeDto } from "../dto/EpisodeDto";


const api = axios.create({baseURL: "http://localhost:8080"})

const getEpisodes = () => {
    return api.get("/episode/get-episodes");
}

const addEpisode = (episodeDto: EpisodeDto) => {
    return api.post("/episode/save-episode", episodeDto);
}

export {getEpisodes, addEpisode};