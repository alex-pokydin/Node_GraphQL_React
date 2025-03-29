import bookingResolver from "./booking.ts";
import eventResolver from "./event.ts";
import userResolver from "./user.ts";

export default {
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};