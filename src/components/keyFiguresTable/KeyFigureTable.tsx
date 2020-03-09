import React from "react";
import { Municipality } from "../header/model/municipalitiesDto";

interface Props {
  primaryMunicipality?: Municipality;
  secondaryMunicipality?: Municipality;
}

const KeyFigureTable: React.FC<Props> = ({
  primaryMunicipality,
  secondaryMunicipality
}) => {
  return (
    <div>
      KeyFigures: for {JSON.stringify(primaryMunicipality)} and{" "}
      {JSON.stringify(secondaryMunicipality)}
    </div>
  );
};

export default KeyFigureTable;
