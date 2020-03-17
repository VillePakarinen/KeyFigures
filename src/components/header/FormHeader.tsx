import React from "react";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles, FormHelperText } from "@material-ui/core";

import { RegionalZone } from "./model/regionalZone";
import { Municipality } from "./model/municipalitiesDto";

interface Props {
  regionalZones: RegionalZone[];
  municipalities: Municipality[];
  zoneChangeHandler: (value: string) => void;
  primaryMuncipalityHandler: (value: string) => void;
  secondaryMuncipalityHandler: (value: string) => void;
  selectedZone?: RegionalZone;
  selectedPrimaryMuncipality?: Municipality;
  selectedSecondaryMuncipality?: Municipality;
}

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

const FormHeader: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="regional-zone-label" htmlFor="regional-zone-select" shrink>
                <FormattedMessage id="regional-time-period" defaultMessage="Aluejako" />
              </InputLabel>
              <Select
                native
                id="regional-zone-select"
                value={props.selectedZone?.id}
                onChange={event => props.zoneChangeHandler(event.target.value as string)}
              >
                {props.regionalZones.map(zone => {
                  return (
                    <option key={zone.id} value={zone.id}>
                      {zone.text}
                    </option>
                  );
                })}
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
              <InputLabel id="primary-zone-label" htmlFor="primary-zone-select" shrink>
                <FormattedMessage id="primary-region" defaultMessage="Ensisijainen alue" />
              </InputLabel>
              <Select
                native
                id="primary-zone-select"
                value={props.selectedPrimaryMuncipality?.id}
                onChange={event => props.primaryMuncipalityHandler(event.target.value as string)}
                displayEmpty={true}
              >
                {props.municipalities.map(municipality => {
                  return (
                    <option key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </option>
                  );
                })}
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
              <InputLabel id="secondary-zone-label" htmlFor="secondary-zone-select" shrink>
                <FormattedMessage id="secondary-region" defaultMessage="Vertailtava alue" />
              </InputLabel>
              <Select
                native
                id="secondary-zone-select"
                value={props.selectedSecondaryMuncipality?.id}
                onChange={event => props.secondaryMuncipalityHandler(event.target.value as string)}
                displayEmpty={true}
              >
                <option value=""></option> {/** Default empty value */}
                {props.municipalities.map(municipality => {
                  return (
                    <option key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </option>
                  );
                })}
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
      </form>
    </section>
  );
};

export default FormHeader;
