import React, { useState, useCallback, useRef } from "react";
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
const Context: React.FC = () => {
  const [title, setTitle] = useState("");
  const [nominations, setNominations] = useState<Array<ITitleData>>([]);
  const [refetch, { called, loading, data: searchData }] = useLazyQuery(
    SEARCH_TITLE
  );
  const searchTimeout = useRef<number | null>(null);

  /**
   *  https://github.com/lodash/lodash/blob/master/debounce.js
   *  lodash debounce uses setTimeout under the hood. Can get rid of the lodash dep
   *  by implementing manual setTimeout to fire API call every 800ms when input has changed.
   */
  const onSearchChange = useCallback(
    (newTitle: string) => {
      if (searchTimeout.current !== null) clearTimeout(searchTimeout.current);
      setTitle(newTitle);
      searchTimeout.current = window.setTimeout(() => {
        refetch({ variables: { title: newTitle } });
      }, 800);
    },
    [setTitle, refetch]
  );

  return (
    <Layout>
      <Layout.Section>
        <SearchBox title={title} onChange={onSearchChange}></SearchBox>
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
