import React, { useContext, type ChangeEvent, useEffect } from "react";
import { ArrayBarsIcon, RandomizeIcon } from "./Icons";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ArrowDownIcon, SortingIcon } from "./Icons";
import { useArray } from "../lib/useArray";
import { useAlgorithm } from "../lib/useAlgorithm";
import { useStatus } from "../lib/useStatus";
import { Algorithm, UIStatus, type AlgorithmType } from "../lib/AppContext";
import { INITIAL_LEN, MAX_ARRAY_LEN, MIN_ARRAY_LEN } from "../lib/shared";

export function Settings() {
  const {array, newArray, setSize} = useArray();
  const [status, setStatus] = useStatus();
  const [algorithm, setAlgorithm] = useAlgorithm();

  const arraySizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value));
  const sortButtonClickHandler = (e: React.MouseEvent) => setStatus(UIStatus.SORTING);

  const shouldDisableSettings = status === UIStatus.SORTING;

  return (
    <div id="settings" className="relative z-20">
      <div className="h-20 bg-stone-900">
        <div className="flex items-center h-full px-4 md:px-6 gap-4 justify-center">
          {/* Randomizer Button (new array) */}
          <Button disabled={shouldDisableSettings} onClick={newArray}>
            <div className="flex gap-2">
              <span className="order-2">Randomize Array</span>
              <RandomizeIcon />
            </div>
          </Button>

          {/* Input Range (array size) */}
          <div>
            <InputRange
              disabled={shouldDisableSettings}
              value={array.length}
              onChange={arraySizeChangeHandler}
            >
              <div className="flex gap-1">
                <ArrayBarsIcon />
                <span>Array Size: {array.length}</span>
              </div>
            </InputRange>
          </div>

          {/* Algorithm Options */}
          <AlgorithmListOptions
            disabled={shouldDisableSettings}
            onChange={setAlgorithm}
            selectedOption={algorithm}
          />

          {/* Button (Begin Sorting - Stop) */}
          <Button disabled={shouldDisableSettings} onClick={sortButtonClickHandler}>
            Sort
          </Button>
        </div>
      </div>
    </div>
  );
}

type InputRangeProps = {
  value?: number;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputRange({ value = INITIAL_LEN, children, ...props }: InputRangeProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{children}</label>
      <input type="range" min={MIN_ARRAY_LEN} max={MAX_ARRAY_LEN} value={value} className="w-full accent-stone-500" {...props} />
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-stone-700 px-4 py-2 rounded-md hover:bg-stone-600 select-none
    focus:ring-2 focus:ring-stone-500 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}

type AlgorithmListOptionsProps = {
  selectedOption: AlgorithmType;
  disabled?: boolean;
  onChange?: (newAlgo: AlgorithmType) => void;
};

export function AlgorithmListOptions({
  selectedOption,
  disabled = false,
  onChange,
}: AlgorithmListOptionsProps) {
  return (
    <Listbox as="div" value={selectedOption} className="relative" onChange={onChange} disabled={disabled}>
      <Listbox.Button
        className="bg-stone-700 px-4 py-2 rounded-md hover:bg-stone-600 select-none
        focus:ring-2 focus:ring-stone:500 
        disabled:opacity-50 disabled:cursor-not-allowed flex"
      >
        <div className="mr-2">
          <SortingIcon />
        </div>
        <span className="w-52 flex gap-4">
          <span className="font-bold">Algorithm: </span>
          {beautifyAlgoNames(selectedOption)}
        </span>
        <div className="ml-2" aria-hidden="true">
          <ArrowDownIcon />
        </div>
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-50 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Listbox.Options className="absolute mt-1 w-full bg-stone-600 rounded-md">
          {Object.values(Algorithm).map((algorithm, idx) => (
            <Listbox.Option
              value={algorithm}
              key={idx}
              className={({ active }) =>
                `cursor-pointer select-none py-2 px-4 rounded-md whitespace-nowrap ${
                  active ? "bg-stone-500 text-stone-900" : ""
                }`
              }
            >
              {beautifyAlgoNames(algorithm)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

function beautifyAlgoNames(algoName: AlgorithmType) {
  return algoName.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
