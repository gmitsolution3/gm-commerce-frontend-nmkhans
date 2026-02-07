// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"

// interface SliderContainer {
//   id: string
//   title?: string
//   description?: string
//   images: string[]
// }

// export interface ProductSliderSectionProps {
//   mainSlider: SliderContainer
//   sideSliders: SliderContainer[]
// }

// const SingleSlider = ({
//   slider,
//   isMain = false,
// }: {
//   slider: SliderContainer
//   isMain?: boolean
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [direction, setDirection] = useState<"left" | "right">("right")

//   const handlePrev = () => {
//     setDirection("left")
//     setCurrentIndex((prev) => (prev === 0 ? slider.images.length - 1 : prev - 1))
//   }

//   const handleNext = () => {
//     setDirection("right")
//     setCurrentIndex((prev) => (prev === slider.images.length - 1 ? 0 : prev + 1))
//   }

//   // Auto-slide effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext()
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [currentIndex, slider.images.length])

//   return (
//     <div
//       className={`relative w-full overflow-hidden rounded-md bg-linear-to-br from-slate-900 to-slate-800 ${
//         isMain ? "h-[20vh] md:h-[77vh]" : "h-[15vh] md:h-80"
//       }`}
//     >
//       {/* ${isMain ? "h-96 md:h-full" : "h-64 md:h-80"} */}
//       <div className="relative w-full h-full">
//         {slider.images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-all duration-700 ease-out ${
//               index === currentIndex
//                 ? "opacity-100 scale-100"
//                 : "opacity-0 scale-105"
//             }`}
//           >
//             <Image
//               src={image || "/placeholder.svg"}
//               alt={`${slider.title} - Image ${index + 1}`}
//               className="w-full h-full object-cover"
//               priority
//               fetchPriority="high"
//               fill
//               sizes="100vw"
//             />
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
//       <>
//         <button
//           onClick={handlePrev}
//           className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//         </button>

//         <button
//           onClick={handleNext}
//           className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//         </button>
//       </>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//         {slider.images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? "bg-orange-500 w-8 h-2"
//                 : "bg-white/50 hover:bg-white/70 w-2 h-2"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function ProductSliderSection({ mainSlider, sideSliders }: ProductSliderSectionProps) {

//   return (
//     <section className="w-full bg-white px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
//       <div className="max-w-full mx-auto">
//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
//           {/* Main Slider - Takes full width on mobile, 2 cols on desktop */}
//           <div className="lg:col-span-2">
//             <SingleSlider slider={mainSlider} isMain={true} />
//           </div>

//           {/* Side Sliders Container */}
//           <div className="grid grid-cols-2 gap-2 md:gap-6 lg:flex lg:flex-col lg:gap-6">
//             {sideSliders.map((slider) => (
//               <div key={slider.id} className={`${sideSliders.length === 2 ? "col-span-1" : ""}`}>
//                 <SingleSlider slider={slider} isMain={false} />
//                 {/* {slider.title && (
//                   <h3 className="text-sm md:text-base font-semibold mt-3 md:mt-4 text-gray-900">{slider.title}</h3>
//                 )} */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";

interface SliderContainer {
  id: string;
  title?: string;
  description?: string;
  images: string[];
}

export interface ProductSliderSectionProps {
  mainSlider: SliderContainer;
  sideSliders: SliderContainer[];
}

const SingleSlider = ({
  slider,
  isMain = false,
}: {
  slider: SliderContainer;
  isMain?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">(
    "right",
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) =>
      prev === 0 ? slider.images.length - 1 : prev - 1,
    );
  }, [slider.images.length]);

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev === slider.images.length - 1 ? 0 : prev + 1,
    );
  }, [slider.images.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isAutoPlaying]);

  const imageHeight = isMain
    ? "h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px]"
    : "h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px]";

  return (
    <div
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Container */}
      <div
        className={`relative w-full overflow-hidden rounded-xl shadow-lg ${imageHeight}`}
      >
        {/* Images with smooth transitions */}
        {slider.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : direction === "right"
                  ? "translate-x-full opacity-0"
                  : "-translate-x-full opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${slider.title || "Slider"} - Image ${index + 1}`}
                className="object-cover"
                fill
                priority={index === 0}
                sizes={
                  isMain
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw"
                    : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                }
                quality={90}
              />
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
            </div>
          </div>
        ))}

        {/* Title Overlay (if exists) */}
        {slider.title && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
            <h3 className="text-white text-lg md:text-xl font-bold">
              {slider.title}
            </h3>
            {slider.description && (
              <p className="text-white/90 text-sm md:text-base mt-1">
                {slider.description}
              </p>
            )}
          </div>
        )}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-20">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30
                       bg-black/40 hover:bg-black/60 backdrop-blur-sm
                       text-white p-2 md:p-3 rounded-full
                       transition-all duration-300
                       opacity-0 group-hover:opacity-100 md:opacity-100
                       transform -translate-x-2 group-hover:translate-x-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30
                       bg-black/40 hover:bg-black/60 backdrop-blur-sm
                       text-white p-2 md:p-3 rounded-full
                       transition-all duration-300
                       opacity-0 group-hover:opacity-100 md:opacity-100
                       transform translate-x-2 group-hover:translate-x-0"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-30 overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300 ease-linear"
              style={{
                width: `${(currentIndex + 1) * (100 / slider.images.length)}%`,
              }}
            />
          </div>
        )}

        {/* Dot Indicators */}
        {slider.images.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20
                         flex gap-1.5 md:gap-2"
          >
            {slider.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-orange-500 w-6 h-2 md:w-8 md:h-2.5"
                    : "bg-white/60 hover:bg-white/80 w-2 h-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  index === currentIndex ? "true" : "false"
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProductSliderSection({
  mainSlider,
  sideSliders,
}: ProductSliderSectionProps) {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Slider */}
          <div className="col-span-3">
            <SingleSlider slider={mainSlider} isMain={true} />
          </div>

          <div className="col-span-2">
            <SingleSlider slider={sideSliders[0]} isMain={true} />
          </div>
          
        </div>

        {/* Mobile view for side slider titles (alternative approach) */}
        {sideSliders.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4 lg:hidden">
            {sideSliders.map((slider, index) => (
              <div
                key={`mobile-title-${index}`}
                className="text-center"
              >
                {slider.title && (
                  <h3 className="text-sm font-medium text-gray-800">
                    {slider.title}
                  </h3>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responsive CSS for different breakpoints */}
      <style jsx>{`
        @media (max-width: 640px) {
          .grid-cols-2 > * {
            min-height: 150px;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .grid-cols-2 > * {
            min-height: 180px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .lg\\:grid-cols-3 {
            grid-template-columns: 2fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
