import { Button, Card } from "antd";
import { CharacterDto } from "../dto/CharacterDto";
import { getCharacterFullInfo } from "../service/CharacterService";
import { CharacterFullDto } from "../dto/CharacterFullDto";
import { useEffect, useState } from "react";
import { error } from "console";
import CharacterFullInfo from "./CharacterFullInfo";
import { icons } from "antd/es/image/PreviewGroup";
import RefIcon from "@ant-design/icons/lib/icons/AccountBookOutlined";

// props
interface IOwnProps {
  character: CharacterDto;
}
export default function CharacterInfo(props: IOwnProps) {
  const { character } = props;
  const [fullCharacterInfo, setFullCharacterInfo] =
    useState<CharacterFullDto>();

  useEffect(() => {
    getCharacterFullInfo(character.id)
      .then((response) => response.data)
      .then((data) => setFullCharacterInfo(data))
      .catch((error) => console.log(error));
  }, []);

  const openDialog = () => {
    getCharacterFullInfo(character.id)
      .then((response) => response.data)
      .then((data) => setFullCharacterInfo(data))
      .catch((error) => console.log(error));
    const myDialog = document.getElementById(
      "characterFullInfoDialog#" + character.id
    ) as HTMLDialogElement;
    myDialog.showModal();
  };

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      title={<div>{"Full Name: " + character.name}</div>}
    >
      <Button
        icon={<RefIcon></RefIcon>}
        onClick={(event) => openDialog()}
      ></Button>
      <p>Age: {character.age}</p>
      <dialog id={"characterFullInfoDialog#" + character.id}>
        <CharacterFullInfo
          id={character.id}
          character={fullCharacterInfo!}
        ></CharacterFullInfo>
      </dialog>
    </Card>
  );
}
