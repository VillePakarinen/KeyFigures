import React from "react";
import Wrapper from "../wrapper/Wrapper";
import { Grid } from "@material-ui/core";

import { PopulationDataset } from "../../model/populationDto";

interface Props {
  primaryPopulation: PopulationDataset;
  secondaryPopulation?: PopulationDataset;
}

const Population: React.FC<Props> = ({ primaryPopulation, secondaryPopulation }) => {
  return (
    <Wrapper height="70vh" backgroundcolor="rgb(255, 212, 120);">
      <h1>Population</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>{primaryPopulation?.zoneName}</h2>
          <p>
            {
              primaryPopulation.populationData[primaryPopulation.populationData.length - 1]
                .population
            }
          </p>
        </Grid>
        <Grid item xs={6}>
          <h2>{secondaryPopulation?.zoneName}</h2>
          <p>
            {
              secondaryPopulation?.populationData[secondaryPopulation?.populationData.length - 1]
                .population
            }
          </p>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Population;
