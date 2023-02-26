export default function Visualizer({ array }: { array: Array<number> }) {
  return (
    <VisualizerLayout>
      <main className="w-full bg-slate-900 my-4 lg:my-10">
        <div>{array}</div>
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
