import React from "react";
import { Truck, Repeat, ThumbsUp, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within 24-48 hours",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Repeat,
    title: "Easy Returns",
    description: "7 days exchange",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: ThumbsUp,
    title: "Best Prices",
    description: "Guaranteed deals",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
    gradient: "from-violet-400 to-purple-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-gray-100">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-center lg:px-6 hover:scale-105 transition-transform duration-300"
                >
                  {/* Icon Circle */}
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};