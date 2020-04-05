import React from "react";

import styled from "styled-components";
import { Grid } from "@material-ui/core";

interface Props {
  backgroundcolor?: string;
  height?: string;
  children: any;
}

const StyledWrapper = styled(Grid)<Props>`
  height: ${props => (props.height ? props.height : "initial")};
  display: flex;
  justify-content: center;
  padding: 32px 16px;
  background: ${props => (props.backgroundcolor ? props.backgroundcolor : "transparent")};
`;

const Wrapper = (props: Props) => {
  console.log(props);
  return (
    <StyledWrapper {...props}>
      <Grid item xs={12} sm={8} md={6}>
        {props.children}
      </Grid>
    </StyledWrapper>
  );
};

export default Wrapper;
