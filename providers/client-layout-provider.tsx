"use client";
import React from "react";

function ClientLayoutProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default ClientLayoutProvider;
