import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, ChangeEvent, MouseEvent } from "react";
import { AnimationSpeedIcon, ArrayBarsIcon, RandomizeIcon } from "./Icons";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ArrowDownIcon, SortingIcon } from "./Icons";
import { useArray } from "../lib/useArray";
import { useAlgorithm } from "../lib/useAlgorithm";
import { useStatus } from "../lib/useStatus";
import { Algorithm, UIStatus, type AlgorithmType } from "../lib/AppContext";
import { MAX_ARRAY_LEN, MIN_ARRAY_LEN, SORT_FAST_SPEED_DELAY, SORT_SLOW_SPEED_DELAY } from "../lib/shared";
import { useSpeed } from "../lib/useSpeed";

export function Settings() {
  const { array, newArray, setSize } = useArray();
  const [status, setStatus] = useStatus();
  const [algorithm, setAlgorithm] = useAlgorithm();
  const [speed, setSpeed] = useSpeed();

  const arraySizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value));
  const animationSpeedChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSpeed(SORT_SLOW_SPEED_DELAY - Number(e.target.value));
  const sortButtonClickHandler = (e: MouseEvent) => setStatus(UIStatus.SORTING);

  const shouldDisableSettings = status === UIStatus.SORTING;

  return (
    <div id="settings" className="relative z-20 font-semibold">
      <div className="h-20 bg-zinc-900">
        <div className="flex items-center h-full px-4 md:px-6 gap-6 justify-center">
          {/* Randomizer Button (new array) */}
          <Button disabled={shouldDisableSettings} onClick={newArray}>
            <div className="flex gap-2">
              <span className="order-2">Randomize</span>
              <RandomizeIcon />
            </div>
          </Button>

          {/* Input Range (array size) */}
          <div>
            <InputRange
              disabled={shouldDisableSettings}
              min={MIN_ARRAY_LEN}
              max={MAX_ARRAY_LEN}
              value={array.length}
              onChange={arraySizeChangeHandler}
            >
              <div className="flex gap-2">
                <ArrayBarsIcon />
                <span>
                  Array Size:{" "}
                  <span
                    className={`${
                      array.length < 50
                        ? "text-green-500"
                        : array.length < 85
                        ? "text-yellow-500"
                        : array.length < 150
                        ? "text-orange-500"
                        : array.length < 200
                        ? "text-red-400"
                        : "text-red-500"
                    }`}
                  >
                    {array.length}
                  </span>
                </span>
              </div>
            </InputRange>
          </div>

          {/* Algorithm Options */}
          <AlgorithmListOptions
            disabled={shouldDisableSettings}
            onChange={setAlgorithm}
            selectedOption={algorithm}
          />

          {/* Animation Speed */}
          <InputRange
            disabled={shouldDisableSettings}
            min={SORT_FAST_SPEED_DELAY - 1}
            max={SORT_SLOW_SPEED_DELAY - 1}
            step={1}
            defaultValue={SORT_SLOW_SPEED_DELAY - speed}
            onChange={animationSpeedChangeHandler}
          >
            <div className="flex gap-2 items-center">
              <AnimationSpeedIcon />
              Sorting Speed
            </div>
          </InputRange>

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
  children: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

function InputRange({ children, ...props }: InputRangeProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{children}</label>
      <input type="range" className={`w-full accent-zinc-400 disabled:cursor-not-allowed`} {...props} />
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600 select-none
    focus:ring-2 focus:ring-zinc-400 focus:outline-none
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

function AlgorithmListOptions({
  selectedOption,
  disabled = false,
  onChange,
}: AlgorithmListOptionsProps) {
  return (
    <Listbox as="div" value={selectedOption} className="relative" onChange={onChange} disabled={disabled}>
      <Listbox.Button
        className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600 select-none
        focus:ring-2 focus:ring-zinc-400 focus:outline-none
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
        <Listbox.Options className="absolute mt-1 w-full bg-zinc-700 rounded-md">
          {Object.values(Algorithm).map((algorithm, idx) => (
            <Listbox.Option
              value={algorithm}
              key={idx}
              className={({ active }) =>
                `cursor-pointer select-none py-2 px-4 rounded-md whitespace-nowrap ${
                  active ? "bg-zinc-600" : ""
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
  return algoName
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
