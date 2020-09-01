import React from "react";
import { Card, TextField, Icon, TextFieldProps } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";

interface ISearchBox {
  title: string;
  onChange: TextFieldProps['onChange'];
}
/**
 * Search box representation
 */
const SearchBox = ({ title, onChange = () => { } }: ISearchBox) => {
  return (
    <Card sectioned>
      <TextField
        prefix={<Icon source={SearchMajorMonotone} color="inkLighter" />}
        label="Movie Title"
        type="search"
        placeholder="Search Title..."
        value={title}
        onChange={onChange}
      />
    </Card>
  );
};

export default SearchBox;
