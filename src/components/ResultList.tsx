import React, { useState, useCallback } from "react";
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
  TextContainer,
  ButtonGroup,
  Toast,
  Frame,
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

const ResultList: React.FC<IResultList> = ({
  currentTitle,
  isCalled,
  isLoading,
  titles,
  nominations,
  setNominations,
}) => {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    saveLink();
    setActive((active) => !active);
  }, []);

  const toastMarkup = active ? (
    <Toast content="Link Copied!" onDismiss={toggleActive} />
  ) : null;

  const searchData = titles?.titles.Search;

  const nominate = (id: string) => {
    const nominatedTitle: ITitleData | undefined = searchData?.find(
      (title) => title.imdbID === id
    );
    setNominations([...nominations, nominatedTitle]);
  };

  /**
   * Copies the created URL from window.location.href to be shared
   */
  const saveLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return !searchData && currentTitle.length < 1 ? (
    <></>
  ) : searchData === null && currentTitle.length ? (
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
      <Card.Section title="Info">
        <TextStyle variation="subdued">
          <span role="img" aria-label="pensive">
            😔
          </span>{" "}
          Sorry, no movies with that title found.<br></br>
          <span role="img" aria-label="memo">
            📝
          </span>{" "}
          Try refining your search query!
        </TextStyle>
      </Card.Section>
    </Card>
  ) : nominations.length === 5 ? (
    <Frame>
      <Card
        title={
          isLoading && isCalled ? (
            <Spinner
              accessibilityLabel="Loading search results"
              size="large"
              color="teal"
            ></Spinner>
          ) : (
            `Share Nominations`
          )
        }
        sectioned
      >
        <Banner status="success">
          <p>You have finalized 5 nominations!</p>
        </Banner>
        <Card.Section>
          <TextContainer spacing="loose">
            <p>
              Click <strong>Share</strong> to receive a link that provides a
              quick overview of your nominations to someone on the browser.
              <br></br>
              <br></br>
              Alternatively, you can choose to <strong>Download</strong> your
              nominations data in JSON format.
            </p>
            <hr></hr>
            <ButtonGroup fullWidth>
              <Button size="medium" onClick={toggleActive}>
                Share
              </Button>
              <Button
                download="nominations.json"
                url={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(nominations)
                )}`}
                size="medium"
                primary
              >
                Download
              </Button>
            </ButtonGroup>
          </TextContainer>
        </Card.Section>
        {toastMarkup}
      </Card>
    </Frame>
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
      <Card.Section title="Info">
        <TextStyle variation="subdued">
          <span role="img" aria-label="clapper-board">
            ℹ️
          </span>{" "}
          Click on a movie <strong>title</strong> to find out more about it on
          IMDB<br></br>
          <span role="img" aria-label="trophy">
            🏆
          </span>{" "}
          You can nominate <strong>{5 - nominations?.length}</strong> movies!
        </TextStyle>
      </Card.Section>

      <Card.Section title="Titles">
        {searchData?.map((title: ITitleData) => (
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
                primary
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
