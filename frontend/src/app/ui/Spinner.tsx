import clsx from "clsx";
import React from "react";

function Spinner({ customClass }: { customClass?: string }) {
  return <div className={clsx("lds-dual-ring", customClass)}></div>;
}

export default Spinner;
