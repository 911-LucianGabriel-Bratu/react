import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { CharacterFullDto } from "../dto/CharacterFullDto";

interface IOwnProps {
  addCharacterToList: (dto: CharacterFullDto) => void;
}
export default function AddNewCharacterDialog(props: IOwnProps) {
  const { addCharacterToList } = props;

  // state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<string>("");

  const closeDialog = () => {
    const myDialog = document.getElementById(
      "characterDialog"
    ) as HTMLDialogElement;
    myDialog.close();
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const characterDto: CharacterFullDto = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      address: address,
    };
    addCharacterToList(characterDto);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "age":
        setAge(Number(value));
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };
  return (
    <dialog id="characterDialog">
      <title>Create new character dialog</title>

      <form id="myForm" onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleInputChange}
          ></input>
        </div>
        <button type="submit" id="submitButton">
          Submit
        </button>
      </form>
      <button id="closeDialogButton" onClick={closeDialog}>
        Close Dialog
      </button>
    </dialog>
  );
}
