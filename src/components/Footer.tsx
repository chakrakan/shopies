import * as React from "react";
import { FooterHelp, Link } from "@shopify/polaris";

const Footer: React.FC = () => {
  return (
    <FooterHelp>
      Learn more about{" "}
      <Link url="https://github.com/chakrakan/shopies">
        this project
      </Link>
    </FooterHelp>
  );
};

export default Footer;
