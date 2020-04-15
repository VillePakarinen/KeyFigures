import { Paper } from "@material-ui/core";
import styled from "styled-components";

const DisplayCard = styled(Paper)<any>`
  margin: 16px;
  border-radius: 32px;
  background-color: #fff;
  min-height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

export default DisplayCard;
