import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Grid } from "@material-ui/core";

import Wrapper from "../wrapper/Wrapper";
import { PopulationDataset } from "../../model/populationDto";

interface Props {
  primaryPopulation?: PopulationDataset;
  secondaryPopulation?: PopulationDataset;
}

const Population: React.FC<Props> = ({ primaryPopulation, secondaryPopulation }) => {
  const data = primaryPopulation?.populationData.map((pdata, index) => {
    let secondaryData;

    if (secondaryPopulation) {
      secondaryData = {
        [secondaryPopulation.zoneName]: secondaryPopulation.populationData[index].population,
      };
    }
    return {
      year: pdata.year,
      [primaryPopulation.zoneName]: pdata.population,
      ...secondaryData,
    };
  });

  return (
    <Wrapper backgroundcolor="rgb(255, 212, 120);">
      <h1>Population</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {primaryPopulation && (
            <div
              style={{
                margin: "16px",
                borderRadius: "24px",
                backgroundColor: "#fff",
                minHeight: "48px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                {primaryPopulation?.zoneName}
              </span>
              <span style={{ fontSize: "18px" }}>
                {
                  primaryPopulation.populationData[primaryPopulation.populationData.length - 1]
                    .population
                }
              </span>
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          {secondaryPopulation && (
            <div
              style={{
                margin: "16px",
                borderRadius: "24px",
                backgroundColor: "#fff",
                minHeight: "48px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                {secondaryPopulation?.zoneName}
              </span>
              <span style={{ fontSize: "18px" }}>
                {
                  secondaryPopulation?.populationData[
                    secondaryPopulation?.populationData.length - 1
                  ].population
                }
              </span>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" minHeight="300px" minWidth="300px">
            <LineChart data={data}>
              <XAxis dataKey="year" minTickGap={10} />
              <YAxis />
              <Legend />
              <Tooltip />
              {primaryPopulation && (
                <Line
                  type="monotone"
                  strokeWidth="3"
                  dataKey={primaryPopulation.zoneName}
                  stroke="#8884d8"
                  dot={false}
                />
              )}

              {secondaryPopulation && (
                <Line
                  type="monotone"
                  strokeWidth="3"
                  dataKey={secondaryPopulation.zoneName}
                  dot={false}
                  stroke="#000"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Population);
