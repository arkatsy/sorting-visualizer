export function InputRange({
  label = "",
  value = 25,
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
        min={5}
        max={50}
        value={value}
        onChange={onChange}
        className="w-full accent-[#5865f2]"
        {...props}
      />
    </div>
  );
}
