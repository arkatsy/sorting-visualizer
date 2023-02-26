export default function Visualizer({ array }: { array: Array<number> }) {
  return (
    <VisualizerLayout>
      <main className=" my-4 lg:my-10 flex items-end justify-center max-w-[1920px]">
        {array.map((value, index) => (
          <div
            className="bg-[#5b616b] border border-[#292b2f] flex items-center justify-center text-white w-full rounded-md"
            style={{
              height: `${value}px`,
            }}
            key={index}
          />
        ))}
      </main>
    </VisualizerLayout>
  );
}

function VisualizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#292b2f] w-full text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-6 lg:px-8 xl:lg-10 absolute bottom-0">
        {children}
      </div>
    </div>
  );
}
