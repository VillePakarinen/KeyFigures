import React, { useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useKeyFigureService } from "../services/KeyFigureServiceProvider";
import FormHeader from "../components/header/FormHeader";
import { RegionalZone } from "../components/header/model/regionalZone";
import { Municipality } from "../components/header/model/municipalitiesDto";

interface Props {}

const KeyFigurePage: React.FC<Props> = props => {
  // Initialize state
  const [regionalZones, setRegionalZones] = useState<RegionalZone[]>([]);
  const [selectedRegionalZone, setSelectedRegionalZone] = useState<RegionalZone>();

  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [selectedPrimaryMunicipality, setSelectedPrimaryMunicipality] = useState<Municipality>();
  const [selectedSecondaryMunicipality, setSelectedSecondaryMunicipality] = useState<
    Municipality
  >();

  // Initialize http-state
  const [regionalZoneLoading, setRegionalZonesLoading] = useState<boolean>(false);
  const [municipalitiesLoaiding, setMunicipalitiesLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  // Initialize dependencies
  const keyFigureService = useKeyFigureService();

  // Initialize form change handlers

  const zoneChangeHandler = (zoneId: string) => {
    setSelectedRegionalZone(regionalZones.find(zone => zone.id === zoneId));
  };

  const primaryMuncipalityHandler = (muncipalityId: string) => {
    setSelectedPrimaryMunicipality(
      municipalities.find(municipality => municipality.id === muncipalityId)
    );
  };

  const secondaryMuncipalityHandler = (muncipalityId: string) => {
    setSelectedSecondaryMunicipality(
      municipalities.find(municipality => municipality.id === muncipalityId)
    );
  };

  // Components effects
  useEffect(() => {
    setRegionalZonesLoading(true);
    keyFigureService
      .getRegionalZones()
      .then(zones => {
        setRegionalZones(zones);

        // Preselect default regional zone if it hasn't been set
        if (!selectedRegionalZone && zones.length > 0) {
          setSelectedRegionalZone(zones[0]);
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("Failed fetching regional zones");
      })
      .finally(() => setRegionalZonesLoading(false));
  }, [keyFigureService]);

  useEffect(() => {
    if (selectedRegionalZone) {
      setMunicipalitiesLoading(true);
      keyFigureService
        .getMunicipalities(selectedRegionalZone.id)
        .then(municipalities => {
          setMunicipalities(municipalities);
          if (!selectedPrimaryMunicipality && municipalities.length > 0) {
            setSelectedPrimaryMunicipality(municipalities[0]);
          }
        })
        .catch(error => {
          console.error(error);
          setErrorMessage("Failed fetching municipalities from network");
        })
        .finally(() => setMunicipalitiesLoading(false));
    }
  }, [selectedRegionalZone, keyFigureService]);

  return (
    <>
      <h1>
        <FormattedMessage id="app-name" defaultMessage="Kuntien avainluvut" />
      </h1>
      <FormHeader
        regionalZones={regionalZones}
        municipalities={municipalities}
        zoneChangeHandler={zoneChangeHandler}
        primaryMuncipalityHandler={primaryMuncipalityHandler}
        secondaryMuncipalityHandler={secondaryMuncipalityHandler}
        selectedZone={selectedRegionalZone}
        selectedPrimaryMuncipality={selectedPrimaryMunicipality}
        selectedSecondaryMuncipality={selectedSecondaryMunicipality}
      />
    </>
  );
};

export default KeyFigurePage;
