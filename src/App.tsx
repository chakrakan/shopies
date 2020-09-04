import * as React from "react";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import Footer from "./components/Footer";
import Context from "./containers/Context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const App = () => {
  // https://www.apollographql.com/docs/react/api/link/apollo-link-rest/#gatsby-focus-wrapper
  const restLink = new RestLink({
    uri: process.env.REACT_APP_BASE_API,
    responseTransformer: async (response) =>
      response.json().then((data: JSON) => data),
  });
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Page title="The Shopies" separator>
        <Context></Context>
        <Footer></Footer>
      </Page>
    </ApolloProvider>
  );
};

export default App;
