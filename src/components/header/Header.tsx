import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Theme,
  createStyles,
  FormHelperText,
  LinearProgress
} from "@material-ui/core";
import useAxios from "axios-hooks";

import { RegionalZoneDto } from "./model/regionalZoneDto";
import { MunicipalitiesDto, Municipality } from "./model/municipalitiesDto";
import KeyFigureTable from "../keyFiguresTable/KeyFigureTable";

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
  const [
    selectedRegionalZone,
    setRegionalZone
  ] = useState<RegionalZoneDto | null>();

  const [selectedPrimaryMunicipality, setPrimaryMunicipality] = useState<
    Municipality | undefined
  >(undefined);
  const [selectedSecondaryMunicipality, setSecondaryMunicipality] = useState<
    Municipality | undefined
  >(undefined);

  const [regionalResponse] = useAxios<RegionalZoneDto[]>({
    method: "GET",
    url: "https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/"
  });

  const [municipalityResponse, getMunicipalities] = useAxios<Municipality[]>(
    {
      method: "GET",
      transformResponse: (body: string) => {
        const response = JSON.parse(body) as MunicipalitiesDto;
        const municipalities = response.variables[0];

        if (municipalities.values.length !== municipalities.valueTexts.length) {
          throw new Error("bad respone from the server.");
        }

        return municipalities.values.map((id, index) => {
          return new Municipality(id, municipalities.valueTexts[index]);
        });
      }
    },
    { manual: true }
  );

  useEffect(() => {
    if (regionalResponse.data) {
      const sortedByYear = regionalResponse.data.sort((a, b) => {
        return +b.id - +a.id;
      });
      setRegionalZone(sortedByYear[0]);
    }
  }, [regionalResponse]);

  useEffect(() => {
    if (selectedRegionalZone) {
      const triggerFetch = async () => {
        const result = await getMunicipalities({
          url: `https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/${selectedRegionalZone.id}/kuntien_avainluvut_${selectedRegionalZone.id}_viimeisin.px`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        // Set preselected value for dropdown
        setPrimaryMunicipality(result.data[0]);
      };

      triggerFetch();
    }
  }, [selectedRegionalZone, getMunicipalities]);

  const handleChangeZoneChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const selectedZone = regionalResponse?.data?.find(
      zone => zone.id === (event.target.value as string)
    );
    setRegionalZone(selectedZone);
  };

  const handlePrimaryMunicipalityChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    console.log("called " + event.target.value);
    const selectedMunicipality = municipalityResponse?.data?.find(
      municipality => municipality.id === (event.target.value as string)
    );
    setPrimaryMunicipality(selectedMunicipality);
  };

  const handleSecondaryMunicipalityChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    console.log("called " + event.target.value);
    const selectedMunicipality = municipalityResponse?.data?.find(
      municipality => municipality.id === (event.target.value as string)
    );
    setSecondaryMunicipality(selectedMunicipality);
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
            <InputLabel
              id="regional-zone-label"
              htmlFor="regional-zone-select"
              shrink
            >
              <FormattedMessage
                id="regional-time-period"
                defaultMessage="Aluejako"
              />
            </InputLabel>
            <Select
              native
              id="regional-zone-select"
              value={selectedRegionalZone?.id}
              onChange={handleChangeZoneChange}
              disabled={regionalResponse.loading ? true : false}
            >
              {regionalResponse.data?.map((zone, index) => {
                return (
                  <option key={index} value={zone.id}>
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
            <InputLabel
              id="primary-zone-label"
              htmlFor="primary-zone-select"
              shrink
            >
              <FormattedMessage
                id="primary-region"
                defaultMessage="Ensisijainen alue"
              />
            </InputLabel>
            <Select
              native
              id="primary-zone-select"
              value={selectedPrimaryMunicipality}
              onChange={handlePrimaryMunicipalityChange}
              disabled={
                regionalResponse.loading || municipalityResponse.loading
                  ? true
                  : false
              }
            >
              {municipalityResponse.data?.map((municipality, index) => {
                return (
                  <option key={index} value={municipality.id}>
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
            <InputLabel
              id="secondary-zone-label"
              htmlFor="secondary-zone-select"
              shrink
            >
              <FormattedMessage
                id="secondary-region"
                defaultMessage="Vertailtava alue"
              />
            </InputLabel>
            <Select
              native
              id="secondary-zone-select"
              value={selectedSecondaryMunicipality}
              onChange={handleSecondaryMunicipalityChange}
              disabled={
                regionalResponse.loading || municipalityResponse.loading
                  ? true
                  : false
              }
            >
              <option value={undefined}></option>
              {municipalityResponse.data?.map((municipality, index) => {
                return (
                  <option key={index} value={municipality.id}>
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
      {municipalityResponse.loading || regionalResponse.loading ? (
        <LinearProgress />
      ) : null}

      <h2>Avainluvut</h2>
      <KeyFigureTable
        primaryMunicipality={selectedPrimaryMunicipality}
        secondaryMunicipality={selectedSecondaryMunicipality}
      />
    </section>
  );
};

export default Header;
