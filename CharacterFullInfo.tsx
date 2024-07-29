import { Button, Card } from "antd";
import { CharacterFullDto } from "../dto/CharacterFullDto";
import { CloseOutlined } from "@ant-design/icons";

// props
interface IOwnProps {
  character: CharacterFullDto;
  id: number;
}
export default function CharacterFullInfo(props: IOwnProps) {
  const { character, id } = props;

  const closeDialog = () => {
    console.log("closing..." + id);
    const myDialog = document.getElementById(
      "characterFullInfoDialog#" + id
    ) as HTMLDialogElement;
    console.log(myDialog);
    myDialog.close();
  };

  if (character !== undefined) {
    console.log("render card");
    return (
      <Card
        style={{ width: 400 }}
        title={<div>{"Full Character Information: "}</div>}
        extra={
          <Button
            onClick={(event) => closeDialog()}
            icon={<CloseOutlined></CloseOutlined>}
          ></Button>
        }
      >
        <p>First Name: {character.firstName ? character.firstName : ""}</p>
        <p>Last Name: {character.lastName ? character.lastName : ""}</p>
        <p>Age: {character.age ? character.age : 0}</p>
        <p>Address: {character.address ? character.address : ""}</p>
      </Card>
    );
  } else {
    console.log("empty");
    return <div></div>;
  }
}
