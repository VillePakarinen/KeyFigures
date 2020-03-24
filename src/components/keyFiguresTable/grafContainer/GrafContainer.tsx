import React, { useState, useEffect } from "react";
import { LinearProgress, Fade } from "@material-ui/core";

interface Props {
  url: string;
  height: string;
  width: string;
  title: string;
}

const GrafContainer: React.FC<Props> = props => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, [props.url]);

  return (
    <>
      {loading && <LinearProgress />}
      <Fade in={!loading}>
        <iframe
          title={props.title}
          src={props.url}
          style={{ border: "none", height: props.height, width: props.width }}
          onLoad={() => setLoading(false)}
        ></iframe>
      </Fade>
    </>
  );
};

export default React.memo(GrafContainer);
