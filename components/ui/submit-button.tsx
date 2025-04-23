import React, { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { SpinningLoader } from "./spinning-loader";

const SubmitButton = ({
  isSubmitting,
  children,
  className,
}: {
  isSubmitting: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn("w-full rounded-sm px-6 py-3 sm:w-fit", className)}
      disabled={isSubmitting}
    >
      {children}
      {isSubmitting && <SpinningLoader />}
    </Button>
  );
};

export default SubmitButton;
