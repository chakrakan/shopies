import React from "react";
import {
  Card,
  Button,
  ResourceItem,
  Thumbnail,
  TextStyle,
  Badge,
  Link,
} from "@shopify/polaris";
import { ITitleData } from "../types/Title";
import NoImg from "../assets/no-img.png";

interface INominations {
  nominations: Array<ITitleData>;
  setNominations: Function;
}

const NominationList = ({ nominations, setNominations }: INominations) => {
  const removeNomination = (id: string) => {
    const updatedList = nominations.filter(
      (title: ITitleData) => title.imdbID !== id
    );
    setNominations(updatedList);
  };

  return !nominations?.length ? (
    <></>
  ) : (
    <Card title="Nominations" sectioned>
      <Card.Section title="Info">
        <TextStyle variation="subdued">
          <span role="img" aria-label="clapper-board">
            🎬
          </span>{" "}
          You can remove your nominations
        </TextStyle>
      </Card.Section>
      <Card.Section title="Titles">
        {nominations.map((title: ITitleData) => (
          <ResourceItem
            key={title.imdbID}
            id={title.imdbID}
            name={title.Title}
            verticalAlignment="center"
            onClick={() => {}}
            accessibilityLabel={`Details for ${title.Title}`}
            media={
              <Thumbnail
                source={title.Poster !== "N/A" ? title.Poster : NoImg}
                alt={title.Title}
                size="large"
              ></Thumbnail>
            }
          >
            <h3>
              <Link
                external
                url={`https://www.imdb.com/title/${title.imdbID}/`}
              >
                <TextStyle variation="strong">{title.Title}</TextStyle>
              </Link>
              &nbsp;
              <TextStyle variation="subdued">({title.Year})</TextStyle>
            </h3>
            <div>
              <Badge size="small" status="info">
                {title.Type}
              </Badge>
            </div>
            <br></br>
            <div>
              <Button
                outline
                onClick={() => removeNomination(title.imdbID)}
                size="slim"
              >
                Remove
              </Button>
            </div>
          </ResourceItem>
        ))}
      </Card.Section>
    </Card>
  );
};

export default NominationList;
