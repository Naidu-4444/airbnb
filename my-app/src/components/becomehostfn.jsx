"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Countryselect from "./country-select";
import Counterinput from "./counter-input";
import Imageupload from "./imageupload";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      roomCount: 1,
      location: null,
      children: 1,
      guestCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      price: "",
    },
  });

  const setCustomValue = (title, value) => {
    setValue(title, value);
  };

  const gonext = (data) => {
    if (step === steps.PRICE) {
      axios.post("/api/listing", data).then(() => {
        toast({
          title: "Success",
          description: "Property created",
        });
        router.push("/properties");
        router.refresh();
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const children = watch("children");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc");

  const isstepvalid = useMemo(() => {
    switch (step) {
      case steps.CATEGORY:
        return !!category;
      case steps.LOCATION:
        return !!location;
      case steps.INFO:
        return roomCount > 0 && !!children && guestCount > 0;
      case steps.IMAGE:
        return !!imageSrc;
      case steps.DESCRIPTION:
        return watch("title") && watch("description");
      case steps.PRICE:
        return !!watch("price") && parseFloat(watch("price")) > 0;
      default:
        return true;
    }
  }, [
    step,
    category,
    location,
    roomCount,
    children,
    guestCount,
    imageSrc,
    watch(),
  ]);
  let sourceAtStep = (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-600">
        Which of these categories does define your property?
      </h1>
      <p>Pick a category</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories.map((each) => (
          <div
            key={each.label}
            className={cn(
              "p-3 rounded-md flex flex-col border-2 border-gray-300/20 cursor-pointer",
              category === each.label ? "bg-red-400 text-white" : "bg-gray-100"
            )}
            onClick={() => setCustomValue("category", each.label)}
          >
            <each.icon />
            {each.label}
          </div>
        ))}
      </div>
    </div>
  );

  if (step === steps.LOCATION) {
    sourceAtStep = (
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-600">
          {" "}
          Where is your property located?
        </h1>
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
          {[
            {
              label: "How many rooms do you have?",
              value: roomCount,
              key: "roomCount",
            },
            {
              label: "How many children do you allow to join?",
              value: children,
              key: "children",
            },
            {
              label: "How many guests are allowed to join?",
              value: guestCount,
              key: "guestCount",
            },
          ].map(({ label, value, key }) => (
            <div
              className="flex items-center justify-between w-[800px]"
              key={key}
            >
              <h1 className="text-xl md:text-2xl font-semibold text-gray-600 w-[500px]">
                {label}
              </h1>
              <div className="flex-shrink-0">
                <Counterinput
                  value={value}
                  onChange={(val) => setCustomValue(key, val)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (step === steps.IMAGE) {
    sourceAtStep = (
      <div className="mt-16 ml-11">
        <div className="flex flex-col gap-10">
          <div className="flex gap-8 items-center">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-600">
              Upload a picture of your property
            </h1>
            <Imageupload
              value={imageSrc}
              returnUrl={(url) => setCustomValue("imageSrc", url)}
            />
          </div>
        </div>
      </div>
    );
  } else if (step === steps.DESCRIPTION) {
    sourceAtStep = (
      <div className="mt-16 ml-11">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 items-center flex-col">
            <h1 className="text-2xl">Describe your property</h1>
            <Input placeholder="Title" {...register("title")} />
            <Textarea placeholder="Description" {...register("description")} />
          </div>
        </div>
      </div>
    );
  } else if (step === steps.PRICE) {
    sourceAtStep = (
      <div className="mt-16 ml-11">
        <div className="flex flex-col gap-10">
          <div className="flex gap-5 items-center">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-600">
              Price of your property per night
            </h1>
            <Input
              placeholder="1000/-"
              {...register("price")}
              className="w-32"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="p-4 md:p-8">{sourceAtStep}</div>
      <div className="flex flex-col gap-4">
        <div className="w-full flex justify-between fixed bottom-6 px-10">
          <button
            onClick={goBack}
            className="p-4 rounded-full bg-red-400 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={step === 0}
          >
            <ArrowLeft size={35} className="text-white" />
          </button>

          {step === steps.PRICE ? (
            <button
              onClick={handleSubmit(gonext)}
              className="bg-red-400 p-4 rounded-full text-white"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleSubmit(gonext)}
              disabled={!isstepvalid}
              className={cn(
                "p-4 rounded-full cursor-pointer",
                isstepvalid ? "bg-red-400" : "bg-gray-400 cursor-not-allowed"
              )}
            >
              <ArrowRight size={35} className="text-white" />
            </button>
          )}
        </div>

        <div
          className="progress-bar bg-red-400 h-2 fixed bottom-0 w-full"
          style={{
            width: `${((step + 1) / 6) * 100}%`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default Becomehostfn;
