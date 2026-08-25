import { expect } from "chai";

import {
  createDeadline,
  expiresAt,
  hasExpired,
  remainingTime,
  isActive,
  deadlineText,
} from "../utils/deadline";

describe("deadline helper", function () {
  const deadline =
    createDeadline(
      100n,
      50n,
    );

  it("creates a deadline", function () {
    expect(
      deadline.createdAt,
    ).to.equal(100n);

    expect(
      deadline.duration,
    ).to.equal(50n);
  });

  it("calculates expiration", function () {
    expect(
      expiresAt(deadline),
    ).to.equal(150n);
  });

  it("is active before expiration", function () {
    expect(
      isActive(
        deadline,
        120n,
      ),
    ).to.equal(true);
  });

  it("is expired at the deadline", function () {
    expect(
      hasExpired(
        deadline,
        150n,
      ),
    ).to.equal(true);
  });

  it("is expired after the deadline", function () {
    expect(
      hasExpired(
        deadline,
        180n,
      ),
    ).to.equal(true);
  });

  it("calculates remaining time", function () {
    expect(
      remainingTime(
        deadline,
        120n,
      ),
    ).to.equal(30n);
  });

  it("returns zero after expiration", function () {
    expect(
      remainingTime(
        deadline,
        200n,
      ),
    ).to.equal(0n);
  });

  it("creates readable text", function () {
    const text =
      deadlineText(deadline);

    expect(text)
      .to.contain(
        "expires: 150",
      );
  });
});
