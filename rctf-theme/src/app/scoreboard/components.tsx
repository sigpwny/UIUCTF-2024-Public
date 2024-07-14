"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getScoreboard } from "@/lib/rctf-client-api/scoreboard";
import { privateProfile } from "@/lib/rctf-client-api/profile";
import type { TeamScoreboardEntry, ProfileData } from "@/lib/rctf-client-api/types";
import type { TeamScoreboardEntryRanked } from "@/components/ScoreboardTable";
import ScoreboardTable from "@/components/ScoreboardTable";
import { handleResponse } from "@/lib/rctf-client-api/util";

enum LoadingScoreboardState {
  Pending,
  NotStarted,
  Error,
  Loaded,
}

interface QueryScoreboardState {
  page: number;
  pageSize: number;
  division?: string;
}

export default function ScoreboardContext() {
  const [loading, setLoading] = useState<LoadingScoreboardState>(LoadingScoreboardState.Pending);
  const [queryState, setQueryState] = useState<QueryScoreboardState>({
    page: 1,
    pageSize: 3000,
  });
  const [scoreboardState, setScoreboardState] = useState<TeamScoreboardEntryRanked[]>([]);
  const [totalTeams, setTotalTeams] = useState<number>(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(typeof window !== 'undefined'
      ? window?.localStorage?.getItem("token") !== null
      : false);
  }, []);
  // Update query parameters
  const params = useSearchParams();
  if (params.has("page")) {
    setQueryState({
      ...queryState,
      page: Number(params.get("page")),
    });
  }
  if (params.has("pageSize")) {
    setQueryState({
      ...queryState,
      pageSize: Number(params.get("pageSize")),
    });
  }
  if (params.has("division")) {
    setQueryState({
      ...queryState,
      division: params.get("division") as string,
    });
  }
  useEffect(() => {
    // Retrieve private profile
    if (loggedIn) {
      privateProfile().then((res) => {
        if (!res.error) {
          setProfileData(res.data);
        }
      })
    }
    // Retrieve scoreboard
    const retrieveScoreboard = async () => {
      const _division = queryState.division === "all" ? undefined : queryState.division;
      try {
        const res = await getScoreboard({
          division: _division,
          offset: (queryState.page - 1) * queryState.pageSize,
          limit: queryState.pageSize,
        });
        switch (res.kind) {
          case "goodLeaderboard":
            setLoading(LoadingScoreboardState.Loaded);
            break;
          case "badNotStarted":
            setLoading(LoadingScoreboardState.NotStarted);
            return;
          default:
            setLoading(LoadingScoreboardState.Error);
            return;
        }
        setScoreboardState(
          res.data.leaderboard.map((team: TeamScoreboardEntry, idx: number) => ({
            ...team,
            rank: idx + 1 + (queryState.page - 1) * queryState.pageSize,
          }))
        );
        setTotalTeams(res.data.total);
      } catch {}
    };
    retrieveScoreboard();
  }, [queryState, loggedIn]);
  return (
    <div className="panel-nolinks flex flex-col gap-4 max-w-prose mx-auto">
      {loading === LoadingScoreboardState.Pending ? (
        <>
          <p className="font-bold text-4xl">
            Loading...
          </p>
        </>
      ) : loading === LoadingScoreboardState.Error ? (
        <>
          <p className="font-bold text-4xl">
            Error
          </p>
          <p>
            There was an error loading the scoreboard. Please try again later.
          </p>
        </>
      ) : loading === LoadingScoreboardState.NotStarted ? (
        <>
          <p className="font-bold text-4xl">
            UIUCTF 2024 has not started yet.
          </p>
          <p className="">
            The scoreboard will be available once the competition starts and 
            teams begin solving challenges.
          </p>
        </>
      ) : (
        <>
          <ScoreboardTable
            total={totalTeams}
            scoreboard={scoreboardState}
            currentProfile={profileData}
          />
        </>
      )}
    </div>
  )
}