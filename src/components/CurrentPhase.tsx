import * as React from "react";

const style = {
  width: "10%"
};

const CurrentPhase = ({ currentPhase }: { currentPhase: string }) => {
  return <div style={style}>{currentPhase}</div>;
};

export default CurrentPhase;
