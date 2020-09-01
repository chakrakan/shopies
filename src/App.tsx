import * as React from "react";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import "./App.css";
import Footer from "./components/Footer";
import Context from "./containers/Context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

class App extends React.Component {
  // https://www.apollographql.com/docs/react/api/link/apollo-link-rest/#gatsby-focus-wrapper
  restLink = new RestLink({
    uri: process.env.REACT_APP_BASE_API,
    responseTransformer: async (response) =>
      response.json().then((data: JSON) => data),
  });
  client = new ApolloClient({
    link: this.restLink,
    cache: new InMemoryCache(),
  });
  render() {
    return (
      <ApolloProvider client={this.client}>
        <Page title="The Shopies">
          <Context></Context>
          <Footer></Footer>
        </Page>
      </ApolloProvider>
    );
  }
}

export default App;
