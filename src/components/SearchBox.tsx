import React, { useCallback, useState } from "react";
import { Card, TextField, Icon } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";

/**
 * Search box representation
 */
const SearchBox = () => {
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <Card sectioned>
      <TextField
        prefix={<Icon source={SearchMajorMonotone} color="inkLighter" />}
        label="Movie Title"
        value={value}
        onChange={handleChange}
      />
    </Card>
  );
};

export default SearchBox;
