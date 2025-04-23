import React from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default LayoutProvider;
