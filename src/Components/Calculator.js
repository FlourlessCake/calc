import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import {
  TextField,
  Button,
  Radio,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import * as yup from "yup";
import data from "../depcalc.json";

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      style={{ marginBottom: 10 }}
    />
  );
};

const helper = (name, value) => {
  const { deposits } = data;
  const depo = deposits.find((d) => d.code === name);
  const nearestBelow = (input, lookup) =>
    lookup.reduce((prev, curr) => (input >= curr ? curr : prev));
  const maxCurr = nearestBelow(
    value,
    depo.param.map((d) => d.period_from)
  );
  const investPeriod = depo.param.find((d) => d.period_from === maxCurr);
  const clientRate = nearestBelow(value, investPeriod.summs_and_rate);
  return { investPeriod, clientRate };
};

const validationSchema = yup.object({
  name: yup.string().required(),
  term: yup.number().when("name", (name, schema, { value }) => {
    const { investPeriod } = helper(name, value);
    return schema.required().min(investPeriod.period_from);
  }),
  amount: yup.number().when("name", (name, schema, { value }) => {
    const { clientRate } = helper(name, value);
    return schema.required().min(clientRate.summ_from);
  }),
});

const Calculator = () => {
  const [dData, setData] = useState({
    name: "",
    term: "",
    amount: "",
  });

  const handleRate = (dData) => {
    if (dData.name === "" || dData.amount === "") {
      return;
    }
    const { clientRate } = helper(dData.name, dData.amount);
    return clientRate.rate;
  };
  const rate = handleRate(dData);

  const calculateDivs = (dData) => {
    if (dData.term === "" || dData.amount === "") {
      return;
    }
    const dividends = ((dData.amount * rate) / 36500) * dData.term;
    return <p>{Math.round(dividends)} rub</p>;
  };

  return (
    <Container maxWidth="md">
      <Formik
        validateOnChange={true}
        initialValues={{
          name: "",
          term: "",
          amount: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            setData({ ...data })
            setSubmitting(false);
          }, 2000)
          
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>Rates:</div>
            <MyRadio
              name="name"
              type="radio"
              value="unic"
              label="Универсальный"
            />
            <MyRadio
              name="name"
              type="radio"
              value="standart"
              label="Стандартный"
            />
            <MyRadio
              name="name"
              type="radio"
              value="replenish"
              label="Пополняемый"
            />
            <div>
              {values.name && (
                <MyTextField placeholder="Сумма вклада" name="amount" />
              )}
            </div>
            <div>
              <div>
                {values.name && values.amount && (
                  <MyTextField placeholder="Срок вклада" name="term" />
                )}
              </div>
              <Button
                disabled={isSubmitting || !values.name}
                color="secondary"
                variant="contained"
                type="submit"
              >
                submit
              </Button>
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
      {rate && (
        <div style={{display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: "bold"}}>
            <div>Deposit Rate: {rate}%</div>
            <div>Your adds: {calculateDivs(dData)}</div>
        </div>
      )}
    </Container>
  );
};

export default Calculator;
