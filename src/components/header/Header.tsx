import React from "react";
import { FormattedMessage } from "react-intl";

interface Props {}

const Header: React.FC<Props> = props => {
  return (
    <div>
      <h1>
        <FormattedMessage id="app-name" defaultMessage="Kuntien avainluvut" />
      </h1>
    </div>
  );
};

export default Header;
