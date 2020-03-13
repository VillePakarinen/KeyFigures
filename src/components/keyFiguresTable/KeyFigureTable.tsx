import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";

import { Municipality } from "../header/model/municipalitiesDto";
import { KeyFigure, KeyFiguresDto } from "./model/keyFigureDto";
import { Paper } from "@material-ui/core";
import Axios from "axios";

interface Props {
  primaryMunicipality: Municipality;
  secondaryMunicipality?: Municipality | null;
}

function createPxQuery(code: string, id: string) {
  return {
    query: [
      {
        code,
        selection: {
          filter: "item",
          values: [id]
        }
      }
    ],
    response: { format: "json-stat" }
  };
}

const KeyFigureTable: React.FC<Props> = ({
  primaryMunicipality,
  secondaryMunicipality
}) => {
  const [primaryKeyFigures, setPrimaryKeyFigures] = useState<KeyFigure[]>([]);
  const [secondaryKeyFigures, setSecondaryKeyFigures] = useState<KeyFigure[]>(
    []
  );

  const [keyFiguresResponse] = useAxios<KeyFiguresDto>({
    method: "POST",
    url: `https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/${primaryMunicipality.getYear()}/kuntien_avainluvut_${primaryMunicipality.getYear()}_viimeisin.px`,
    data: createPxQuery(primaryMunicipality.code, primaryMunicipality.id)
  });

  useEffect(() => {
    if (keyFiguresResponse.data) {
      const keyFigures = Object.entries(
        keyFiguresResponse.data.dataset.dimension.Tiedot.category.label
      ).map(
        ([key, valueText], index): KeyFigure => {
          return new KeyFigure(
            key,
            keyFiguresResponse.data.dataset.dimension.Tiedot.category.index[
              key
            ],
            valueText,
            keyFiguresResponse.data.dataset.value[index]
          );
        }
      );
      setPrimaryKeyFigures(keyFigures);
    }
  }, [keyFiguresResponse]);

  useEffect(() => {
    const triggerSecondaryKeyfigureSearch = async () => {
      if (secondaryMunicipality) {
        const response = await Axios.post<KeyFiguresDto>(
          `https://pxnet2.stat.fi/PXWeb/api/v1/fi/Kuntien_avainluvut/${secondaryMunicipality.getYear()}/kuntien_avainluvut_${secondaryMunicipality.getYear()}_viimeisin.px`,
          createPxQuery(secondaryMunicipality.code, secondaryMunicipality.id)
        );
        console.log(response);
        const keyFigures = Object.entries(
          response.data.dataset.dimension.Tiedot.category.label
        ).map(
          ([key, valueText], index): KeyFigure => {
            return new KeyFigure(
              key,
              response.data.dataset.dimension.Tiedot.category.index[key],
              valueText,
              response.data.dataset.value[index]
            );
          }
        );
        setSecondaryKeyFigures(keyFigures);
      } else {
        // remove selected value
        setSecondaryKeyFigures([]);
      }
    };

    triggerSecondaryKeyfigureSearch();
  }, [secondaryMunicipality]);

  return (
    <div>
      KeyFigures: for {JSON.stringify(primaryMunicipality)} and
      {JSON.stringify(secondaryMunicipality)}
      {primaryKeyFigures &&
        primaryKeyFigures.map((keyFigure, index) => {
          return (
            <Paper elevation={3} key={index}>
              <h3>{keyFigure.label}</h3>
              <p>{keyFigure.value}</p>
              {secondaryKeyFigures[index] && (
                <p>{secondaryKeyFigures[index].value}</p>
              )}
            </Paper>
          );
        })}
    </div>
  );
};

export default KeyFigureTable;
