import {
  Fragment,
  type ReactNode,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ChangeEvent,
} from "react";
import {
  AnimationSpeedIcon,
  ArrayBarsIcon,
  RandomizeIcon,
  ArrowDownIcon,
  SortingIcon,
} from "@/components/Icons";
import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import useArray from "@/hooks/useArray";
import useAlgorithm from "@/hooks/useAlgorithm";
import useStatus from "@/hooks/useStatus";
import useSpeed from "@/hooks/useSpeed";
import { Algorithm, type AlgorithmType, MAX_ARRAY_LEN, MIN_ARRAY_LEN, SPEED_OPTIONS } from "@/lib/shared";
import { UIStatus } from "@/lib/AppContext";

export function Settings() {
  const { array, newArray, setSize } = useArray();
  const [status, setStatus] = useStatus();
  const [algorithm, setAlgorithm] = useAlgorithm();
  const [speed, setSpeed] = useSpeed();

  const arraySizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value));
  const animationSpeedChangeHandler = (newSpeed: number) => setSpeed(newSpeed);
  const sortButtonClickHandler = () => setStatus(UIStatus.SORTING);

  const shouldDisableSettings = status === UIStatus.SORTING;

  return (
    <div id="settings" className="relative z-20 font-semibold">
      <div className="h-20 bg-zinc-900">
        <div className="flex h-full items-center justify-center gap-8 px-4 md:px-6">
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
          <AnimationSpeedOptions
            onChange={animationSpeedChangeHandler}
            activeSpeed={speed}
            disabled={shouldDisableSettings}
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
      className="select-none rounded-md bg-zinc-700 px-4 py-2 hover:bg-zinc-600
    focus:outline-none focus:ring-2 focus:ring-zinc-400
    disabled:cursor-not-allowed disabled:opacity-50"
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

function AlgorithmListOptions({ selectedOption, disabled = false, onChange }: AlgorithmListOptionsProps) {
  return (
    <Listbox as="div" value={selectedOption} className="relative" onChange={onChange} disabled={disabled}>
      <Listbox.Button
        className="flex select-none rounded-md bg-zinc-700 px-4 py-2
        hover:bg-zinc-600 focus:outline-none focus:ring-2
        focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="mr-2">
          <SortingIcon />
        </div>
        <span className="flex w-52 gap-4">
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
        <Listbox.Options className="absolute mt-1 w-full rounded-md bg-zinc-700">
          {Object.values(Algorithm).map((algorithm, idx) => (
            <Listbox.Option
              value={algorithm}
              key={idx}
              className={({ active }) =>
                `cursor-pointer select-none whitespace-nowrap rounded-md py-2 px-4 ${
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

type AnimationSpeedOptionsProps = {
  onChange: (newSpeed: number) => void;
  activeSpeed: number;
  disabled: boolean;
};

function AnimationSpeedOptions({ onChange, activeSpeed, disabled }: AnimationSpeedOptionsProps) {
  const onChangeWrapper = (newSpeed: number) => {
    onChange(newSpeed);
  };

  return (
    <RadioGroup value={activeSpeed} onChange={onChangeWrapper} className="flex gap-3 ">
      <RadioGroup.Label className="flex items-center gap-2">
        <AnimationSpeedIcon /> Animation Speed:
      </RadioGroup.Label>
      <div className="flex gap-3">
        <RadioGroup.Option
          value={SPEED_OPTIONS.SLOW}
          className={`cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled}
        >
          {({ checked }) => (
            <div className={`rounded-md px-4 py-2 hover:bg-zinc-600 ${checked && "bg-zinc-700"}`}>
              <span className="select-none">Slow</span>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          value={SPEED_OPTIONS.NORMAL}
          className={`cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled}
        >
          {({ checked }) => (
            <div className={`rounded-md px-4 py-2 hover:bg-zinc-600 ${checked && "bg-zinc-700"}`}>
              <span className="select-none">Normal</span>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          value={SPEED_OPTIONS.FAST}
          className={`cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled}
        >
          {({ checked }) => (
            <div className={`rounded-md px-4 py-2 hover:bg-zinc-600 ${checked && "bg-zinc-700"}`}>
              <span className="select-none">Fast</span>
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
}
