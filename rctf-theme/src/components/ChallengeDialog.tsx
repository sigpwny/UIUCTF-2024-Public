"use client";
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { getSolves, submitFlag } from "@/lib/rctf-client-api/challenges";
import { time } from "@/lib/rctf-client-utils"
import { ArrowButton } from "@/components/Button";
import { Arrow, StarFill } from "@/components/Icons";
import { setSlideDirection } from "@/components/Navbar";
import Markdown from "@/components/Markdown";
import Modal from "@/components/Modal";
import type { DisplayCleanedChallenge } from "@/components/ChallengeList";
export interface OtherSolve {
  id: string;
  createdAt: string;
  userId: string;
  userName: string;
}

export interface SolvesProps {
  solves: OtherSolve[];
  userId?: string;
}

function Solves({ solves, userId } : SolvesProps) {
  return (
    <div className="overflow-auto custom-scrollbar">
      <div className="sticky top-0 bg-surface-panel border-b-2 border-dashed mb-2 px-4 py-1">
        <div className="flex flex-row w-full">
          <span className="w-[8ch] shrink-0">
            <strong>
              #
            </strong>
          </span>
          <span className="min-w-0 flex-auto">
            <strong>
              Team
            </strong>
          </span>
          <span className="w-1/4 shrink-0">
            <strong>
              Solve time
            </strong>
          </span>
        </div>
      </div>
      <div className="flex flex-col break-words">
        {solves.map((solve, idx) => {
          const pinned = userId && solve.userId === userId;
          return (
            <Link
              key={solve.id}
              href={`/profile?id=${solve.userId}`}
              onClick = {() => setSlideDirection("none")}
              className={`flex flex-row w-full px-4 ${pinned ? "bg-button-normal hover:bg-button-normalhover text-white" : "hover:bg-surface-panelalt hover:text-surface-textalt"}`}
            >
              <span className="w-[8ch] shrink-0">
                {idx + 1}
              </span>
              <span className="min-w-0 flex-auto">
                {solve.userName}
              </span>
              <span className="w-1/4 shrink-0">
                {time.formatRelativeTime(solve.createdAt)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export interface ChallengeDialogProps {
  challenge: DisplayCleanedChallenge;
  closeChallengeDialog: () => void;
  attemptRefresh: () => void;
  solved?: boolean;
  userId?: string;
}

export default function ChallengeDialog({ challenge, closeChallengeDialog, attemptRefresh, solved, userId }: ChallengeDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [solves, setSolves] = useState<OtherSolve[] | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [flag, setFlag] = useState("");
  const [isSolved, setIsSolved] = useState(solved);

  const hasDownloads = challenge.files.length > 0;

  useEffect(() => {
    // Fetch other solves
    const fetchSolves = async () => {
      try {
        const res = await getSolves({
          challId: challenge.id,
          limit: 3000,
          offset: 0
        });
        if (res.error) {
          setError(res.error);
        }
        if (res.kind === "goodChallengeSolves") {
          setSolves(res.data.solves);
        }
      } catch { }
    }
    fetchSolves();
  }, [challenge, isSolved]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const asyncSubmitFlag = async () => {
      setDisabled(true);
      const res = await submitFlag(challenge.id, flag);
      setDisabled(flag === "");
      if (res.error) {
        setError(res.error);
      } else {
        setError(null);
        setIsSolved(true);
        setMessage("The flag is correct!");
        attemptRefresh();
      }
    }
    asyncSubmitFlag();
  }

  return (
    <Modal
      open={true}
      onClose={closeChallengeDialog}
    >
      <div className="flex flex-col gap-4 m-4 items-center">
        <div className="relative panel flex flex-col gap-4 mx-auto h-fit w-full">
          <button
            className="absolute top-4 right-4 text-xl rotate-n hover:scale-125"
            onClick={closeChallengeDialog}
            aria-label="Close"
          >
            <Arrow />
          </button>
          <p className="text-3xl leading-3 py-2 inline-flex font-bold">
            {challenge.name}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-center">
              <div className="flex flex-row gap-3 items-center">
                <span className="flex flex-row">
                  <span className="h-3 w-3 bg-surface-text rounded-full" />
                  <svg className="w-auto h-3" fill="currentColor" viewBox="0 0 100 85">
                    <polygon points="50 0, 100 85, 0 85"/>
                  </svg>
                  <span className="h-3 w-3 bg-surface-text" />
                </span>
                <span className="inline-flex flex-c align-middle leading-4">
                  <strong>{challenge.points}</strong>&nbsp;Passengers
                </span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <StarFill height={16} width={16} fill="currentColor" />
                <span className="inline-flex flex-c align-middle leading-4">
                  {challenge.solves} Solve{challenge.solves !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <p>
              {challenge.author ? (
                <span>
                  Author: {challenge.author}
                </span>
              ) : null}
            </p>
          </div>
          <p>
            <Markdown content={challenge.description} />
          </p>
          {hasDownloads ? (
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xl">
                Downloads
              </p>
              <ul className="flex flex-row flex-wrap gap-2">
                {challenge.files.map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={file.url}
                      className="flex flex-row gap-2 px-2 py-1 bg-surface-panelalt text-surface-textalt hover:!bg-button-normal hover:!text-white !no-underline"
                      download
                    >
                      <span className="inline-block rotate-s">
                        <Arrow />
                      </span>
                      <span>{file.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <form className="flex flex-col gap-2 mt-4" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="flagSubmit" className="text-xl font-semibold">
              Submit flag
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className={`px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel grow ${error ? "border-2 border-red-500" : (isSolved ? "border-2 border-green-500" : "")}`}
                // autoFocus
                {...isSolved ? { autoFocus: false } : { autoFocus: true }}
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                id="flagSubmit"
                {...isSolved ? { placeholder: "Challenge is solved!" } : { placeholder: "uiuctf{...}" }}
                type="text"
                onChange={(e) => {
                  setFlag(e.target.value);
                  setDisabled(!e.target.value);
                }}
              />
              <ArrowButton type="submit" direction="hidden" disabled={disabled}>
                Submit
              </ArrowButton>
            </div>
            {error ? <span className="text-red-500">{error}</span> : null}
            {message ? <span className="text-green-500">{message}</span> : null}
          </form>
        </div>
        {solves ? (
          <div className="fade-in-up relative z-50 panel-nolinks flex flex-col gap-4 mx-auto h-fit w-full max-w-prose pointer-events-auto">
            <p className="text-3xl leading-3 py-2 inline-flex font-bold">
              Solves ({solves.length})
            </p>
            <Solves solves={solves} userId={userId} />
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
