import React, { useState } from "react";
import { Layout } from "@shopify/polaris";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import NominationList from "../components/NominationList";
import { SEARCH_TITLE } from "../gql/Queries";
import { useQuery } from "@apollo/client";
import { ITitleData, ITitleSearchVar, ITitleSearchData } from "../types/Title";
/**
 * This will hold the context for the child Componenets
 */
const Context = () => {
  const [title, setTitle] = useState("");
  const [nominations, setNomination] = useState<Array<ITitleData>>([]);
  const { loading, error, data } = useQuery<ITitleSearchData, ITitleSearchVar>(
    SEARCH_TITLE,
    {
      variables: { s: title },
    }
  );
  console.log(title, loading, error, data?.titles.Search);

  return (
    <Layout sectioned={true}>
      <Layout.Section>
        <SearchBox title={title} setTitle={setTitle}></SearchBox>
      </Layout.Section>
      <Layout.Section oneHalf>
        <ResultList
          currentTitle={title}
          isLoading={loading}
          titles={data}
          nominations={nominations}
          setNominations={setNomination}
        ></ResultList>
        <NominationList nominations={nominations}></NominationList>
      </Layout.Section>
    </Layout>
  );
};

export default Context;
