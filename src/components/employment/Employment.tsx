import React from "react";
import { Grid } from "@material-ui/core";

import Wrapper from "../layoutUtils/Wrapper";
import { EmploymentRateDataset } from "../../model/employmentRateDataset";
import DisplayCard from "../layoutUtils/DisplayCard";
import { VISUALIZATION_COLORS } from "../../style/visualizationColors";
import { FormattedMessage } from "react-intl";

interface Props {
  employmentDataSets: EmploymentRateDataset[];
}

const Employment: React.FC<Props> = ({ employmentDataSets }) => {
  if (employmentDataSets.length === 0) return null;

  return (
    <Wrapper backgroundcolor="#E6F4F1">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Employment rate</h2>
        </Grid>
        {employmentDataSets.map((employmentData, index) => {
          // Loop though predefined styles and set them for each dataset item
          const style = VISUALIZATION_COLORS[index % VISUALIZATION_COLORS.length];
          return (
            <Grid key={employmentData.zoneId} item xs={6}>
              <DisplayCard elevation={3} style={{ color: style.color }}>
                <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {employmentData.zoneName}
                </span>
                <span>
                  <FormattedMessage
                    id="employment-rate-message"
                    values={{ amount: `${employmentData.getLatestData()?.employmentRate}%` }}
                  />
                </span>
              </DisplayCard>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Employment);
