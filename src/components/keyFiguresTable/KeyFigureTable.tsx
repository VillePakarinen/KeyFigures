import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Municipality } from "../header/model/municipalitiesDto";
import { KeyFigure } from "./model/keyFigureDto";

interface Props {
  primaryMunicipality?: Municipality;
  secondaryMunicipality?: Municipality;
  primaryKeyFigures: KeyFigure[];
  secondaryKeyFigures: KeyFigure[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 400
  }
});

const KeyFigureTable: React.FC<Props> = ({
  primaryMunicipality,
  secondaryMunicipality,
  primaryKeyFigures,
  secondaryKeyFigures
}) => {
  const classes = useStyles();

  return (
    <div>
      KeyFigures: for {JSON.stringify(primaryMunicipality)} and
      {JSON.stringify(secondaryMunicipality)}
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Avainluku, tiedot vuodelta </TableCell>
              <TableCell>{primaryMunicipality?.name}</TableCell>
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

export default React.memo(KeyFigureTable);
