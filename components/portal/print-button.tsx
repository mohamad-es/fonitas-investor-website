"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: 0, background: "transparent", color: "#099b61", padding: "4px 0", fontSize: "13px", fontWeight: 650, cursor: "pointer" }}
    >
      <Printer size={17} strokeWidth={1.9} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
