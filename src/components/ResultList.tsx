import React from "react";
import {
  Card,
  Layout,
  Button,
  Banner,
  TextStyle,
  Spinner,
} from "@shopify/polaris";
import Title from "./Title";
import { ITitleData, ITitleSearchData } from "../types/Title";

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
    <Card title="Search Results" sectioned>
      {nominations.length === 5 ? (
        <Banner status="success">
          <p>You have nominated 5 movies!</p>
        </Banner>
      ) : (
        <></>
      )}

      <Card.Section>
        {isLoading && isCalled ? (
          <Spinner
            accessibilityLabel="Loading search results"
            size="large"
            color="teal"
          ></Spinner>
        ) : (
          <TextStyle variation="subdued">{currentTitle}</TextStyle>
        )}
      </Card.Section>
      <Card.Section title="Titles">
        {searchData.map((title: ITitleData) => (
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
            </Layout.Section>
          </Layout>
        ))}
      </Card.Section>
    </Card>
  );
};

export default ResultList;
