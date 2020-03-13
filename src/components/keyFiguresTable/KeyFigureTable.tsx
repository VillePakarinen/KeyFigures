import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

import { Municipality } from "../header/model/municipalitiesDto";
import { KeyFigure, KeyFiguresDto } from "./model/keyFigureDto";

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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const KeyFigureTable: React.FC<Props> = ({
  primaryMunicipality,
  secondaryMunicipality
}) => {
  const classes = useStyles();

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avainluku, tiedot vuodelta </TableCell>
              <TableCell>{primaryMunicipality.name}</TableCell>
              <TableCell>{secondaryMunicipality?.name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {primaryKeyFigures &&
              primaryKeyFigures.map((keyFigure, index) => {
                return (
                  <TableRow key={keyFigure.id}>
                    <TableCell>{keyFigure.label}</TableCell>
                    <TableCell>{keyFigure.value}</TableCell>
                    <TableCell>{secondaryKeyFigures?.[index]?.value}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default KeyFigureTable;
