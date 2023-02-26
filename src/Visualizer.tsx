export default function Visualizer() {
  return <VisualizerLayout>Visualization</VisualizerLayout>;
}

function VisualizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#292b2f] w-full min-h-screen text-white flex justify-center">
      <div className="max-w-[1920px] w-full px-6 lg:px-8 xl:lg-10">
        {children}
      </div>
    </div>
  );
}
