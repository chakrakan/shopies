import React, { useState } from "react";
import { Layout } from "@shopify/polaris";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import NominationList from "../components/NominationList";
import { SEARCH_TITLE } from "../gql/Queries";
import { useLazyQuery } from "@apollo/client";
import { ITitleData } from "../types/Title";

/**
 * This will hold the context for the child Componenets
 */
const Context = () => {
  const [title, setTitle] = useState("");
  const [nominations, setNominations] = useState<Array<ITitleData>>([]);
  const [refetch, { called, loading, data: searchData }] = useLazyQuery(
    SEARCH_TITLE
  );

  console.log(title, called, loading, searchData?.titles.Search);

  return (
    <Layout>
      <Layout.Section>
        <SearchBox
          title={title}
          setTitle={setTitle}
          refetch={refetch}
        ></SearchBox>
      </Layout.Section>
      <Layout.Section oneHalf>
        <ResultList
          currentTitle={title}
          isCalled={called}
          isLoading={loading}
          titles={searchData}
          nominations={nominations}
          setNominations={setNominations}
        ></ResultList>
      </Layout.Section>
      <Layout.Section oneHalf>
        <NominationList
          nominations={nominations}
          setNominations={setNominations}
        ></NominationList>
      </Layout.Section>
    </Layout>
  );
};

export default Context;
