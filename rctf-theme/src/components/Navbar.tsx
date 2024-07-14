"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowLink, type ArrowDirection } from "@/components/Button";
import DataWidget from "@/components/DataWidget";

interface NavLink {
  href: string;
  label: string;
  directions: ArrowDirection[];
}

const navlinks: NavLink[] = [
  {
    href: "/",
    label: "Home",
    directions: ["none", "n", "e", "ne"]
  },
  {
    href: "/scoreboard",
    label: "Scoreboard",
    directions: ["s", "none", "se", "e"]
  },
  {
    href: "/register",
    label: "Register",
    directions: ["w", "nw", "none", "n"]
  },
  {
    href: "/login",
    label: "Login",
    directions: ["sw", "w", "s", "none"]
  },
]

const navlinks_authed: NavLink[] = [
  {
    href: "/",
    label: "Home",
    directions: ["none", "n", "e", "ne"]
  },
  {
    href: "/scoreboard",
    label: "Scoreboard",
    directions: ["s", "none", "se", "e"]
  },
  {
    href: "/challenges",
    label: "Challenges",
    directions: ["w", "nw", "none", "n"]
  },
  {
    href: "/profile",
    label: "Profile",
    directions: ["sw", "w", "s", "none"]
  },
]

export function setSlideDirection(direction: ArrowDirection) {
  const style = document.documentElement.style;
  const disable_fade = direction === "none" || direction === "hidden";
  style.setProperty(
    "--viewtransitionfade-to", disable_fade ? "none" : "fade-out",
  )
  style.setProperty(
    "--viewtransition-to", `slide-to-${direction}`
  );
  style.setProperty(
    "--viewtransitionfade-from", disable_fade ? "none" : "fade-in",
  );
  style.setProperty(
    "--viewtransition-from", `slide-to-${direction}-from`
  );
}

export default function Navbar() {
  const curr = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const used_navlinks = loggedIn ? navlinks_authed : navlinks;
  const curr_navlink = used_navlinks.find(({ href }) => href === curr);
  useEffect(() => {
    setLoggedIn(typeof window !== 'undefined'
      ? window?.localStorage?.getItem("token") !== null
      : false);
  }, [curr]);
  return (
    <div id="navbar" className="sticky top-0 left-0 right-0 z-10 flex flex-col pointer-events-none">
      <noscript>
        <div className="bg-trainline-red text-white p-2 text-center text-with-links pointer-events-auto">
          JavaScript is required for this site to function correctly.
          <br />
          Alternatively, you can try using the <a href={process.env.rctfApiBaseUrl} target="_blank" rel="noopener noreferrer">stock rCTF interface</a>.
        </div>
      </noscript>
      <span className="p-4 flex flex-row justify-between pointer-events-auto">
        <nav className="inline-flex flex-col gap-1">
          {used_navlinks.map(({ href, label }, idx) => (
            <ArrowLink
              key={idx}
              href={href}
              onClick={(e) => setSlideDirection(curr_navlink ? curr_navlink.directions[idx] : "none")}
              direction={curr_navlink ? curr_navlink.directions[idx] : "none"}
              isActive={href === curr}
              blur
            >
              {label}
            </ArrowLink>
          ))}
        </nav>
        <DataWidget />
      </span>
    </div>
  )
}