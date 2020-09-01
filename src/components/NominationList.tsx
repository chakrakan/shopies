import React from "react";
import { Card, Stack, TextContainer, Button, Layout } from "@shopify/polaris";
import Title from "./Title";
import { ITitleData } from "../types/Title";

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
      <TextContainer>
        <Stack vertical={false}>
          {nominations.map((title: ITitleData) => (
            <Layout sectioned={true}>
              <Layout.Section key={title.imdbID}>
                <Title
                  Title={title.Title}
                  Year={title.Year}
                  Poster={title.Poster}
                  Type={title.Type}
                  imdbID={title.imdbID}
                ></Title>
                <Button
                  onClick={() => removeNomination(title.imdbID)}
                  size="slim"
                >
                  Remove
                </Button>
              </Layout.Section>
            </Layout>
          ))}
        </Stack>
      </TextContainer>
    </Card>
  );
};

export default NominationList;
