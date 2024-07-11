"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getChallenges } from "@/lib/rctf-client-api/challenges";
import { privateProfile } from "@/lib/rctf-client-api/profile";
import type { Solve } from "@/lib/rctf-client-api/types";
import ChallengeDialog, { type ChallengeDialogProps } from "@/components/ChallengeDialog";
import ChallengeList, { getTrainLine } from "@/components/ChallengeList";
import type { DisplayCleanedChallenge } from "@/components/ChallengeList";
import Footer from "@/components/Footer";

type ChallengesByCategory = Record<string, DisplayCleanedChallenge[]>;

// Hardcoded category sort order
const category_sort_order = [
  "pwn",
  "rev",
  "crypto",
  "osint",
  "web",
  "misc"
];

enum LoadingState {
  Pending,
  NotStarted,
  Error,
  Loaded,
}

export default function ChallengesContext() {
  const [challenges, setChallenges] = useState<DisplayCleanedChallenge[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [privateSolves, setPrivateSolves] = useState<Solve[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Pending);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeDialogProps | null>(null);
  const [forceRefresh, setForceRefresh] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const closeChallengeDialog = useCallback(() => {
    setSelectedChallenge(null);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const attemptRefresh = useCallback(() => {
    setForceRefresh(!forceRefresh);
  }, [forceRefresh]);

  useEffect(() => {
    // Fetch personal solves
    const fetchSolves = async () => {
      try {
        const res = await privateProfile();
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          setUserId(res.data.id);
          setPrivateSolves(res.data.solves);
        }
      } catch { }
    }
    fetchSolves();
    // Fetch challenges
    const fetchChallenges = async () => {
      const res = await getChallenges();
      if (res.kind === 'badToken') {
        toast.error(res.error);
        router.push('/login');
        return;
      }
      if (res.kind === 'badNotStarted') {
        setLoading(LoadingState.NotStarted);
        return;
      }
      if (res.kind === 'goodChallenges') {
        setChallenges(res.data);
        setLoading(LoadingState.Loaded);
        return;
      }
      setLoading(LoadingState.Error);
      setError(res.message);
    }
    fetchChallenges();
  }, [router, forceRefresh]);

  useEffect(() => {
    if (params.has("id")) {
      const challengeId = params.get("id");
      const challenge = challenges.find((c) => c.id === challengeId);
      const solved = privateSolves.some((s) => s.id === challengeId);
      if (challenge) {
        // openChallengeDialog(challenge, userId);
        setSelectedChallenge({
          challenge,
          closeChallengeDialog,
          attemptRefresh,
          solved,
          userId
        });
      }
    }
  }, [params, challenges, privateSolves, userId, closeChallengeDialog, attemptRefresh]);

  // Sort challenges by category
  const challengesByCategory = challenges.reduce((acc, challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = [];
    }
    acc[challenge.category].push(challenge);
    return acc;
  }, {} as ChallengesByCategory);
  // Sort categories by predefined category_sort_order
  // If category is not in category_sort_order, sort alphabetically at the end
  const sortedCategories = Object.keys(challengesByCategory).sort((a, b) => {
    const aIndex = category_sort_order.indexOf(a);
    const bIndex = category_sort_order.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    } else if (aIndex === -1) {
      return 1;
    } else if (bIndex === -1) {
      return -1;
    } else {
      return aIndex - bIndex;
    }
  });

  if (loading === LoadingState.Pending) {
    return (
      <div className="container mx-auto">
        <div className="panel flex flex-col gap-4 mx-auto max-w-prose">
          <p className="font-bold text-4xl">Loading...</p>
        </div>
      </div>
    )
  }
  if (loading === LoadingState.NotStarted) {
    return (
      <div className="container mx-auto grow">
        <div className="panel flex flex-col gap-4 mx-auto max-w-prose">
          <p className="font-bold text-4xl">
            UIUCTF 2024 has not started yet.
          </p>
          <p>
            Challenges will be available once the competition starts.
          </p>
        </div>
      </div>
    )
  }
  if (loading === LoadingState.Error) {
    return (
      <div className="container mx-auto grow">
        <div className="panel flex flex-col gap-4 mx-auto max-w-prose">
          <p className="font-bold text-4xl">
            Error
          </p>
          <p>
            There was an error loading the challenges. Please try again later.
          </p>
          <p>
            {error}
          </p>
        </div>
      </div>
    )
  }
  return (
    <>
      <h1 className="text-4xl font-bold mb-2">
        Challenges
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedCategories.map((category) => (
          <ChallengeList
            key={category}
            category={getTrainLine(category)}
            challenges={challengesByCategory[category]}
            solves={privateSolves}
          />
        ))}
      </div>
      {selectedChallenge ? (
        <ChallengeDialog {...selectedChallenge} />
      ) : null}
      <Footer />
    </>
  )
}
