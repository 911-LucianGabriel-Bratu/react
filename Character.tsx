import { Button, Row, Space } from "antd";
import { CharacterDto } from "../dto/CharacterDto";
import CharacterInfo from "./CharacterInfo";
import { CharacterFullDto } from "../dto/CharacterFullDto";
import AddNewCharacterDialog from "./AddNewCharacterDialog";

interface IOwnProps {
  characters: CharacterDto[];
  addCharacterToList: (characterFullDto: CharacterFullDto) => void;
}

export default function Character(props: IOwnProps) {
  const { characters, addCharacterToList } = props;

  const openDialog = () => {
    const dialog = document.getElementById(
      "characterDialog"
    ) as HTMLDialogElement;
    dialog.showModal();
  };

  return (
    <>
      {"Characters"}
      <div className="display-flex margin-small-top">
        <Button onClick={openDialog}>Add New Character</Button>
      </div>
      <Row gutter={3}>
        {characters.map((character: CharacterDto) => (
          <CharacterInfo
            character={character}
            key={characters.indexOf(character)}
          />
        ))}
      </Row>

      <AddNewCharacterDialog
        addCharacterToList={addCharacterToList}
      ></AddNewCharacterDialog>
    </>
  );
}
