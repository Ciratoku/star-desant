import { useState } from "react";

function useSelect(defaultValue = "USD") {
  const [value, setValue] = useState(defaultValue);
  return { value, onChange: (e) => setValue(e.target.value) };
}

export default useSelect;
