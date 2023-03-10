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
        min={10}
        max={100}
        value={value}
        onChange={onChange}
        className="w-full accent-[#89b4fa]"
        {...props}
      />
    </div>
  );
}
