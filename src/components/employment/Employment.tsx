import React from "react";
import { Grid, Avatar } from "@material-ui/core";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import { FormattedMessage } from "react-intl";

import Wrapper from "../layoutUtils/Wrapper";
import { EmploymentRateDataset } from "../../model/employmentRateDataset";
import DisplayCard from "../layoutUtils/DisplayCard";
import { VISUALIZATION_COLORS } from "../../style/visualizationColors";
import { JobCountDataset } from "../../model/jobCountDataset";

interface Props {
  employmentDataSets: EmploymentRateDataset[];
  jobCountDataSets: JobCountDataset[];
}

const Employment: React.FC<Props> = ({ employmentDataSets, jobCountDataSets }) => {
  if (employmentDataSets.length === 0) return null;

  return (
    <Wrapper backgroundcolor="#E6F4F1">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>
            <FormattedMessage id="employment-heander" defaultMessage="Employment information" />
          </h2>
        </Grid>
        {employmentDataSets.map((employmentData, index) => {
          // Loop though predefined styles and set them for each dataset item
          const style = VISUALIZATION_COLORS[index % VISUALIZATION_COLORS.length];

          // Get number of jobs for the city
          const jobCount = jobCountDataSets
            .find((jData) => jData.zoneId === employmentData.zoneId)
            ?.getLatestData();

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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "12px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#fff",
                  }}
                >
                  <WorkOutlineIcon color="primary" />
                </Avatar>
                <div style={{ margin: "0px 12px" }}>
                  <p>
                    <FormattedMessage
                      id="employment-job-count"
                      defaultMessage={`Amount of jobs: ${jobCount?.jobCount}`}
                      values={{ jobCount: jobCount?.jobCount }}
                    />
                  </p>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default React.memo(Employment);
