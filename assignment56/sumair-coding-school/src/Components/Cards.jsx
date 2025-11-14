import React from "react";

const Card = ({ data }) => {
    console.log(data);
    
  return (
    <section className="">
        <div className="bg-[#0e0e0e] text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 font-[Poppins] w-[370px] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a1a] to-[#144B3F] blur-2xl opacity-50 -z-10"></div>
      {/* Image */}
      <div className="relative">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-48 object-cover opacity-95"
        />

        {/* Badge */}
        {data.status && (
          <span className="absolute top-3 right-3 bg-[#b22222] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {data.status}
          </span>
        )}

        {/* Coming Soon Overlay */}
        {data.status === "Coming soon" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold tracking-wide">
            Coming Soon
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 tracking-wide">{data.title}</h3>

        {/* Batch + Language */}
        <div className="flex items-center gap-2 mb-3">
          {data.batchType && (
            <span className="bg-[#8B0000] text-xs px-3 py-1 rounded-md font-medium">
              {data.batchType}
            </span>
          )}
          <span className="bg-[#222] text-xs px-3 py-1 rounded-md font-medium text-gray-200">
            {data.language}
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-end gap-2 mb-1">
          <p className="text-2xl font-bold text-[#00ffb2]">${data.price}</p>
          <p className="text-gray-400 line-through text-sm">${data.oldPrice}</p>
          <span className="bg-[#b22222] text-white text-xs font-semibold px-2 py-1 rounded-md">
            {data.discountText}
          </span>
        </div>

        {/* Discount Tag */}
        {/* <p className="text-green-400 text-xs italic mb-2">{data.discountType}</p> */}

        {/* Button */}
        <button
          className={`w-full mt-2 py-2 rounded-xl font-semibold transition-all duration-300 ${
            data.status === "Coming soon"
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[#00E5A0] text-black hover:bg-[#00ffb2]"
          }`}
        >
          {data.buttonText}
        </button>
      </div>
    </div>
    </section>
  );
};

export default Card;
