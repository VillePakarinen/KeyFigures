import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton, makeStyles } from "@material-ui/core";
import transitions from "@material-ui/core/styles/transitions";

interface Props {
  values: string[];
  expandable: boolean;
  render: any;
}

const useStyles = makeStyles({
  dropdown: {
    transition: transitions.create(["transform"], {
      duration: transitions.duration.short
    })
  },
  dropdownOpen: {
    transform: "rotate(180deg)"
  },
  dropdownClosed: {
    transform: "rotate(0)"
  }
});

const ExpandableRow: React.FC<Props> = ({ values, expandable, render }) => {
  const [isOpen, setOpen] = useState(false);

  const classes = useStyles();

  const expandableIcon = expandable ? (
    <TableCell>
      <IconButton aria-label="Expand panel" onClick={() => setOpen(!isOpen)}>
        <ExpandMoreIcon
          className={[
            classes.dropdown,
            isOpen ? classes.dropdownOpen : classes.dropdownClosed
          ].join(" ")}
        />
      </IconButton>
    </TableCell>
  ) : null;

  const expandableContent = expandable ? (
    <TableRow aria-hidden={!isOpen}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={values.length + 1}>
        <Collapse in={isOpen} unmountOnExit timeout="auto">
          {render}
        </Collapse>
      </TableCell>
    </TableRow>
  ) : null;

  return (
    <>
      <TableRow>
        {values.map((value, index) => (
          <TableCell key={index}>{value}</TableCell>
        ))}
        {expandableIcon}
      </TableRow>
      {expandableContent}
    </>
  );
};

export default ExpandableRow;
