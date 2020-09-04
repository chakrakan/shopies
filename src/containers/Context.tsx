import React, { useState, useCallback, useRef, useEffect } from "react";
import { Layout } from "@shopify/polaris";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import NominationList from "../components/NominationList";
import { SEARCH_TITLE, GET_TITLE } from "../gql/Queries";
import { useLazyQuery, useApolloClient } from "@apollo/client";
import { ITitleData, ITitleGetVar, ITitleIdData } from "../types/Title";
import qs from "querystring";

/**
 * This will hold the context for the child Componenets
 */
const Context: React.FC = () => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<Array<string>>([]);
  const [shareableLink, setShareableLink] = useState("");
  const [listTitle, setListTitle] = useState("");
  const [nominations, setNominations] = useState<Array<ITitleData>>(
    (JSON.parse(localStorage.getItem("nominations") || "[]") as Array<
      ITitleData
    >) || []
  );
  const [refetch, { called, loading, data: searchData }] = useLazyQuery(
    SEARCH_TITLE
  );
  const client = useApolloClient();
  const searchTimeout = useRef<number | null>(null);
  const idsFromUrl = qs
    .parse(window.location.search)
    ["?imdbID"]?.toString()
    .split(",");

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
        refetch({ variables: { title: newTitle.trim() } });
      }, 800);
    },
    [setTitle, refetch]
  );

  /**
   * Get existing IDs from a shared link from a previous instance.
   * Check if querystring (delimited by ? and split by =) has 5 ids.
   * If so, make the GET_TITLE call for each one and populate nominations list
   */
  const getExistingIds = useCallback(
    (idArray: Array<string>) => {
      Promise.all(
        idArray.map(async idx => {
          const titleData: ITitleData = await client
            .query<ITitleIdData, ITitleGetVar>({
              query: GET_TITLE,
              variables: { id: idx },
            })
            .then(resp => {
              return resp.data?.title;
            })
            .catch(err => err);

          return titleData;
        })
      ).then(titleDatas => {
        setNominations(titleDatas);
      });
    },
    [client]
  );

  useEffect(() => {
    // updateURL(nominations);
    // initialize localstorage with empty nominations field
    // if a URL with ids is passed and the app wasn't used before (0 prior nominations)
    if (idsFromUrl?.length > 0) {
      getExistingIds(idsFromUrl); // make API calls for each id and setNominations to array from the ids
    }
  }, [nominations, idsFromUrl, getExistingIds, setNominations]);

  return (
    <Layout>
      <Layout.Section>
        <SearchBox
          title={title}
          nominations={nominations}
          onChange={onSearchChange}
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
        {nominations.length === 0 ? (
          <></>
        ) : (
          <NominationList
            nominations={nominations}
            setNominations={setNominations}
            urlIds={idsFromUrl}
          ></NominationList>
        )}
      </Layout.Section>
    </Layout>
  );
};

export default Context;
