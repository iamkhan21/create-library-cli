import { double } from "./double";

describe("Double function", () => {
  test("double 5 to equal 10", () => {
    expect(double(5)).toBe(10);
  });
  test("double 5 to not equal 15", () => {
    expect(double(5)).not.toBe(11);
  });
});
