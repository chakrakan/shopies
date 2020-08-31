import React from "react";
import {
  Card,
  Stack,
  DisplayText,
  TextContainer,
  Icon,
  Button,
  Layout,
} from "@shopify/polaris";
import Title from "./Title";
import { ITitleData } from "../types/Title";
import { PlayCircleMajorMonotone } from "@shopify/polaris-icons";

interface INominations {
  nominations: Array<ITitleData>;
}

const NominationList = ({ nominations }: INominations) => {
  return !nominations?.length ? (
    <></>
  ) : (
    <Card sectioned>
      <TextContainer>
        <DisplayText>
          <Icon source={PlayCircleMajorMonotone} />
          Your Nominations
        </DisplayText>
        <Stack vertical={true}>
          {nominations.map((title: ITitleData) => (
            <Layout sectioned={true}>
              <Layout.Section>
                <Title
                  Title={title.Title}
                  Year={title.Year}
                  Poster={title.Poster}
                  Type={title.Type}
                  imdbID={title.imdbID}
                ></Title>
                <Button size="slim">Remove</Button>
              </Layout.Section>
            </Layout>
          ))}
        </Stack>
      </TextContainer>
    </Card>
  );
};

export default NominationList;
