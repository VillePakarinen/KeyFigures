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
  labelColumn: {
    width: "60%"
  },
  valueColumn: {
    width: "25%"
  },
  buttonColumn: {
    width: "5%"
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
              <TableCell className={classes.labelColumn}>Avainluku, tiedot vuodelta </TableCell>
              <TableCell className={classes.valueColumn}>{primaryMunicipality?.name}</TableCell>
              <TableCell className={classes.valueColumn}>{secondaryMunicipality?.name}</TableCell>
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
                    values={[
                      keyFigure.label,
                      keyFigure.value.toString(),
                      secondaryKeyFigures?.[index]?.value.toString()
                    ]}
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
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(KeyFigureTable);
