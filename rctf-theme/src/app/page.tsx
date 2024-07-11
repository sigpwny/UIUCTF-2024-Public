import UIUCTFLogo from "@/components/UIUCTF_Logo";
import Footer from "@/components/Footer";
import DevProfiles from "@/components/DevProfiles";
import SponsorProfiles from "@/components/SponsorProfiles";
import {
  Discord,
  FluentClock,
  FluentDataLine,
  FluentGrid,
  FluentPeople
} from "@/components/Icons";

import PassengersIncreasing from "@/components/PassengersIncreasing";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="relative -z-10 w-full lg:w-2/3 xl:w-1/2">
          <h1>
            <UIUCTFLogo />
          </h1>
        </div>
        <div className="panel theme-inverted lg:max-w-prose">
          <p className="text-xl">
            UIUCTF is an annual capture-the-flag competition hosted 
            by <a href="https://sigpwny.com/" target="_blank" rel="noopener noreferrer">SIGPwny</a>, 
            the cybersecurity club at the University of Illinois Urbana-Champaign (UIUC).
          </p>
        </div>
        <div id="scenario" className="panel flex flex-col lg:flex-row gap-4">
          <div className="max-w-prose flex flex-col gap-2">
            <h2 className="text-4xl font-bold">Scenario</h2>
            <p className="text-xl">
              A massive outage is affecting the entire transit system! 
              The SIGPwny Transit Authority has issued an emergency call 
              to CTF teams for help with restoring service.
              Solve challenges to fix stations and deliver as many 
              passengers as you can!
            </p>
          </div>
          <div className="">
            <PassengersIncreasing limit={25} />
          </div>
        </div>
        <div id="format" className="grid lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="panel flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Format</h2>
            <ul className="">
              <li className="flex flex-row gap-2 text-xl items-center">
                <FluentGrid />
                <p>Jeopardy</p>
              </li>
              <li className="flex flex-row gap-2 text-xl items-center">
                <FluentClock />
                <p>48 hours</p>
              </li>
              <li className="flex flex-row gap-2 text-xl items-center">
                <FluentPeople />
                <p>Unlimited team size</p>
              </li>
              <li className="flex flex-row gap-2 text-xl items-center">
                <FluentDataLine />
                <p>Dynamic scoring</p>
              </li>
            </ul>
            <span className="text-lg">
              The flag format is <code className="inline">uiuctf&#123;[a-zA-Z0-9_&-]+&#125;</code>
            </span>
            <p>
              The competition will run from: <br />
              <code className="text-lg">2024-06-29 00:00 UTC</code> <br />to <br /><code className="text-lg">2024-07-01 00:00 UTC</code>.
            </p>
          </div>
          <div id="prizes" className="panel flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Prizes</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <ul className="flex flex-col basis-1/2 gap-2 font-semibold">
                <li className="flex flex-row gap-1">
                  <p className="text-3xl">🥇 $2048</p>
                  <p className="text-md">USD</p>
                </li>
                <li className="flex flex-row gap-1">
                  <p className="text-3xl">🥈 $1024</p>
                  <p className="text-md">USD</p>
                </li>
                <li className="flex flex-row gap-1">
                  <p className="text-3xl">🥉 $512</p>
                  <p className="text-md">USD</p>
                </li>
              </ul>
              <ul className="flex flex-col basis-1/2 gap-2">
                <li className="flex flex-col">
                  <span className="flex flex-row gap-1 font-semibold">
                    <p className="text-3xl">🎗️ $256</p>
                    <p className="text-md">USD</p>
                  </span>
                  <p className="leading-5">for 4th and 5th place</p>
                </li>
                <li className="flex flex-col">
                  <span className="flex flex-row gap-1 font-semibold">
                    <p className="text-3xl">🎉 $128</p>
                    <p className="text-md">USD</p>
                  </span>
                  <p className="leading-5">for 6th to 10th place</p>
                </li>
              </ul>
            </div>
            <p className="text-lg">
              Plus, a prize pool of $1500+ USD for writeups!
            </p>
            <p className="text-sm italic">
              Note: In order to be eligible for cash prizes totaling over $600, 
              you must be a tax entity in the United States. If you are not, 
              you can choose to split the prize and/or donate to charity.
            </p>
          </div>
          <div className="panel flex flex-col gap-4">
            <h2 className="flex flex-row gap-4 text-4xl items-center font-bold">
              <Discord />
              <p>Discord</p>
            </h2>
            <p className="text-xl">
              Join our <a href="https://discord.gg/PytGqjq" target="_blank" rel="noopener noreferer">Discord server</a>!
            </p>
            <p>
              We utilize a Discord bot application for support tickets. Please 
              send a direct message to <a href="discord://-/users/722236701979967508" target="_blank" rel="noopener norefer">
              <strong>Modmail</strong></a> (<code>UIUCTF Modmail#2374</code>) in 
              order to create a ticket. Do not DM challenge developers or admins directly.
            </p>
          </div>
          <div id="rules" className="panel flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Rules</h2>
            <ol className="grid grid-cols-1 gap-4 list-decimal ml-5">
              <li>
                <strong>Don&apos;t cheat.</strong>
                <p>
                  Each person can only compete on one team. Sharing 
                  flags or solves between teams will lead to immediate 
                  disqualification.
                </p>
              </li>
              <li>
                <strong>Don&apos;t attack the infrastructure.</strong>
                <p>
                  This includes brute-force attacks and tools that can generate excessive 
                  amounts of traffic, such as nmap, dirbuster, etc. unless otherwise specified.
                </p>
              </li>
              <li>
                <strong>No flag hoarding or flag dumping!</strong>
                <p>
                  It&apos;s not cool. We require teams to submit flags as they find them.
                </p>
              </li>
            </ol>
            <i>
              Also, don&apos;t do anything orange and below on 
              the <a href="https://twitter.com/gf_256/status/1206393845497376768/" target="_blank" rel="noopener noreferrer">CTF tactics iceberg</a>.
            </i>
          </div>
        </div>
        <div id="sponsors" className="panel-nolinks flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Sponsors</h2>
          <SponsorProfiles />
        </div>
        <div className="panel-nolinks">
          <h1 className="text-4xl font-bold">UIUCTF Dev Team</h1>
          <DevProfiles />
        </div>
      </div>
      <Footer />
    </>
  );
}
