import {
  createDeadline,
  expiresAt,
  remainingTime,
  hasExpired,
} from "../utils/deadline";

const deadline =
  createDeadline(
    1000n,
    300n,
  );

const checkpoints = [
  1000n,
  1100n,
  1200n,
  1300n,
  1400n,
];

console.log(
  "Deadline:",
  expiresAt(deadline).toString(),
);

console.log("");

for (
  const currentTime of checkpoints
) {
  console.log(
    "Current:",
    currentTime.toString(),
  );

  console.log(
    "Remaining:",
    remainingTime(
      deadline,
      currentTime,
    ).toString(),
  );

  console.log(
    "Expired:",
    hasExpired(
      deadline,
      currentTime,
    ),
  );

  console.log(
    "----------------",
  );
}
