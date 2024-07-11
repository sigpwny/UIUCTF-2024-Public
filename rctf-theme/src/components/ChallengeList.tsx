"use client";
import { useRouter } from "next/navigation";
import type { File, Solve } from "@/lib/rctf-client-api/types";
import { Passengers, Person, Star } from "@/components/Icons";

export interface TrainLine {
  display_name: string;
  color: string;
}

export interface DisplayCleanedChallenge {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  files: File[];
  points: number;
  solves: number;
  sortWeight?: number;
}

interface Props {
  category: TrainLine;
  challenges: DisplayCleanedChallenge[];
  solves?: Solve[];
}

// TODO: Hardcoded categories/train lines
export const categories_to_train_lines: Record<string, TrainLine> = {
  "pwn": {
    display_name: "Pwn",
    color: "red",
  },
  "rev": {
    display_name: "Reverse Engineering",
    color: "orange",
  },
  "crypto": {
    display_name: "Cryptography",
    color: "yellow",
  },
  "misc": {
    display_name: "Miscellaneous",
    color: "green",
  },
  "web": {
    display_name: "Web",
    color: "blue",
  },
  "forensics": {
    display_name: "Forensics",
    color: "purple",
  },
  "osint": {
    display_name: "OSINT",
    color: "purple",
  }
}

export function getTrainLine(category: string): TrainLine {
  return categories_to_train_lines[category] || { display_name: category, color: "brown" };
}

export default function ChallengeCategory({ category, challenges, solves }: Props) {
  const router = useRouter();
  const style = {
    "--color-train-line": `rgb(var(--rgb-trainline-${category.color}))`,
  } as React.CSSProperties;
  const category_solved_count = solves?.filter((solve) => challenges.some((challenge) => challenge.id === solve.id)).length || 0;
  return (
    <div style={style} className="w-full panel-nolinks">
      <h2 className="text-3xl py-2 inline-flex font-bold">
        {category.display_name}
      </h2>
      {solves ? (
        <p>
          <b>{category_solved_count}</b> of <b>{challenges.length}</b> stations in service
        </p>
      ) : null}
      <div className="flex flex-col ml-3 mt-4">
        <span className="relative h-0 w-8 border-t-8 border-[var(--color-train-line)] -left-3" />
        <ul className="grid grid-cols-1 border-dotted border-[var(--color-train-line)] border-l-8">
          {challenges.map((challenge) => {
            const solved = solves?.some((solve) => solve.id === challenge.id);
            return (
              <button
                key={challenge.id}
                className="group relative -left-2 text-left"
                onClick={() => router.replace(`?id=${challenge.id}`, { scroll: false })}
              >
                <li className={`relative border-l-8 ${solved ? "border-[var(--color-train-line)]" : "border-transparent"} px-8 py-4`}>
                  {solved ? (
                    <span className="absolute h-12 w-12 -left-7 top-1/2 -translate-y-1/2 transition-transform group-hover:scale-125">
                      <Star />
                    </span>
                  ) : (
                    <>
                      <span className="absolute h-8 w-8 -left-5 top-1/2 -translate-y-1/2 transition-transform group-hover:scale-125 bg-surface-main border-surface-text border-[0.4rem] rounded-full">
                      </span>
                    </>
                  )}
                  <p className="text-lg leading-6 font-semibold mb-1">
                    {challenge.name}
                  </p>
                  <span className="flex flex-row gap-2 items-center">
                    <span className="flex flex-row">
                      <span className="h-3 w-3 bg-surface-text rounded-full" />
                      <svg className="w-auto h-3" fill="currentColor" viewBox="0 0 100 85">
                        <polygon points="50 0, 100 85, 0 85"/>
                      </svg>
                      <span className="h-3 w-3 bg-surface-text" />
                    </span>
                    <span className="inline-flex flex-col align-middle leading-4">
                      <span>{challenge.points}</span>
                      {/* <span>Passengers</span> */}
                    </span>
                  </span>
                </li>
              </button>
            )
          })}
        </ul>
        <span className="relative h-0 w-8 border-t-8 border-[var(--color-train-line)] -left-3" />
      </div>
    </div>
  )
}
