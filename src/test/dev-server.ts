import { setupWorker } from "msw";
import handlers from "./handlers";

export const worker = setupWorker(...handlers);

worker.start({
  quiet: true,
  onUnhandledRequest: "warn",
});
