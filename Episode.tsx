import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { EpisodeDto } from "../dto/EpisodeDto";
import AddNewEpisodeDialog from "./AddNewEpisodeDialog";
import EpisodeInfo from "./EpisodeInfo";
import SelectComponent from "./common/SelectComponent";
import { Button, Col, Input, Row, Space } from "antd";

interface IOwnProps {
  episodes: EpisodeDto[];
  addEpisodeToList: (episodeDto: EpisodeDto) => void;
  addEpisodeToWatchlist: (episodeDto: EpisodeDto) => void;
}

export default function Episode(props: IOwnProps) {
  const { episodes, addEpisodeToList, addEpisodeToWatchlist } = props;
  const [filterValueForPlatform, setFilterValueForPlatform] =
    useState<string>("");
  const [filterValuesForCountry, setFilterValueForCountry] = useState<string[]>(
    []
  );
  const [selectedCountryValues, setSelectedCountryValues] = useState<string[]>(
    []
  );
  useEffect(() => {
    setFilterValueForCountry(resetCountryFilterList());
  }, [episodes]);

  const resetCountryFilterList = () => {
    const countries = episodes.map((e) => e.country);
    let uniqueCountries: string[] = [];
    for (const c of countries) {
      if (!uniqueCountries.includes(c)) {
        uniqueCountries.push(c);
      }
    }
    return uniqueCountries;
  };

  const openDialog = () => {
    const dialog = document.getElementById(
      "episodeDialog"
    ) as HTMLDialogElement;
    dialog.showModal();
  };

  const filteredCards = useMemo(() => {
    const starTime = performance.now();
    // SIMULEAZA o metoda care dureaza minim 1sec
    while (performance.now() - starTime < 100) {}
    if (
      filterValueForPlatform.length === 0 &&
      selectedCountryValues.length === 0
    ) {
      return episodes;
    } else if (
      filterValueForPlatform.length === 0 &&
      selectedCountryValues.length !== 0
    ) {
      return episodes.filter((value: EpisodeDto) =>
        selectedCountryValues.includes(value.country)
      );
    } else if (
      filterValueForPlatform.length !== 0 &&
      selectedCountryValues.length === 0
    ) {
      return episodes.filter((value: EpisodeDto) =>
        value.platform.includes(filterValueForPlatform)
      );
    } else {
      return episodes.filter(
        (value: EpisodeDto) =>
          selectedCountryValues.includes(value.country) &&
          value.platform.includes(filterValueForPlatform)
      );
    }
  }, [selectedCountryValues, filterValueForPlatform, episodes]);

  return (
    <>
      <div style={{ fontWeight: "bold" }} className="display-flex">
        Number of episodes: {episodes.length}
      </div>
      <div className="display-flex margin-small-top">
        <div>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFilterValueForPlatform(event.target.value)
            }
            placeholder="Platform Filter"
            className="search-input"
          ></Input>
        </div>
        <SelectComponent
          filterValues={filterValuesForCountry}
          label="Country Filter"
          onChangeValueFilter={function (values: string[]): void {
            setSelectedCountryValues(values);
          }}
        />
        <Button onClick={openDialog}>Add New Episode</Button>
      </div>

      {/** Only used for example of useEffect clean-up */}
      {/* <input
        type="checkbox"
        onChange={(changeEvent: ChangeEvent<HTMLInputElement>) =>
          setToggleDialog(changeEvent.target.checked)
        }
      ></input> */}
      <Row gutter={3}>
        {filteredCards.map((episode: EpisodeDto) => (
          <EpisodeInfo
            episode={episode}
            addToWatchlist={addEpisodeToWatchlist}
            key={episodes.indexOf(episode)}
          />
        ))}
      </Row>

      <AddNewEpisodeDialog addEpisodeToList={addEpisodeToList} />
    </>
  );
}
