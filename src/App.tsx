import * as React from "react";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import "./App.css";
import Footer from "./components/Footer";
import Context from "./components/Context";

class App extends React.Component {
  render() {
    return (
      <Page title="The Shopies">
        <Context></Context>
        <Footer></Footer>
      </Page>
    );
  }
}

export default App;
