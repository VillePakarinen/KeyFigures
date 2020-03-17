import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useKeyFigureService } from "../services/KeyFigureServiceProvider";
import FormHeader from "../components/header/FormHeader";
import { RegionalZone } from "../components/header/model/regionalZone";
import { Municipality } from "../components/header/model/municipalitiesDto";
import { KeyFigure } from "../components/keyFiguresTable/model/keyFigureDto";
import KeyFigureTable from "../components/keyFiguresTable/KeyFigureTable";

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

  const [primaryKeyFigures, setPrimaryKeyFigures] = useState<KeyFigure[]>([]);
  const [secondaryKeyFigures, setSecondaryKeyFigures] = useState<KeyFigure[]>([]);

  // Initialize http-state
  const [regionalZoneLoading, setRegionalZonesLoading] = useState<boolean>(false);
  const [municipalitiesLoading, setMunicipalitiesLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [primaryKeyFiguresLoading, setPrimaryKeyFiguresLoading] = useState<boolean>(false);
  const [secondaryKeyFiguresLoading, setSecondaryKeyFiguresLoading] = useState<boolean>(false);
  const [keyfigureErrorMessage, setKeyFigureErrorMessage] = useState<string>();

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

  // Side effects
  useEffect(() => {
    // Get regional zones for the application
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
      // Get municipalities for selected regional zone
      setMunicipalitiesLoading(true);
      keyFigureService
        .getMunicipalities(selectedRegionalZone.id)
        .then(municipalities => {
          setMunicipalities(municipalities);
        })
        .catch(error => {
          console.error(error);
          setErrorMessage("Failed fetching municipalities from network");
        })
        .finally(() => setMunicipalitiesLoading(false));
    }
  }, [selectedRegionalZone, keyFigureService]);

  useEffect(() => {
    if (selectedPrimaryMunicipality) {
      setPrimaryKeyFiguresLoading(true);
      keyFigureService
        .getMuncipalityKeyFigures(selectedPrimaryMunicipality)
        .then(keyFigures => {
          setPrimaryKeyFigures(keyFigures);
        })
        .catch(error => {
          console.error(error);
          setKeyFigureErrorMessage("Fetching keyfigures failed");
        })
        .finally(() => setPrimaryKeyFiguresLoading(false));
    }
  }, [keyFigureService, selectedPrimaryMunicipality]);

  useEffect(() => {
    if (selectedSecondaryMunicipality) {
      setSecondaryKeyFiguresLoading(true);
      keyFigureService
        .getMuncipalityKeyFigures(selectedSecondaryMunicipality)
        .then(keyFigures => {
          setSecondaryKeyFigures(keyFigures);
        })
        .catch(error => {
          console.error(error);
          setKeyFigureErrorMessage("Fetching keyfigures failed");
        })
        .finally(() => setSecondaryKeyFiguresLoading(false));
    } else {
      // Clear values from list
      setSecondaryKeyFigures([]);
    }
  }, [keyFigureService, selectedSecondaryMunicipality]);

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
      <section style={{ minHeight: 10 }}>
        {municipalitiesLoading ||
        regionalZoneLoading ||
        primaryKeyFiguresLoading ||
        secondaryKeyFiguresLoading ? (
          <LinearProgress aria-label="Please wait" />
        ) : null}
      </section>

      <KeyFigureTable
        primaryMunicipality={selectedPrimaryMunicipality}
        secondaryMunicipality={selectedSecondaryMunicipality}
        primaryKeyFigures={primaryKeyFigures}
        secondaryKeyFigures={secondaryKeyFigures}
      />
    </>
  );
};

export default KeyFigurePage;
