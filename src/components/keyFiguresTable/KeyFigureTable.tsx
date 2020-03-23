import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Municipality } from "../../model/municipalitiesDto";
import { KeyFigure } from "../../model/keyFigureDto";
import ExpandableRow from "./expandaleRow/ExpandingRow";
import GrafContainer from "./grafContainer/GrafContainer";

interface Props {
  primaryMunicipality?: Municipality;
  secondaryMunicipality?: Municipality;
  primaryKeyFigures: KeyFigure[];
  secondaryKeyFigures: KeyFigure[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 400
  },
  container: {
    maxHeight: "70vh"
  },
  valueColumn: {
    width: "15%"
  },
  buttonColumn: {
    width: "15%"
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
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="Kuntien avainlukujen taulukko">
          <TableHead>
            <TableRow>
              <TableCell>Avainluku, tiedot vuodelta </TableCell>
              <TableCell align="right" className={classes.valueColumn}>
                {primaryMunicipality?.name}
              </TableCell>
              <TableCell align="right" className={classes.valueColumn}>
                {secondaryMunicipality?.name}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {primaryKeyFigures &&
              primaryKeyFigures.map((keyFigure, index) => {
                return (
                  <ExpandableRow
                    key={keyFigure.id}
                    expandable={true}
                    render={
                      <GrafContainer
                        url={`https://vertinet2.stat.fi/verti/graph/viewpage.aspx?ifile=quicktables/kuntien_avainluvut_2020/avainluku_${
                          keyFigure.id
                        }&isext=true&lang=3&rind=${primaryMunicipality?.pxIndex},${
                          secondaryMunicipality !== undefined ? secondaryMunicipality.pxIndex : ""
                        }`}
                        width="100%"
                        height="400px"
                      />
                    }
                  >
                    <TableCell>{keyFigure.label}</TableCell>
                    <TableCell align="right">{keyFigure.value}</TableCell>
                    <TableCell align="right">{secondaryKeyFigures?.[index]?.value}</TableCell>
                  </ExpandableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(KeyFigureTable);
