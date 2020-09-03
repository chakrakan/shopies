import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
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
  const [nominations, setNominations] = useState<Array<ITitleData>>([]);
  const [refetch, { called, loading, data: searchData }] = useLazyQuery(
    SEARCH_TITLE
  );
  const client = useApolloClient();
  const idsFromUrl = qs
    .parse(window.location.search)
    ["?imdbID"]?.toString()
    .split(",");

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
        refetch({ variables: { title: newTitle.trim() } });
      }, 800);
    },
    [setTitle, refetch]
  );

  /**
   * This function updates the URL everytime nominations are added/removed.
   * @param nominations the nominations array from the Context component state
   */
  const updateURL = useCallback((nominations: Array<ITitleData>) => {
    const basePath =
      window.location.protocol + "//" + window.location.host + "/";

    if (nominations?.length !== 0) {
      let queryString = qs.stringify({
        imdbID: nominations?.map((title) => title.imdbID).join(","),
      });
      let updatedURL = basePath + "?" + queryString;
      window.history.replaceState({ path: updatedURL }, "", updatedURL);
    } else {
      window.history.replaceState({ path: basePath }, "", basePath);
    }
  }, []);

  /**
   * Get existing IDs from a shared link from a previous instance.
   * We know that one can only share a link if they picked 5 total nominations as per requirements
   * Therefore, check if querystring (delimited by ? and split by =) has 5 ids.
   * If so, make the GET_TITLE call for each one and populate nominations list
   */
  const getExistingIds = useCallback(
    (idArray: Array<string>) => {
      if (idArray?.length === 5 && nominations?.length === 0) {
        let updatedNominations: Array<ITitleData> = [];
        idArray.forEach(async (idx) => {
          const titleData: ITitleData = await client
            .query<ITitleIdData, ITitleGetVar>({
              query: GET_TITLE,
              variables: { id: idx },
            })
            .then((resp) => {
              return resp.data?.title;
            })
            .catch((err) => err);

          updatedNominations.push(titleData);
        });
        setNominations(updatedNominations);
      }
    },
    [client, nominations]
  );

  useEffect(() => {
    updateURL(nominations);
  }, [nominations, updateURL]);

  useLayoutEffect(() => {
    // if a URL with 5 ids is passed and the app wasn't used before (0 prior nominations)
    if (idsFromUrl?.length === 5 && nominations?.length === 0) {
      getExistingIds(idsFromUrl); // make API calls for each id and setNominations to array from the ids
    }
    console.log(nominations);

    // TODO: if you provide 5 id's in the URL, it switches back to base URL
    // TODO: Render the child components based on the state after reading in the 5 IDs
  }, [getExistingIds, setNominations, idsFromUrl, nominations]);

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
          ></NominationList>
        )}
      </Layout.Section>
    </Layout>
  );
};

export default Context;
