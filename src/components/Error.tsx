import React from "react";

export const Error = ({ error, icon }: { error: string; icon?: React.ReactNode }) => {
  return (
    <div className={`bg-primary ${error === "" ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"} fixed text-lg transition ease-in-out duration-300 top-10 md:top-16 font-bold text-white p-4 rounded-2xl  flex items-center justify-center gap-3`}>
      {error && <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground">{icon}</span>}
      <p>{error}</p>
    </div>
  );
};
