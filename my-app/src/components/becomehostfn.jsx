"use client";

import { useState } from "react";

const steps = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGE: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const Becomehostfn = () => {
  const [step, setStep] = useState(steps.CATEGORY);

  return <div></div>;
};
export default Becomehostfn;
