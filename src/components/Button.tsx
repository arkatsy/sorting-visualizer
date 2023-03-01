export function Button({
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
