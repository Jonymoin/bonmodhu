import React from "react";

const CollectionProcess = () => {
  const images = Array.from({ length: 18 }, (_, index) => `/images/f${index + 1}.jpg`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-6">🌿 আমাদের মধু সংগ্রহের প্রক্রিয়া</h2>
      <p className="text-center text-gray-600 mb-10">
        সুন্দরবনের গভীর বন থেকে মধু সংগ্রহের কিছু মুহূর্ত এখানে তুলে ধরা হলো।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={src}
              alt={`মধু সংগ্রহ ${idx + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionProcess;
