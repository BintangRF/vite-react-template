import { useBearStore } from "@/store/Bears.store";
import React from "react";

export default function Test(): React.ReactElement {
  const bears = useBearStore((s) => s.bears);
  const addBear = useBearStore((s) => s.addBear);
  const removeBear = useBearStore((s) => s.removeAllBears);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-200 via-yellow-100 to-amber-300">
      <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-amber-300 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-40" />

        <h1 className="relative text-4xl font-black mb-2">🐻 Bear Factory</h1>
        <p className="relative text-sm text-gray-500 mb-6">
          Create bears. Regret nothing.
        </p>

        {/* Buttons */}
        <div className="relative flex justify-center gap-4 mb-6">
          <button
            onClick={addBear}
            className="
              px-6 py-3 rounded-full
              bg-amber-500 text-white font-bold
              shadow-lg
              hover:bg-amber-600 hover:scale-110
              active:scale-95
              transition-all
            "
          >
            ➕ Spawn
          </button>

          {bears.length > 0 && (
            <button
              onClick={removeBear}
              className="
                px-6 py-3 rounded-full
                bg-rose-400 text-white font-bold
                shadow-lg
                hover:bg-rose-500 hover:scale-110
                active:scale-95
                transition-all
              "
            >
              💥 Reset
            </button>
          )}
        </div>

        {/* Bears */}
        <div className="relative min-h-20 flex flex-wrap justify-center gap-2 text-4xl">
          {bears.length === 0 ? (
            <div className="text-gray-400 italic text-base">
              No bears yet… this place is sad 🥲
            </div>
          ) : (
            bears.map((bear, i) => (
              <span
                key={i}
                className="animate-bounce hover:scale-125 transition-transform cursor-default"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {bear}
              </span>
            ))
          )}
        </div>

        {/* Counter */}
        <div className="relative mt-6 text-sm text-gray-600">
          Total Bears:
          <span className="ml-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-extrabold">
            {bears.length}
          </span>
        </div>
      </div>
    </div>
  );
}
