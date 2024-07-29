import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { EpisodeDto } from "../dto/EpisodeDto";
import dateFormat from "dateformat";
interface IOwnProps {
  addEpisodeToList: (dto: EpisodeDto) => void;
}
export default function AddNewEpisodeDialog(props: IOwnProps) {
  const { addEpisodeToList } = props;

  // state
  const episodeNo = useRef<string>();
  const [platform, setPlatform] = useState("");
  const [country, setCountry] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [airDate, setAirDate] = useState<Date | null>(null);

  const closeDialog = () => {
    const myDialog = document.getElementById(
      "episodeDialog"
    ) as HTMLDialogElement;
    myDialog.close();
  };
  // clean-up example
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const episodeDto: EpisodeDto = {
  //       id: 0,
  //       episodeNr: '9999',
  //       platform: 'Netflix',
  //       country: 'Romania',
  //       releaseDate: new Date(),
  //       airDate: new Date(),
  //     };
  //     addEpisodeToList(episodeDto);
  //   }, intervalState);
  //   // clean-up function
  //   return () => {
  //     console.log('Clean-up');
  //     clearInterval(interval);
  //   };
  // }, [intervalState, addEpisodeToList]);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const episodeDto: any = {
      id: 0,
      episodeNr: episodeNo.current ? episodeNo.current : "",
      platform: platform,
      country: country,
      releaseDate: releaseDate
        ? dateFormat(releaseDate, "yyyy:mm:dd hh:mm:ss")
        : dateFormat(new Date(), "yyyy:mm:dd hh:mm:ss"),
      airDate: airDate
        ? dateFormat(airDate, "yyyy:mm:dd hh:mm:ss")
        : dateFormat(new Date(), "yyyy:mm:dd hh:mm:ss"),
    };
    console.log(episodeDto);
    addEpisodeToList(episodeDto);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "episodeNo":
        episodeNo.current = value;
        break;
      case "platform":
        setPlatform(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "releaseDate":
        setReleaseDate(new Date(value));
        break;
      case "airDate":
        setAirDate(new Date(value));
        break;
      default:
        break;
    }
  };
  return (
    <dialog id="episodeDialog">
      <title>Create new episode dialog</title>

      <form id="myForm" onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="episodeNo">Episode number</label>
          <input
            type="number"
            id="episodeNo"
            name="episodeNo"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="platform">Platform</label>
          <input
            type="text"
            id="platform"
            name="platform"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label htmlFor="airDate">Air Date</label>
          <input
            type="date"
            id="airDate"
            name="airDate"
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
