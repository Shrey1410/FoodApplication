import React from "react";

const Skeleton = (props) => {
  return (
    <div>
      <div className={`card w-80 shadow-sm bg-white p-4 ${props.height}`}>
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
