import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles, FormHelperText } from "@material-ui/core";

import { RegionalZone } from "../../model/regionalZone";
import { Municipality } from "../../model/municipalitiesDto";

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

const FormHeader: React.FC<Props> = ({
  regionalZones,
  municipalities,
  zoneChangeHandler,
  primaryMuncipalityHandler,
  secondaryMuncipalityHandler,
  selectedZone,
  selectedPrimaryMuncipality,
  selectedSecondaryMuncipality
}) => {
  const classes = useStyles();
  console.log("rendered");

  // Side effect for selecting default values for the form
  useEffect(() => {
    if (municipalities.length > 0) {
      if (!selectedPrimaryMuncipality) {
        primaryMuncipalityHandler(municipalities[0].id);
      } else {
        const selected = municipalities.find(mun => mun.id === selectedPrimaryMuncipality.id);
        selected
          ? primaryMuncipalityHandler(selected.id)
          : primaryMuncipalityHandler(municipalities[0].id);
      }

      if (selectedSecondaryMuncipality) {
        const selected = municipalities.find(mun => mun.id === selectedSecondaryMuncipality.id);
        selected ? secondaryMuncipalityHandler(selected.id) : secondaryMuncipalityHandler("");
      }
    }
  }, [
    municipalities,
    primaryMuncipalityHandler,
    secondaryMuncipalityHandler,
    selectedPrimaryMuncipality,
    selectedSecondaryMuncipality
  ]);

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
                value={selectedZone?.id}
                onChange={event => zoneChangeHandler(event.target.value as string)}
              >
                {regionalZones.map(zone => {
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
                value={selectedPrimaryMuncipality?.id}
                onChange={event => primaryMuncipalityHandler(event.target.value as string)}
                displayEmpty={true}
              >
                {municipalities.map(municipality => {
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
                value={selectedSecondaryMuncipality?.id}
                onChange={event => secondaryMuncipalityHandler(event.target.value as string)}
                displayEmpty={true}
              >
                <option value=""></option> {/** Default empty value */}
                {municipalities.map(municipality => {
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

export default React.memo(FormHeader);
