"use client";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import Countryselect from "./country-select";
import Calendar from "./calendar";
import Counterinput from "./counter-input";
import { useRouter } from "next/navigation";

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  DETAILS: 2,
};

const SearchModel = ({ open, setopen, modelstate }) => {
  const [step, setStep] = useState(modelstate);
  const [location, setlocation] = useState();
  const [dateRange, setdateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [guest, setguest] = useState(2);
  const [rooms, setrooms] = useState(1);
  const [children, setchildren] = useState(0);
  const router = useRouter();
  const sourcestep = {
    [STEPS.LOCATION]: (
      <div>
        <h1 className="font-semibold text-gray-600 mb-3">
          Where are you going?
        </h1>
        <Countryselect
          value={location}
          onChange={(value) => setlocation(value)}
        />
      </div>
    ),
    [STEPS.DATE]: (
      <div className="flex justify-center">
        <Calendar
          value={dateRange}
          onChange={(value) => setdateRange(value.selection)}
        />
      </div>
    ),
    [STEPS.DETAILS]: (
      <div className="flex justify-center">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-gray-600">Guests</p>
            <Counterinput value={guest} onChange={setguest} />
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-gray-600">Rooms</p>
            <Counterinput value={rooms} onChange={setrooms} />
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-semibold text-gray-600">Children</p>
            <Counterinput value={children} onChange={setchildren} />
          </div>
        </div>
      </div>
    ),
  };
  const back = () => {
    if (step == 0) return;
    setStep((previousStep) => previousStep - 1);
  };
  const next = useCallback(() => {
    if (step == 2) {
      const queryParams = {
        ...(location?.value && { locationValue: location?.value }),
        ...(guest && { guestCount: guest }),
        ...(rooms && { roomCount: rooms }),
        ...(children && { childCount: children }),
        ...(dateRange && {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
      };
      if (Object.keys(queryParams).length > 0) {
        const quesrySTring = Object.keys(queryParams)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                queryParams[key]
              )}`
          )
          .join("&");
        const url = `/?${quesrySTring}`;
        router.push(url);
        setopen(false);
      }
      return;
    }
    setStep((previousStep) => previousStep + 1);
  }, [step, location, dateRange, guest, rooms, children]);
  return (
    <>
      {open ? (
        <div className="fixed top-0 left-0 w-full h-screen">
          <div className="w-full relative h-screen bg-black/40">
            <div className="modal__content p-5 bg-white w-full md:w-3/5 min-h-[300px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
              {sourcestep[step]}
              <X
                className="float-right cursor-pointer absolute top-4 right-3"
                onClick={() => setopen(false)}
              />
              <div className="flex justify-between pt-4">
                <Button
                  disabled={step == 0}
                  className={step == 0 && "bg-gray-500"}
                  onClick={back}
                >
                  Back
                </Button>
                <Button
                  onClick={next}
                  className={step == 2 && "bg-red-400 hover:bg-red-300 "}
                >
                  {step == 2 ? "Search" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default SearchModel;
