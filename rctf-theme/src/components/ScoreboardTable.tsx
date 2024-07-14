import { Link } from "next-view-transitions";
import { setSlideDirection } from "@/components/Navbar";
import type { TeamScoreboardEntry, ProfileData } from "@/lib/rctf-client-api/types";

export type TeamScoreboardEntryRanked = TeamScoreboardEntry & {
  rank: number
};

interface ScoreboardTableProps {
  total: number;
  scoreboard: TeamScoreboardEntryRanked[];
  currentProfile: ProfileData | null;
}

export default function ScoreboardTable({ total, scoreboard, currentProfile }: ScoreboardTableProps) {
  return (
    <div className="max-h-96 overflow-auto md:text-lg custom-scrollbar">
      <div className="sticky top-0 bg-surface-panel border-b-2 border-dashed mb-2 px-4 py-1">
        <div className="flex flex-row w-full">
          <span className="w-[8ch] shrink-0">
            <strong>
              Rank
            </strong>
          </span>
          <span className="min-w-0 flex-auto">
            <strong>
              Team
            </strong>
          </span>
          <span className="w-1/4 shrink-0">
            <strong>
              Passengers
            </strong>
          </span>
        </div>
      </div>
      <div className="flex flex-col break-words">
        {scoreboard.map((team) => {
          const pinned = currentProfile && team.name === currentProfile.name;
          return (
            <Link
              key={team.id}
              href={`/profile?id=${team.id}`}
              onClick = {() => setSlideDirection("e")}
              className={`flex flex-row w-full px-4 ${pinned ? "sticky top-10 bottom-0 bg-button-normal hover:bg-button-normalhover text-white" : "hover:bg-surface-panelalt hover:text-surface-textalt"}`}
            >
              <span className="w-[8ch] shrink-0">
                {team.rank}
              </span>
              <span className="min-w-0 flex-auto">
                {team.name}{pinned ? ` (top ${Math.ceil(team.rank / total * 100)}%)` : ""}
              </span>
              <span className="w-1/4 shrink-0">
                {team.score}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}