import axios from "axios";
import { CharacterFullDto } from "../dto/CharacterFullDto";

const api = axios.create({baseURL: "http://localhost:8080"})

const getCharacters = () => {
    return api.get("/characters")
}

const addCharacter = (characterFullDto: CharacterFullDto) => {
    return api.post("characters/save", characterFullDto);
}

const getCharacterFullInfo = (id: number) => {
    return api.get("/characters/full-info?id=" + id);
}

export { getCharacters, addCharacter, getCharacterFullInfo };