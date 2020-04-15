import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import Wrapper from "../layoutUtils/Wrapper";
import { PopulationDataset } from "../../model/populationDataset";
import { VISUALIZATION_COLORS } from "../../style/visualizationColors";
import DisplayCard from "../layoutUtils/DisplayCard";

interface Props {
  populationDataSets: PopulationDataset[];
}

const Population: React.FC<Props> = ({ populationDataSets }) => {
  if (!populationDataSets.length) return null;

  const lines = populationDataSets.map((dataset, index) => {
    // Loop though predefined styles and set them for each dataset item
    const style = VISUALIZATION_COLORS[index % VISUALIZATION_COLORS.length];
    return (
      <Line
        key={dataset.zoneId}
        type="monotone"
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
    <Wrapper backgroundcolor="#C7D1FF">
      <h2>
        <FormattedMessage id="population-header" defaultMessage="Population in municipality" />
      </h2>
      <Grid container spacing={2}>
        {populationDataSets.map((dataset, index) => {
          const style = VISUALIZATION_COLORS[index % VISUALIZATION_COLORS.length];

          return (
            <Grid key={dataset.zoneId} item xs={6}>
              <DisplayCard elevation={3} style={{ color: style.color }}>
                <span style={{ fontSize: "24px", fontWeight: "bold" }}>{dataset.zoneName}</span>
                <span style={{ fontSize: "18px" }}>
                  {dataset.populationData[dataset.populationData.length - 1].population}
                </span>
              </DisplayCard>
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
