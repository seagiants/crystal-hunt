import * as React from "react";

const style = {
  flexGrow: 1,
  flexShrink: 2
};

const CurrentPhase = ({ currentPhase }: { currentPhase: string }) => {
  return <div style={style}>{currentPhase}</div>;
};

export default CurrentPhase;
