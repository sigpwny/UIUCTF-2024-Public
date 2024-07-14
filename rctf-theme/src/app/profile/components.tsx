"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logout } from "@/lib/rctf-client-api/auth";
import {
  privateProfile,
  publicProfile,
  updateAccount,
  updateEmail,
  deleteEmail
} from "@/lib/rctf-client-api/profile";
import { strings, time } from "@/lib/rctf-client-utils";
import type { ProfileData, Solve } from "@/lib/rctf-client-api/types";
import { ArrowButton } from "@/components/Button";
import Footer from "@/components/Footer";
import { FluentClock } from "@/components/Icons";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

interface TeamSummaryPanelProps {
  name: string;
  score: number;
  globalPlace: string;
  isPrivate: boolean;
  divisionPlace?: string;
}

export function TeamSummaryPanel({
  name,
  score,
  globalPlace,
  isPrivate,
}: TeamSummaryPanelProps) {
  return (
    <div className="panel flex flex-col gap-4 w-full">
      <p className="text-2xl font-bold">
        {name}
      </p>
      <hr />
      {score === 0 ? (
        <p>
          No passengers delivered
        </p>
      ) : (
        <p>
          <strong>{score}</strong> passengers delivered
        </p>
      )}
      {score === 0 ? (
        <p>
          Unranked
        </p>
      ) : (
        <p>
          <strong>{globalPlace}</strong> across all teams
        </p>
      )}
    </div>
  )
}

interface SolvesPanelProps {
  solves: Solve[];
}

export function SolvesPanel({ solves }: SolvesPanelProps) {
  if (!solves || solves.length === 0) {
    return (
      <div className="panel flex flex-col gap-4 text-center">
        <span className="text-4xl">
          <FluentClock />
        </span>
        <p className="font-semibold text-2xl">This team has no solves.</p>
      </div>
    )
  }
  return (
    <div className="panel flex flex-col gap-4">
      <p className="text-2xl font-bold">
        Solves
      </p>
      <span>
        <div className="bg-surface-panel border-b-2 border-dashed mb-2 px-4 py-1">
          <div className="flex flex-row w-full">
            <span className="w-1/4 shrink-0">
              <strong>
                Category
              </strong>
            </span>
            <span className="w-1/4 flex-auto">
              <strong>
                Challenge
              </strong>
            </span>
            <span className="w-1/4 flex-auto">
              <strong>
                Time
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
          {/* category, challenge name, solve time (ago), points */}
          {solves.map((solve) => (
            <div key={solve.id} className="flex flex-row w-full px-4">
              <span className="w-1/4 shrink-0">
                {solve.category}
              </span>
              <span className="w-1/4 shrink-0">
                {solve.name}
              </span>
              <span className="w-1/4 shrink-0">
                {time.formatRelativeTime(solve.createdAt)}
              </span>
              <span className="w-1/4 shrink-0">
                {solve.points}
              </span>
            </div>
          ))}
        </div>
      </span>
    </div>
  )
}

export function TeamTokenPanel({ teamToken }: { teamToken: string }) {
  const [visible, setVisible] = useState(false);
  const [teamUrl, setTeamUrl] = useState<string>(teamToken);
  
  useEffect(() => {
    setTeamUrl(`${location.origin}/login?token=${encodeURIComponent(teamToken)}`);
  }, [teamToken]);

  const onCopyClick = () => {
    if (navigator.clipboard) {
      try {
        navigator.clipboard.writeText(teamUrl).then(() => {
          toast.success("Copied team invite URL to clipboard");
        });
      } catch { }
    }
  };

  return (
    <div className="panel flex flex-col gap-4">
      <p className="text-2xl font-bold">
        Team Invite
      </p>
      <p>
        Send this invite URL to your teammates so they can log in.
      </p>
      <div className="flex flex-row gap-4">
        <ArrowButton direction="hidden" onClick={onCopyClick}>
          Copy
        </ArrowButton>
        <ArrowButton direction="hidden" onClick={() => setVisible(!visible)}>
          {visible ? "Hide" : "Show" }
        </ArrowButton>
      </div>
      <p className={`bg-surface-main text-lg select-all ${visible ? "" : "hidden"}`}>
        <code>{teamUrl}</code>
      </p>
    </div>
  )
}

export function LogOutButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogOutClick = () => {
    setIsModalOpen(true);
  }
  const handleConfirmLogOut = () => {
    logout();
    router.push("/");
  }
  return (
    <>
      <ArrowButton disabled={isModalOpen} direction="e" onClick={handleLogOutClick}>
        Log out
      </ArrowButton>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="panel flex flex-col m-4 gap-4">
          <p>
            Are you sure you want to log out? You will only be logged out of the 
            current device.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <ArrowButton direction="w" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ArrowButton>
            <ArrowButton direction="e" onClick={handleConfirmLogOut}>
              Log out
            </ArrowButton>
          </div>
        </div>
      </Modal>
    </>
  )
}

interface UpdateTeamPanelProps {
  name: string;
  email: string;
  divisionId: string;
  allowedDivisions?: string[];
  onUpdate: (props: {
    name?: string,
    email?: string,
    divisionId?: string,
    ctfTimeId?: string
  }) => void;
}

export function UpdateTeamPanel({
  name: oldName,
  email: oldEmail,
  divisionId: oldDivision,
  allowedDivisions,
  onUpdate
}: UpdateTeamPanelProps) {
  // const requestRecaptchaCode = useRecaptcha("setEmail");
  const [name, setName] = useState(oldName);
  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState(oldEmail);
  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [divisionId, setDivisionId] = useState(oldDivision);
  const handleSetDivisionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivisionId(e.target.value);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    let updated = false;
    if (name != oldName || divisionId != oldDivision) {
      updated = true;
      setIsButtonDisabled(true);
      const res = await updateAccount({
        name: oldName === name ? undefined : name,
        division: oldDivision === divisionId ? undefined : divisionId,
      });
      setIsButtonDisabled(false);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Profile updated");
      onUpdate({
        name: res.data.user.name,
        divisionId: res.data.user.division,
      });
    }
    let res;
    if (email != oldEmail) {
      updated = true;
      setIsButtonDisabled(true);
      if (email === "") {
        setIsButtonDisabled(true);
        res = await deleteEmail();
      } else {
        // const recaptchaCode = await requestRecaptchaCode?.();
        const recaptchaCode = undefined;
        setIsButtonDisabled(true);
        res = await updateEmail({
          email,
          recaptchaCode,
        });
      }
      setIsButtonDisabled(false);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.data);
      onUpdate({
        email: email,
      });
    }
    if (!updated) {
      toast("Nothing to update!");
    }
  };

  return (
    <div className="panel flex flex-col gap-4">
      <p className="text-2xl font-bold">
        Update Team
      </p>
      <p>
      This will change how your team appears on the scoreboard. 
      You may only change your team&apos;s name once every 10 minutes.
      </p>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => handleUpdate(e)}
      >
        <label className="flex flex-col gap-1">
          <span className="text-lg font-semibold">
            Team Name
          </span>
          <Input
            className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
            autoComplete="username"
            autoCorrect="off"
            autoCapitalize="off"
            name="name"
            placeholder="Enter new team name here"
            maxLength={64}
            minLength={2}
            type="text"
            value={name}
            onChange={handleSetName}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-lg font-semibold">
            Email
          </span>
          <Input
            className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            name="email"
            placeholder="Enter new email here"
            type="email"
            value={email}
            onChange={handleSetEmail}
          />
        </label>
        {/* TODO: Division select dropdown */}
        <ArrowButton className="mt-4" direction="n" type="submit" disabled={isButtonDisabled}>
          Update
        </ArrowButton>
      </form>
    </div>
  )
}

export function ProfileContext() {
  const params = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<ProfileData | null>(null);

  
  const uuid = params.get("id")?.toLowerCase();
  const isPrivate = uuid == null || uuid == "me";
  // const division = config.divisions[divisionId];

  useEffect(() => {
    if (isPrivate) {
      privateProfile().then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          setData(res.data);
        }
        setLoaded(true);
      })
    } else {
      publicProfile(uuid).then((res) => {
        if (res.error) {
          toast.error("Profile not found");
        } else {
          setData(res.data);
        }
        setLoaded(true);
      })
    }
  }, [uuid, isPrivate]);

  if (!loaded) {
    return (
      <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
        <p className="font-bold text-4xl">
          Loading...
        </p>
      </div>
    )
  }
  if (error != null) {
    return (
      <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
        <h1 className="font-bold text-4xl">
          Error
        </h1>
        <p>{error}</p>
      </div>
    )
  }
  if (data !== null) {
    const {
      name,
      email,
      divisionId,
      score,
      solves,
      teamToken,
      ctftimeId,
      allowedDivisions,
    } = data;
    // const divisionPlace = strings.placementString(data.divisionPlace)
    const globalPlace = strings.placementString(data.globalPlace); 
    const onProfileUpdate = (props: {
      name?: string,
      email?: string,
      divisionId?: string,
      ctfTimeId?: string
    }) => {
      setData({
        ...data,
        ...props
      })
    };
    return (
      <>
        <div className="flex flex-col lg:flex-row min-w-0 grow-0 shrink-0 gap-4 lg:gap-8 break-words w-full">
          {isPrivate ? (
            <aside className="flex flex-col gap-4 lg:gap-8 lg:basis-1/3 grow-0 shrink-0 min-w-0 order-last lg:order-first">
              <TeamTokenPanel teamToken={data.teamToken} />
              <UpdateTeamPanel {...{ name, email, divisionId, allowedDivisions, onUpdate: onProfileUpdate } } />
              <div className="panel flex flex-col gap-4">
                <LogOutButton />
              </div>
            </aside>
          ) : null}
          <div className={`flex flex-col gap-4 lg:gap-8 lg:basis-2/3 w-full ${isPrivate ? "" : "max-w-prose mx-auto"} grow-0 shrink-0 min-w-0`}>
            <TeamSummaryPanel {...{name, score, globalPlace, ctftimeId, isPrivate}} />
            <SolvesPanel solves={solves} />
          </div>
        </div>
        <Footer />
      </>
    )
  }
  return <></>
}