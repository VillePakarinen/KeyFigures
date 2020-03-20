import React, { useState } from "react";
import { LinearProgress } from "@material-ui/core";

interface Props {
  url: string;
  height: string;
  width: string;
}

const GrafContainer: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LinearProgress />}
      <iframe
        src={props.url}
        style={{ border: "none", height: props.height, width: props.width }}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      ></iframe>
    </>
  );
};

export default GrafContainer;
