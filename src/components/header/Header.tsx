import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Theme,
  createStyles,
  FormHelperText
} from "@material-ui/core";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      display: "flex",
      flexGrow: 1
    }
  })
);

const Header: React.FC<Props> = props => {
  const classes = useStyles();

  const [regionalZone, setRegionalZone] = useState("");

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setRegionalZone(event.target.value as string);
  };

  return (
    <section className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>
            <FormattedMessage
              id="app-name"
              defaultMessage="Kuntien avainluvut"
            />
          </h1>
          <FormControl className={classes.formControl}>
            <InputLabel id="regional-zone-label" htmlFor="regional-zone-select">
              <FormattedMessage
                id="regional-time-period"
                defaultMessage="Aluejako"
              />
            </InputLabel>
            <Select
              native
              id="regional-zone-select"
              value={regionalZone}
              onChange={handleChange}
            >
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </Select>
            <FormHelperText>
              <FormattedMessage
                id="regional-time-period-helper"
                defaultMessage="Valitse käytettävä aluejako"
              />
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="primary-zone-label" htmlFor="primary-zone-select">
              <FormattedMessage
                id="primary-region"
                defaultMessage="Ensisijainen alue"
              />
            </InputLabel>
            <Select
              native
              id="primary-zone-select"
              value={function() {}}
              onChange={function() {}}
            >
              <option value="SSS">Koko maa</option>
              <option value="010">Akaa</option>
            </Select>
            <FormHelperText>
              <FormattedMessage
                id="primary-region-helper"
                defaultMessage="Valitse ensisijainen alue"
              />
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="secondary-zone-label"
              htmlFor="secondary-zone-select"
            >
              <FormattedMessage
                id="secondary-region"
                defaultMessage="Vertailtava alue"
              />
            </InputLabel>
            <Select
              native
              id="secondary-zone-select"
              value={function() {}}
              onChange={function() {}}
            >
              <option value="SSS">Koko maa</option>
              <option value="010">Akaa</option>
            </Select>
            <FormHelperText>
              <FormattedMessage
                id="secondary-region-helper"
                defaultMessage="Valitse vertailtava alue"
              />
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </section>
  );
};

export default Header;
