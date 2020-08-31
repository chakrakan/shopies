import React from "react";
import {
  Card,
  Stack,
  DisplayText,
  TextContainer,
  Icon,
  Layout,
  Button,
} from "@shopify/polaris";
import Title from "./Title";
import { ITitleData } from "../types/Title";
import { RecentSearchesMajorMonotone } from "@shopify/polaris-icons";

// Result list should take arrays for the titles from response and current nomination
// state so it can display results accordingly
interface IResultList {
  titles: Array<ITitleData>;
  nominations: Array<ITitleData>;
}

const ResultList = ({ titles, nominations }: IResultList) => {
  return !titles?.length ? (
    <></>
  ) : (
    <Card sectioned>
      <TextContainer>
        <DisplayText>
          <Icon source={RecentSearchesMajorMonotone} />
          Results for...
        </DisplayText>
        <Stack vertical={true}>
          {titles.map((title: ITitleData) => (
            <Layout sectioned={true}>
              <Layout.Section>
                <Title
                  Title={title.Title}
                  Year={title.Year}
                  Poster={title.Poster}
                  Type={title.Type}
                  imdbID={title.imdbID}
                ></Title>
                <Button
                  size="slim"
                  disabled={
                    nominations.find(
                      (nominated) => nominated.imdbID === title.imdbID
                    ) !== undefined
                  }
                >
                  Nominate
                </Button>
              </Layout.Section>
            </Layout>
          ))}
        </Stack>
      </TextContainer>
    </Card>
  );
};

export default ResultList;
