import React, { useEffect, useCallback, useReducer } from "react";
import { FormattedMessage } from "react-intl";
import { useSnackbar } from "notistack";

import { useKeyFigureService } from "../services/KeyFigureServiceProvider";
import { Municipality } from "../model/municipalitiesDto";
import FormHeader from "../components/formHeader/FormHeader";
import { keyFigureReducer } from "./KeyFigureReducer";

interface Props {}

const KeyFigurePage: React.FC<Props> = props => {
  // Initialize state
  const [state, dispatch] = useReducer(keyFigureReducer, {
    primaryMuncipality: null,
    secondaryMuncipality: null,
    municipalities: []
  });

  // Initialize dependencies
  const keyFigureService = useKeyFigureService();
  const { enqueueSnackbar } = useSnackbar();

  const municipalityFormHander = useCallback(
    (primaryMunicipality?: Municipality, secondaryMunicipality?: Municipality) => {
      if (primaryMunicipality) {
        keyFigureService
          .getMunicipalityData(primaryMunicipality)
          .then(data => dispatch({ type: "SET_PRIMARY_MUNICIPALITY_DATA", payload: data }));
      }

      if (secondaryMunicipality) {
        keyFigureService
          .getMunicipalityData(secondaryMunicipality)
          .then(data => dispatch({ type: "SET_SECONDARY_MUNICIPALITY_DATA", payload: data }));
      }
    },
    [keyFigureService]
  );

  useEffect(() => {
    keyFigureService
      .getMunicipalities("2020")
      .then(municipalities => {
        dispatch({
          type: "SET_MUNICIPALITIES",
          payload: municipalities
        });
      })
      .catch(err => enqueueSnackbar("Something went wrong with fetching municipalities"));
  }, [keyFigureService, enqueueSnackbar]);

  return (
    <>
      <h1>
        <FormattedMessage id="app-name" defaultMessage="Kuntien avainluvut" />
      </h1>
      <FormHeader municipalities={state.municipalities} onSubmit={municipalityFormHander} />
    </>
  );
};

export default KeyFigurePage;
