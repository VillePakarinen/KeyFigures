import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineType,
} from "recharts";
import { Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import Wrapper from "../wrapper/Wrapper";
import { PopulationDataset } from "../../model/populationDataset";

interface Props {
  populationDataSets: PopulationDataset[];
}

interface LineStyles {
  color: string | number | undefined;
  type?: LineType;
}

const lineStyles: LineStyles[] = [
  {
    color: "#0073b0",
    type: "monotone",
  },
  {
    color: "#000000",
    type: "monotone",
  },
  {
    color: "#8884d8",
    type: "monotone",
  },
];

const Population: React.FC<Props> = ({ populationDataSets }) => {
  if (!populationDataSets.length) return null;

  const lines = populationDataSets.map((dataset, index) => {
    // Loop though predefined styles and set them for each dataset item
    const style = lineStyles[index % lineStyles.length];
    return (
      <Line
        key={dataset.zoneId}
        type={style.type}
        strokeWidth="3"
        stroke={style.color}
        dot={false}
        data={dataset.populationData}
        name={dataset.zoneName}
        dataKey="population"
        xAxisId="year"
      />
    );
  });

  return (
    <Wrapper backgroundcolor="rgb(255, 212, 120);">
      <h1>
        <FormattedMessage id="population-header" defaultMessage="Population in municipality" />
      </h1>
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
              {lines}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Population);
