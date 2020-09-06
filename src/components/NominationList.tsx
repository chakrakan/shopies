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

  const toggleActive = useCallback(() => {
    setActive(active => !active);
  }, []);

  /**
   * Copies the created URL from window.location.href to be shared
   */
  const saveLink = useCallback(() => {
    const basePath =
      window.location.protocol + "//" + window.location.host + "/";

    let usersQueryValue: Array<string> = [...users];
    if (user !== "" && users[users?.length - 1] !== user) {
      usersQueryValue = [...users, user];
    }

    let queryString = qs.stringify({
      imdbID: nominations?.map(title => title.imdbID).join(","),
      users: usersQueryValue.join(","),
      listname: listName,
    });

    let updatedURL = basePath + "?" + queryString;
    console.log(updatedURL);
    navigator.clipboard.writeText(updatedURL);
    toggleActive();
  }, [nominations, listName, users, toggleActive, user]);

  const togglePinActive = useCallback(() => {
    setPinActive(active => !active);
  }, []);

  const pinNominations = useCallback(() => {
    // if user manually tries to add more movies to the URL, don't pin
    let usersQueryValue: Array<string> = [...users];
    if (user !== "" && users[users?.length - 1] !== user) {
      usersQueryValue = [...users, user];
    }

    if (nominations.length <= 5) {
      localStorage.setItem("nominations", JSON.stringify(nominations));
      localStorage.setItem("users", JSON.stringify(usersQueryValue));
      localStorage.setItem("listName", listName);
    }
    togglePinActive();
  }, [nominations, users, listName, togglePinActive, user]);

  /**
   *  Tost from Polaris
   */
  const [active, setActive] = useState(false);
  const [pinActive, setPinActive] = useState(false);
  const [detailsSubmitActive, setDetailsSubmitActive] = useState(false);

  const pinToastMarkup = pinActive ? (
    <Toast
      content={
        nominations?.length <= 5
          ? "Nominations Pinned!"
          : "👀 Manuel override detected!"
      }
      onDismiss={togglePinActive}
    />
  ) : null;

  const toastMarkup = active ? (
    <Toast content="Link Copied!" onDismiss={toggleActive} />
  ) : null;

  const toggleDetailsActive = useCallback(() => {
    setDetailsSubmitActive(active => !active);
  }, []);

  const detailsMarkup = detailsSubmitActive ? (
    <Toast content="Details Added!" onDismiss={toggleDetailsActive} />
  ) : null;

  const handleUserChange = useCallback(
    value => {
      setUserName(value);
    },
    [setUserName]
  );

  const handleListTitleChange = useCallback(value => setListName(value), [
    setListName,
  ]);

  return nominations.length < 1 ? (
    <></>
  ) : (
    <Frame>
      <Card title="Nominations" sectioned>
        {nominations.length === 5 ? (
          <Banner status="success">
            <p>You have finalized 5 nominations!</p>
          </Banner>
        ) : (
          <></>
        )}

        {urlIds?.length >= 5 ? (
          <></>
        ) : (
          <Card.Section>
            <Stack vertical>
              <div style={{ color: "#5c6ac4" }}>
                <Button
                  onClick={handleCollapsibleToggle}
                  monochrome
                  outline
                  fullWidth
                >
                  Edit Details
                </Button>
              </div>
              <Collapsible
                open={collapsibleActive}
                id="basic-collapsible"
                transition={{ duration: "150ms", timingFunction: "ease" }}
              >
                <TextField
                  value={listName}
                  onChange={handleListTitleChange}
                  label="List Name"
                  type="text"
                />

                <TextField
                  value={user}
                  onChange={handleUserChange}
                  label="Your Name"
                  type="text"
                />
              </Collapsible>
            </Stack>
          </Card.Section>
        )}

        <Card.Section title="Info">
          <TextContainer spacing="loose">
            <ul>
              <li>
                Click <strong>Share</strong> to receive a link that provides a
                quick overview of the nominations to someone on the browser.
              </li>
              {urlIds?.length >= 5 ? (
                <></>
              ) : (
                <li>Feel free to add details to personalize the list.</li>
              )}
              <li>
                Alternatively, you can choose to <strong>Download</strong> the
                nominations data in JSON format.
              </li>
            </ul>
          </TextContainer>
        </Card.Section>

        <Card.Section>
          <ButtonGroup fullWidth>
            <ButtonGroup segmented>
              <Button
                icon={PinMajorMonotone}
                size="medium"
                onClick={pinNominations}
              >
                Pin
              </Button>
              <Button icon={ShareMinor} size="medium" onClick={saveLink}>
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
        <Card.Section title={listName}>
          {users?.length > 0 ? (
            <TextStyle variation="subdued">{users?.join(", ")}</TextStyle>
          ) : (
            <TextStyle variation="subdued">{user}</TextStyle>
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
                <Badge size="small" status="warning">
                  {title.Type}
                </Badge>
              </div>
              <br></br>
              <div>
                {urlIds?.length >= 5 ? (
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
        {detailsMarkup}
      </Card>
    </Frame>
  );
};

export default NominationList;
