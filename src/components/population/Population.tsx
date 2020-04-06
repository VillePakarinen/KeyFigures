import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Grid } from "@material-ui/core";

import Wrapper from "../wrapper/Wrapper";
import { PopulationDataset } from "../../model/populationDto";

interface Props {
  populationDataSets: PopulationDataset[];
}

const Population: React.FC<Props> = ({ populationDataSets }) => {
  if (!populationDataSets.length) return null;

  return (
    <Wrapper backgroundcolor="rgb(255, 212, 120);">
      <h1>Population</h1>
      <Grid container spacing={2}>
        {populationDataSets.map((dataset) => {
          return (
            <Grid key={dataset.zoneId} item xs={6}>
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
                <span style={{ fontSize: "24px", fontWeight: "bold" }}>{dataset.zoneName}</span>
                <span style={{ fontSize: "18px" }}>
                  {dataset.populationData[dataset.populationData.length - 1].population}
                </span>
              </div>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" minHeight="300px" minWidth="300px">
            <LineChart>
              <YAxis />
              <XAxis
                minTickGap={10}
                dataKey="year"
                xAxisId="year"
                allowDuplicatedCategory={false}
              />
              >
              <Legend />
              <Tooltip />
              {populationDataSets.map((dataset) => {
                return (
                  <Line
                    key={dataset.zoneId}
                    type="monotone"
                    strokeWidth="3"
                    stroke="#8884d8"
                    dot={false}
                    data={dataset.populationData}
                    name={dataset.zoneName}
                    dataKey="population"
                    xAxisId="year"
                  />
                );
              })}
              )}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Population);
