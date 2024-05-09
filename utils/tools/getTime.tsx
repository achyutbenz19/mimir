import { traceable } from "langsmith/traceable";
export const getTime = traceable(
  async () => {
    return "The time is now being displayed.";
  },
  { name: "getTime" },
);
