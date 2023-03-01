import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ArrowDownIcon } from "./Icons";
import { Algorithm } from "../lib/manager";

export function AlgorithmOptions({
  selectedOption,
  onChange = () => {},
  disabled = false,
}: {
  selectedOption: Algorithm;
  onChange?: (value: Algorithm) => void;
  disabled?: boolean;
}) {
  return (
    <Listbox
      as="div"
      value={selectedOption}
      className="relative z-10"
      onChange={onChange}
      disabled={disabled}
    >
      <Listbox.Button
        className="bg-[#2f3136] px-4 py-2 rounded-md hover:bg-[#40444b] select-none
        focus:ring-2 focus:ring-[#5865f2] focus:ring-offset-2 focus:ring-offset-[#202225]
        disabled:opacity-50 disabled:cursor-not-allowed flex"
      >
        {selectedOption}
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
          {Object.values(Algorithm).map((algorithm, idx) => (
            <Listbox.Option
              value={algorithm}
              key={idx}
              className={({ active }) =>
                `cursor-pointer select-none py-2 px-4 rounded-md whitespace-nowrap ${
                  active ? "bg-[#40444b]" : ""
                }`
              }
            >
              {algorithm}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
