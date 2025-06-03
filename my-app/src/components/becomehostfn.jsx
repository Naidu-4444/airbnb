"use client";

import useCountries from "@/hooks/useCountries";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import Countryselect from "./country-select";
import { Input } from "./ui/input";
import Counterinput from "./counter-input";

const steps = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGE: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const Becomehostfn = () => {
  const [step, setStep] = useState(steps.IMAGE);

  const setCustomValue = (title, value) => {
    setValue(title, value);
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      roomCount: 1,
      location: null,
      children: 1,
      guestCount: 1,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const children = watch("children");
  const guestCount = watch("guestCount");
  console.log(location);
  let sourceAtStep = (
    <div>
      <h1>Which of these categories does define your property?</h1>
      <p>Pick a category</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories.map((each) => {
          return (
            <div
              className={cn(
                "p-3 rounded-md flex flex-col border-2 border-gray-300/20 cursor-pointer",
                category == each.label ? "bg-red-400 text-white" : "bg-gray-100"
              )}
              onClick={() => setCustomValue("category", each.label)}
            >
              <each.icon />
              {each.label}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === steps.LOCATION) {
    sourceAtStep = (
      <div className="flex flex-col gap-2">
        <h1>Where is your property located?</h1>
        <Countryselect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  } else if (step === steps.INFO) {
    sourceAtStep = (
      <div className="mt-16 ml-11">
        <div className="flex flex-col gap-10">
          <div className="flex gap-8 items-center">
            <h1>How many rooms do you want?</h1>
            <Counterinput
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
          </div>
          <div className="flex gap-5 items-center">
            <h1>How many children do you have?</h1>
            <Counterinput
              value={children}
              onChange={(value) => setCustomValue("children", value)}
            />
          </div>
          <div className="flex gap-11 items-center">
            <h1>How many guests are joining?</h1>
            <Counterinput
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
          </div>
        </div>
      </div>
    );
  } else if (step === steps.IMAGE) {
    sourceAtStep = (
      <div className="mt-16 ml-11">
        <div className="flex flex-col gap-10">
          <div className="flex gap-8 items-center">
            <h1>Upload a picture of your property</h1>
            <Input
              value={imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>{sourceAtStep}</div>;
};
export default Becomehostfn;
