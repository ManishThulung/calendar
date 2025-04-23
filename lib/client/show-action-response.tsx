"use client";

import { toast } from "sonner";
import { ActionResponseType } from "../server/response";

export const showActionResponse = (response: ActionResponseType<any>) => {
  if (response.message) {
    if (response.status === "success") {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
};
