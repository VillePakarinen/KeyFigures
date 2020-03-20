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
                      <div>
                        This should be visible
                        <div>This should be visible</div>
                        <div>This should be visible</div>
                        <div>This should be visible</div>
                      </div>
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
