import Image from "next/image";

export default function HighlightGrid() {
  const altname = "local-sales-images";

  const leftColumn = [
    { src: "/wooden-craft.jpg", height: "h-65 lg:h-63 " },
    { src: "/workshop.jpg", height: "h-50 lg:h-48 " },
  ];

  const rightColumn = [
    { src: "/fabrics.jpg", height: "h-50 lg:h-48" },
    { src: "/ceramics.jpg", height: "h-65 lg:h-63" },
  ];

  // A reusable component for the gradient overlay
  const GradientOverlay = () => (
    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
  );

  return (
    <div className="flex gap-x-4  items-start justify-center  ">
      {/* LEFT COLUMN - Shifted down by padding */}
      <div className="flex flex-col gap-4 pt-13">
        {leftColumn.map((item, i) => (
          <div
            key={i}
            className={`relative ${item.height} w-38 md:w-32 lg:w-47 overflow-hidden rounded-3xl`}
          >
            <Image src={item.src} alt={altname} fill className="object-cover" />
            <GradientOverlay />
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN - Starts at the top */}
      <div className="flex gap-4 flex-col ">
        {rightColumn.map((item, i) => (
          <div
            key={i}
            className={`relative ${item.height} w-38 md:w-32 lg:w-47 overflow-hidden rounded-3xl`}
          >
            <Image src={item.src} alt={altname} fill className="object-cover" />
            <GradientOverlay />
          </div>
        ))}
      </div>
    </div>
  );
}
