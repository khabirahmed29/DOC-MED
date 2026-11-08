import React from "react";
import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="spinner app-spinner" role="status" aria-label="Loading">
      <LoaderCircle size={42} strokeWidth={2} aria-hidden="true" />
    </div>
  );
};

export default Spinner;
