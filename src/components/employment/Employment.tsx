import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
} from "recharts";
import { Grid } from "@material-ui/core";

import Wrapper from "../wrapper/Wrapper";
import { EmploymentRateDataset } from "../../model/employmentRateDataset";

interface Props {
  employmentDataSets: EmploymentRateDataset[];
}

const Employment: React.FC<Props> = ({ employmentDataSets }) => {
  if (employmentDataSets.length === 0) return null;

  return (
    <Wrapper backgroundcolor="rgb(255, 240, 185)">
      <h2>Employment rate</h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" minHeight="300px" minWidth="300px">
            <BarChart
              data={employmentDataSets}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="employmentRate" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Employment);
