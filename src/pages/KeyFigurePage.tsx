import React, { useEffect, useCallback, useReducer } from "react";
import { FormattedMessage } from "react-intl";
import { useSnackbar } from "notistack";

import { useKeyFigureService } from "../services/KeyFigureServiceProvider";
import { Municipality } from "../model/municipalitiesDto";
import FormHeader from "../components/formHeader/FormHeader";
import { keyFigureReducer } from "./KeyFigureReducer";
import Population from "../components/population/Population";
import { useQuery } from "react-query";
import { MunicipalityData } from "../model/municipalityData";
import { PopulationDataset } from "../model/populationDto";

interface Props {}

const KeyFigurePage: React.FC<Props> = (props) => {
  // Initialize state
  const [state, dispatch] = useReducer(keyFigureReducer, {
    primaryMuncipality: null,
    secondaryMuncipality: null,
  });

  // Initialize dependencies
  const keyFigureService = useKeyFigureService();
  const { enqueueSnackbar } = useSnackbar();

  const municipalityFormHander = useCallback(
    (primaryMunicipality?: Municipality, secondaryMunicipality?: Municipality) => {
      dispatch({ type: "SET_PRIMARY_MUNICIPALITY", payload: primaryMunicipality || null });
      dispatch({ type: "SET_SECONDARY_MUNICIPALITY", payload: secondaryMunicipality || null });
    },
    [keyFigureService]
  );

  // async calls
  const municipalitiesResponse = useQuery("municipalities", () =>
    keyFigureService.getMunicipalities("2020")
  );
  if (municipalitiesResponse.error) {
    enqueueSnackbar("Something went wrong with fetching municipalities");
  }

  const primaryMunicipalityResponse = useQuery(
    state.primaryMuncipality && ["primary-muncipality", state.primaryMuncipality.id],
    () => keyFigureService.getMunicipalityData(state.primaryMuncipality || undefined)
  );

  const secondaryMunicipalityResponse = useQuery(
    state.secondaryMuncipality && ["secondary-muncipality", state.secondaryMuncipality.id],
    () => keyFigureService.getMunicipalityData(state.secondaryMuncipality || undefined)
  );

  const isLoading =
    municipalitiesResponse.status === "loading" ||
    primaryMunicipalityResponse.status === "loading" ||
    secondaryMunicipalityResponse.status === "loading";

  return (
    <>
      <h1>
        <FormattedMessage id="app-name" defaultMessage="Kuntien avainluvut" />
      </h1>
      <FormHeader
        isLoading={isLoading}
        municipalities={municipalitiesResponse.data || []}
        onSubmit={municipalityFormHander}
      />

      <Population
        populationDataSets={
          [
            primaryMunicipalityResponse.data?.population,
            secondaryMunicipalityResponse.data?.population,
          ].filter((val) => val !== undefined) as PopulationDataset[]
        }
      />
    </>
  );
};

export default KeyFigurePage;
