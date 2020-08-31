import * as React from "react";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import "./App.css";
import Footer from "./components/Footer";
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";

class App extends React.Component {
  render() {
    return (
      <Page title="The Shopies">
        <SearchBox></SearchBox>
        <ResultList></ResultList>
        <Footer></Footer>
      </Page>
    );
  }
}

export default App;
