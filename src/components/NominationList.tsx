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
  Collapsible,
  TextField,
  Stack,
} from "@shopify/polaris";
import { ITitleData } from "../types/Title";
import NoImg from "../assets/no-img.png";
import {
  SaveMinor,
  ShareMinor,
  PinMajorMonotone,
} from "@shopify/polaris-icons";
import qs from "querystring";

interface INominations {
  nominations: Array<ITitleData>;
  setNominations: Function;
  urlIds: Array<string>;
  user: string;
  users: Array<string>;
  usersFromUrl: Array<string>;
  setUsers: Function;
  listName: string;
  lnameFromUrl: string;
  setUserName: Function;
  setListName: Function;
}

const NominationList: React.FC<INominations> = ({
  nominations,
  setNominations,
  urlIds,
  user,
  users,
  setUsers,
  lnameFromUrl,
  usersFromUrl,
  listName,
  setUserName,
  setListName,
}) => {
  const [collapsibleActive, setCollapsibleActive] = useState(false);

  const handleCollapsibleToggle = useCallback(
    () => setCollapsibleActive(active => !active),
    []
  );
  /**
   * Remove a nomination from the nominations state
   * @param id ID of said title to be removed
   */
  const removeNomination = (id: string) => {
    const updatedList = nominations.filter(
      (title: ITitleData) => title.imdbID !== id
    );
    setNominations(updatedList);
    localStorage.removeItem("nominations");
  };

  /**
   * Copies the created URL from window.location.href to be shared
   */
  const saveLink = useCallback(() => {
    const basePath =
      window.location.protocol + "//" + window.location.host + "/";

    let queryString = qs.stringify({
      imdbID: nominations?.map(title => title.imdbID).join(","),
      users: user,
      lname: listName,
    });
    let updatedURL = basePath + "?" + queryString;
    navigator.clipboard.writeText(updatedURL);
  }, [nominations, listName, user]);

  const pinNominations = useCallback(() => {
    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations]);

  /**
   *  Tost from Polaris
   */
  const [active, setActive] = useState(false);
  const [pinActive, setPinActive] = useState(false);

  const togglePinActive = useCallback(() => {
    pinNominations();
    setPinActive(active => !active);
  }, [pinNominations]);

  const pinToastMarkup = pinActive ? (
    <Toast content="Nominations Pinned!" onDismiss={togglePinActive} />
  ) : null;

  const toggleActive = useCallback(() => {
    saveLink();
    setActive(active => !active);
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
            <ul>
              <li>
                Click <strong>Share</strong> to receive a link that provides a
                quick overview of your nominations to someone on the browser.
              </li>
              <li>
                Feel free to name the list and add yourself as a contributor.
              </li>
              <li>
                Alternatively, you can choose to <strong>Download</strong> your
                nominations data in JSON format.
              </li>
            </ul>
          </TextContainer>
        </Card.Section>
        {urlIds?.length === 5 ? (
          <></>
        ) : (
          <Card.Section title="Add details">
            <Stack vertical>
              <Button onClick={handleCollapsibleToggle} primary fullWidth>
                Add User Info
              </Button>
              <Collapsible
                open={collapsibleActive}
                id="basic-collapsible"
                transition={{ duration: "150ms", timingFunction: "ease" }}
              >
                {urlIds?.length > 0 ? (
                  <></>
                ) : (
                  <TextField
                    value={listName}
                    onChange={e => {
                      if (e === "") {
                        setListName("Anonymous List");
                      }
                      setListName(e);
                    }}
                    label="List Name"
                    type="text"
                  />
                )}

                <TextField
                  value={user}
                  onChange={e => {
                    if (e === "") {
                      setUserName("Anonymous User");
                    }
                    setUserName(e);
                  }}
                  label="Your Name"
                  type="text"
                />
              </Collapsible>
            </Stack>
          </Card.Section>
        )}

        <Card.Section>
          <ButtonGroup fullWidth>
            <ButtonGroup segmented>
              <Button
                icon={PinMajorMonotone}
                size="medium"
                onClick={togglePinActive}
              >
                Pin
              </Button>
              <Button icon={ShareMinor} size="medium" onClick={toggleActive}>
                Share
              </Button>
            </ButtonGroup>
            <Button
              icon={SaveMinor}
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
        </Card.Section>
        <Card.Section
          title={
            urlIds?.length === 0
              ? "Titles"
              : lnameFromUrl === ""
              ? "Anonymous List"
              : lnameFromUrl
          }
        >
          {usersFromUrl?.length > 0 ? (
            <TextStyle variation="subdued">
              By {usersFromUrl?.join(", ")}
            </TextStyle>
          ) : (
            <TextStyle variation="subdued">
              <span role="img" aria-label="cross">
                ❎
              </span>{" "}
              Remove nominations if you change your mind about a choice.
            </TextStyle>
          )}

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
                {urlIds?.length > 0 ? (
                  <></>
                ) : (
                  <Button
                    outline
                    onClick={() => removeNomination(title.imdbID)}
                    size="slim"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </ResourceItem>
          ))}
        </Card.Section>
        {toastMarkup}
        {pinToastMarkup}
      </Card>
    </Frame>
  );
};

export default NominationList;
