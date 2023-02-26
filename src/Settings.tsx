export default function Settings() {
  return <HeaderLayout>Header</HeaderLayout>;
}

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#202225] h-20 text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-6 lg:px-8 xl:lg-10 flex items-center">
        {children}
      </div>
    </div>
  );
}
