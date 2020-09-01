import React from "react";
import {
  Card,
  Stack,
  DisplayText,
  TextContainer,
  Icon,
  Layout,
  Button,
  Banner,
} from "@shopify/polaris";
import Title from "./Title";
import { ITitleData, ITitleSearchData } from "../types/Title";
import { RecentSearchesMajorMonotone } from "@shopify/polaris-icons";

// Result list should take arrays for the titles from response and current nomination
// state so it can display results accordingly
interface IResultList {
  currentTitle: string;
  isLoading: boolean;
  titles?: ITitleSearchData;
  nominations: Array<ITitleData>;
  setNominations: Function;
}

const ResultList = ({
  currentTitle,
  isLoading,
  titles,
  nominations,
  setNominations,
}: IResultList) => {
  const searchData = titles?.titles.Search;

  return !searchData?.length ? (
    <></>
  ) : (
    <Card sectioned>
      <TextContainer>
        {nominations.length === 5 ? (
          <Banner status="success">
            <p>You have nominated 5 movies!</p>
          </Banner>
        ) : undefined}
      </TextContainer>
      <TextContainer>
        <DisplayText>
          <Icon source={RecentSearchesMajorMonotone} />
          Results for...
        </DisplayText>
        <Stack vertical={true}>
          <Layout sectioned={true}>
            {searchData.map((title: ITitleData) => (
              <Layout.Section key={title.imdbID}>
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
            ))}
          </Layout>
        </Stack>
      </TextContainer>
    </Card>
  );
};

export default ResultList;
