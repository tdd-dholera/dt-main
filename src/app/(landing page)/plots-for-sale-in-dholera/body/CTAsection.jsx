import React from "react";

export default function CTAsection({text1, text2, subTitle}) {
  return (
    <div
      className="relative py-8 px-4 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="absolute top-10 left-10 w-24 h-24 rounded-full blur-2xl animate-pulse"
        style={{ backgroundColor: "#d3b36b22" }}
      />
      <div
        className="absolute bottom-10 right-10 w-36 h-36 rounded-full blur-3xl animate-pulse delay-1000"
        style={{ backgroundColor: "#d3b36b11" }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <h2 className="text-xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {text1}{" "}
            <span style={{ color: "#d3b36b" }}>{text2}</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "#d3b36b" }}
          />
        </div>

        <p
          className="text-base mb-12 leading-relaxed"
          style={{ color: "#cccccc" }}
        >
          {subTitle}
        </p>

        <div className="flex flex-row gap-3 md:gap-6 justify-center items-center mb-8">
          <a
            href="tel:+919958993549"
            className="text-black px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#d3b36b", border: "1px solid #d3b36b" }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </span>
          </a>

          <a
            href="https://wa.me/919958993549"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#d3b36b", border: "1px solid #d3b36b" }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
              </svg>
              WhatsApp Now
            </span>
          </a>
        </div>

        <p className="text-sm mt-8" style={{ color: "#888888" }}>
          Our Dholera Expert Team are available 24/7 to help you make the right
          decision
        </p>
      </div>
    </div>
  );
}
