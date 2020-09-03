import React, { useState, useCallback } from "react";
import {
  Card,
  Button,
  ResourceItem,
  Thumbnail,
  TextStyle,
  Badge,
  Frame,
  Link,
  Toast,
  Banner,
  TextContainer,
  ButtonGroup,
} from "@shopify/polaris";
import { ITitleData } from "../types/Title";
import NoImg from "../assets/no-img.png";
import { ShareMinor, PageDownMajorMonotone } from "@shopify/polaris-icons";
import qs from "querystring";

interface INominations {
  nominations: Array<ITitleData>;
  setNominations: Function;
}

const NominationList: React.FC<INominations> = ({
  nominations,
  setNominations,
}) => {
  /**
   * Remove a nomination from the nominations state
   * @param id ID of said title to be removed
   */
  const removeNomination = (id: string) => {
    const updatedList = nominations.filter(
      (title: ITitleData) => title.imdbID !== id
    );
    setNominations(updatedList);
  };

  /**
   * Copies the created URL from window.location.href to be shared
   */
  const saveLink = useCallback(() => {
    const basePath =
      window.location.protocol + "//" + window.location.host + "/";
    let queryString = qs.stringify({
      imdbID: nominations?.map((title) => title.imdbID).join(","),
    });
    let updatedURL = basePath + "?" + queryString;
    navigator.clipboard.writeText(updatedURL);
  }, [nominations]);

  /**
   *  Tost from Polaris
   */
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    saveLink();
    setActive((active) => !active);
  }, [saveLink]);

  const toastMarkup = active ? (
    <Toast content="Link Copied!" onDismiss={toggleActive} />
  ) : null;
  /**
   * Toast from Polaris
   */

  return nominations.length === 0 ? (
    <></>
  ) : (
    <Frame>
      <Card title="Your Nominations" sectioned>
        {nominations.length === 5 ? (
          <Banner status="success">
            <p>You have finalized 5 nominations!</p>
          </Banner>
        ) : (
          <></>
        )}
        <Card.Section title="Info">
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
              <Button icon={ShareMinor} size="medium" onClick={toggleActive}>
                Share
              </Button>
              <Button
                icon={PageDownMajorMonotone}
                download="nominations.json"
                url={`data:application/json;charset=utf-8,${encodeURIComponent(
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
        <Card.Section title="Titles">
          <TextStyle variation="subdued">
            <span role="img" aria-label="cross">
              ❎
            </span>{" "}
            Remove nominations if you change your mind about a choice.
          </TextStyle>
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
        {toastMarkup}
      </Card>
    </Frame>
  );
};

export default NominationList;
