import { calcNights } from "../src/client/js/calculateNights";

describe("Testing the calculate functionality", () => {
  test("Testing the calcNights() function", () => {
    expect(calcNights("2022-02-06", "2022-02-10")).toBe(4);
  });
});
