"use client";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/Hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { categoriesObjs } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

// multiple steps form
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  // form controls
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  // iniate useform hook
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      gestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // binding the custom inputs to the useform hook
  const category = watch("category");
  const location = watch("location");

  // to import our map component
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  // to change the default values in useform
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // customizing label according to the step we at
  const actionLabel = useMemo(() => {
    // if we at the last step the label needs to say create
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // if we are on the first we dont need a back button
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categoriesObjs.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    // second step in the form

    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setCustomValue("location", value);
          }}
        />
        <Map center={location?.lating} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} // if we are on the first step dont allow the user to go back
      body={bodyContent}
    />
  );
};

export default RentModal;
