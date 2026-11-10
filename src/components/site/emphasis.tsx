import { Fragment } from "react";

const pattern = /\*([^*]+)\*/g;

/** Renders `*text*` spans from dictionary strings with the given class. */
export function Emphasis({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(pattern).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className={className}>
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function stripEmphasis(text: string) {
  return text.replace(pattern, "$1");
}
