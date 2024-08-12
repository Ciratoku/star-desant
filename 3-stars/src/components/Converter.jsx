import { Stack, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useSelect from "../hooks/useSelect";
import Selector from "./Selector";

function Converter() {
  const url = "https://open.er-api.com/v6/latest";
  const [currencies, setCurrencies] = useState([]);
  const [isCurLoaded, setCurLoaded] = useState(false);
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");
  const selectFrom = useSelect("USD");
  const selectTo = useSelect("RUB");
  useEffect(() => {
    fetch(`${url}/USD`)
      .then((r) => r.json())
      .then((r) => {
        setCurrencies(Object.keys(r.rates).map((key) => key));
        setCurLoaded(true);
      });
  }, []);
  const handleConvert = () => {
    fetch(`${url}/${selectFrom.value}`)
      .then((r) => r.json())
      .then((r) => {
        const rates = r.rates;
        const toValue = inputFrom * rates[selectTo.value];
        if (Number.isNaN(toValue) || toValue < 0) {
          setInputFrom("");
          return alert("input value must be a number and gte zero");
        }
        setInputTo(toValue);
      });
  };
  return isCurLoaded ? (
    <Stack
      direction="row"
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <Selector
        label="from"
        currencies={currencies}
        select={selectFrom}
        input={{
          value: inputFrom,
          onChange: (e) => setInputFrom(e.target.value),
        }}
      />
      <Selector
        label="to"
        currencies={currencies}
        select={selectTo}
        input={{ value: inputTo, onChange: (e) => setInputTo(e.target.value) }}
      />
      <Button variant="outlined" onClick={handleConvert}>
        Convert
      </Button>
    </Stack>
  ) : (
    <CircularProgress />
  );
}

export default Converter;
