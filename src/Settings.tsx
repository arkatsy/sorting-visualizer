import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ALGORITHMS } from "./settings_state";

export default function Settings() {
  const [num, setNum] = useState(10);
  const [algoSelected, setAlgoSelected] = useState<typeof ALGORITHMS[number]>(
    ALGORITHMS[0]
  );

  return (
    <>
      <HeaderLayout>
        <div className="flex gap-8 w-full relative">
          <div className="group relative">
            <Button label="New Array" />
            <span className="settings-tooltip group-hover:scale-100 py-2 px-4">
              Generates new random array of size{" "}
              <span className="text-green-600">{num}</span> 💡
            </span>
          </div>
          <InputRange
            label={`Array Size: ${num}`}
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
          />
          <AlgorithmOptions
            selectedOption={algoSelected}
            onChange={setAlgoSelected}
          />

          <div className="absolute right-0 flex gap-4">
            <Button label="Start" />
            <Button label="Stop" disabled />
            <Button label="Reset" />
          </div>
        </div>
      </HeaderLayout>
    </>
  );
}

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#202225] h-20 text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-4 lg:px-8 xl:lg-10 flex items-center">
        {children}
      </div>
    </div>
  );
}

const UI_ALGORITHMS = {
  BUBBLE_SORT: "Bubble Sort",
  SELECTION_SORT: "Selection Sort",
  INSERTION_SORT: "Insertion Sort",
  MERGE_SORT: "Merge Sort",
  QUICK_SORT: "Quick Sort",
};

function AlgorithmOptions({
  selectedOption,
  onChange = () => {},
}: {
  selectedOption: typeof ALGORITHMS[number];
  onChange?: (value: typeof ALGORITHMS[number]) => void;
}) {
  return (
    <Listbox
      as="div"
      value={selectedOption}
      className="relative"
      onChange={onChange}
    >
      <Listbox.Button
        className="bg-[#2f3136] px-4 py-2 rounded-md hover:bg-[#40444b] select-none
        focus:ring-2 focus:ring-[#5865f2] focus:ring-offset-2 focus:ring-offset-[#202225]
        disabled:opacity-50 disabled:cursor-not-allowed flex"
      >
        {UI_ALGORITHMS[selectedOption]}
        <div className="relative ml-2" aria-hidden="true">
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
        <Listbox.Options className="absolute mt-1 w-full bg-[#2f3136] rounded-md">
          {ALGORITHMS.map((algorithm, idx) => (
            <Listbox.Option
              value={algorithm}
              key={idx}
              className={({ active }) =>
                `cursor-pointer select-none py-2 px-4 rounded-md whitespace-nowrap ${
                  active ? "bg-[#40444b]" : ""
                }`
              }
            >
              {UI_ALGORITHMS[algorithm]}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

function InputRange({
  label = "",
  value = 10,
  onChange = () => {},
  ...props
}: {
  label?: string | React.ReactNode;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        type="range"
        value={value}
        onChange={onChange}
        className="w-full accent-[#5865f2]"
        {...props}
      />
    </div>
  );
}

function Button({
  label = "",
  onClick = () => {},
  ...props
}: {
  label?: string | React.ReactNode;
  onClick?: React.MouseEventHandler;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-[#2f3136] px-6 py-2 rounded-md hover:bg-[#40444b] select-none
    focus:ring-2 focus:ring-[#5865f2] focus:ring-offset-2 focus:ring-offset-[#202225]
    disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}