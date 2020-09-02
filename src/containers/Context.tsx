import React, { useState, useCallback, useRef } from "react";
import { Layout } from "@shopify/polaris";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import NominationList from "../components/NominationList";
import { SEARCH_TITLE } from "../gql/Queries";
import { useLazyQuery } from "@apollo/client";
import { ITitleData } from "../types/Title";
import { debounce } from 'lodash';
/**
 * This will hold the context for the child Componenets
 */
const Context = () => {
  const [title, setTitle] = useState("");
  const [nominations, setNominations] = useState<Array<ITitleData>>([]);
  const [refetch, { called, loading, data: searchData }] = useLazyQuery(
    SEARCH_TITLE
  );

  const debouncedSearch = useRef<Function | null>(null);
  const onSearchChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
    debouncedSearch.current?.cancel?.();
    debouncedSearch.current = debounce(() => {
      refetch({ variables: { title: newTitle } });
    }, 1500);
    debouncedSearch.current();
  }, [setTitle, refetch]);

  return (
    <Layout>
      <Layout.Section>
        <SearchBox
          title={title}
          onChange={onSearchChange}
        />
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
