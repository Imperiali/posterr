import { formatDatetime } from "./formatDatetime";

describe("formatDatetime()", function () {
  it("should format datetime 03-01-1995 as March 1, 1995", function () {
    const formattedDate = formatDatetime("03-01-1995");

    expect(formattedDate).toBe("March 1, 1995");
  });
});
