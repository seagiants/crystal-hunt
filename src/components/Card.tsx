import * as React from "react";

export const CardsBoard = (props: object) => {
  return (
    <div>
      <svg height="210" width="210">
        <rect
          width="150"
          height="200"
          style={{ fill: "blue" }}
          stroke="black"
          rx="20"
          ry="20"
        />
        </svg>
        <svg height="210" width="210">
        <rect
          width="150"
          height="200"
          style={{ fill: "blue" }}
          stroke="black"
          rx="20"
          ry="20"
        />
        </svg>
        <svg height="210" width="210">
        <rect
          width="150"
          height="200"
          style={{ fill: "blue" }}
          stroke="black"
          rx="20"
          ry="20"
        />
      </svg>
    </div>
  );
};
