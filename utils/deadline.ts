export type Deadline = {
  createdAt: bigint;
  duration: bigint;
};

export function createDeadline(
  createdAt: bigint,
  duration: bigint,
): Deadline {
  if (createdAt < 0n) {
    throw new Error(
      "createdAt cannot be negative",
    );
  }

  if (duration < 0n) {
    throw new Error(
      "duration cannot be negative",
    );
  }

  return {
    createdAt,
    duration,
  };
}

export function expiresAt(
  deadline: Deadline,
): bigint {
  return (
    deadline.createdAt +
    deadline.duration
  );
}

export function hasExpired(
  deadline: Deadline,
  currentTime: bigint,
): boolean {
  return (
    currentTime >=
    expiresAt(deadline)
  );
}

export function remainingTime(
  deadline: Deadline,
  currentTime: bigint,
): bigint {
  const end =
    expiresAt(deadline);

  if (currentTime >= end) {
    return 0n;
  }

  return end - currentTime;
}

export function isActive(
  deadline: Deadline,
  currentTime: bigint,
): boolean {
  return !hasExpired(
    deadline,
    currentTime,
  );
}

export function deadlineText(
  deadline: Deadline,
): string {
  return [
    `created: ${deadline.createdAt}`,
    `duration: ${deadline.duration}`,
    `expires: ${expiresAt(deadline)}`,
  ].join("\n");
}
