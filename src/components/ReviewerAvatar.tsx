/** Letter avatar matching Google Maps / Angi when no real profile photo exists. */
export function ReviewerAvatar({
  name,
  initial,
  className = "size-11",
}: {
  name: string;
  initial: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${name} profile`}
      data-reviewer-avatar="letter"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white font-semibold uppercase ${className}`}
    >
      {initial}
    </span>
  );
}
