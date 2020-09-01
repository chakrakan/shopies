import React from "react";
import {
  Card,
  Button,
  Banner,
  TextStyle,
  Spinner,
  ResourceItem,
  Thumbnail,
  Badge,
  Link,
} from "@shopify/polaris";
import { ITitleData, ITitleSearchData } from "../types/Title";
import NoImg from "../assets/no-img.png";

// Result list should take arrays for the titles from response and current nomination
// state so it can display results accordingly
interface IResultList {
  currentTitle: string;
  isCalled: boolean;
  isLoading: boolean;
  titles?: ITitleSearchData;
  nominations: Array<ITitleData>;
  setNominations: Function;
}

const ResultList = ({
  currentTitle,
  isCalled,
  isLoading,
  titles,
  nominations,
  setNominations,
}: IResultList) => {
  const searchData = titles?.titles.Search;
  const nominate = (id: string) => {
    const nominatedTitle = searchData?.find((title) => title.imdbID === id);
    setNominations([...nominations, nominatedTitle]);
  };

  return !searchData?.length ? (
    <></>
  ) : (
    <Card
      title={
        isLoading && isCalled ? (
          <Spinner
            accessibilityLabel="Loading search results"
            size="large"
            color="teal"
          ></Spinner>
        ) : (
          `Search Results for ${currentTitle}`
        )
      }
      sectioned
    >
      {nominations.length === 5 ? (
        <Banner status="success">
          <p>You have nominated 5 movies!</p>
        </Banner>
      ) : (
        <></>
      )}

      <Card.Section title="Info">
        <TextStyle variation="subdued">
          <span role="img" aria-label="clapper-board">
            🎬
          </span>{" "}
          Click on a movie title to find out more about it on IMDB<br></br>
          <span role="img" aria-label="clapper-board">
            🏆
          </span>{" "}
          Pick upto 5 nominations
        </TextStyle>
      </Card.Section>

      <Card.Section title="Titles">
        {searchData.map((title: ITitleData) => (
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
              <Badge
                size="small"
                status={
                  title.Type === "series"
                    ? "info"
                    : title.Type === "movie"
                    ? "success"
                    : "warning"
                }
              >
                {title.Type}
              </Badge>
            </div>
            <br></br>
            <div>
              <Button
                outline
                size="slim"
                onClick={() => nominate(title.imdbID)}
                disabled={
                  nominations.find(
                    (nominated) => nominated.imdbID === title.imdbID
                  ) !== undefined
                }
              >
                Nominate
              </Button>
            </div>
          </ResourceItem>
        ))}
      </Card.Section>
    </Card>
  );
};

export default ResultList;
