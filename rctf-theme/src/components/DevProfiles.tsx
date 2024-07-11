/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

interface DevProfileProps {
  name: string;
  image: string;
  link?: string;
  tagline: string;
}

const dev_profiles: DevProfileProps[] = [
  {
    "name": "Sam Ruggerio",
    "image": "/devs/sam.png",
    "link": "https://surg.dev",
    "tagline": "CTFs! Yippeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!"
  },
  {
    "name": "CBCicada",
    "image": "/devs/CBCicada.jpg",
    "link": "https://github.com/CBCicada",
    "tagline": "I love trains."
  },
  {
    "name": "YiFei Zhu",
    "image": "/devs/yifei.jpg",
    "link": "https://github.com/zhuyifei1999/",
    "tagline": "I love infra."
  },
  {
    "name": "Cameron Asher",
    "image": "/devs/cameron.png",
    "link": "https://github.com/biggant1",
    "tagline": "I love jail."
  },
  {
    "name": "Adarsh Krishnan",
    "image": "/devs/adarsh.png",
    "link": "https://sigpwny.com/about/#:~:text=HELPER-,Adarsh%20Krishnan,-I%27m%20a%20freshman",
    "tagline": "I love transit maps."
  },
  {
    "name": "Richard",
    "image": "/devs/richard.jpg",
    "link": "https://rliu.dev/",
    "tagline": "*assembler not included."
  },
  {
    "name": "Sagnik",
    "image": "/devs/sagnik.png",
    "link": "https://github.com/RedFlame2112",
    "tagline": "Never forget your (Merkle) Roots!"
  },
  {
    "name": "Emma Hartman",
    "image": "/devs/emma.jpg",
    "link": "https://github.com/eihart123",
    "tagline": "Just here for the cookies."
  },
  {
    "name": "Louis",
    "image": "/devs/louis.png",
    "link": "https://github.com/LouisAsanaka",
    "tagline": "Entangled with the web."
  },
  {
    "name": "Pete Stenger",
    "image": "/devs/pete.jpg",
    "link": "https://github.com/reteps",
    "tagline": "0.1x developer"
  },
  {
    "name": "Ronan Boyarski",
    "image": "/devs/ronan.jpeg",
    "link": "https://tryhackme.com/p/ronanboyargmail",
    "tagline": "Yeah, I got nothing."
  },
  {
    "name": "Julius White",
    "image": "/devs/julius.png",
    "link": "https://github.com/jcw515awsm",
    "tagline": "I am root"
  },
  {
    "name": "Julie",
    "image": "/devs/julie.png",
    "link": "https://github.com/jihyeo2",
    "tagline": "infraaaaaaaaaaaahhhhhh"
  },
  {
    "name": "Spamakin",
    "image": "/devs/anakin.png",
    "link": "https://www.anakin.phd/",
    "tagline": "Currently being nerdsniped"
  },
  {
    "name": "George",
    "image": "/devs/george.png",
    "link": "https://feyor.sh/",
    "tagline": "I HATE DEBIAN! I HATE DEBIAN!"
  },
  {
    "name": "Nikhil",
    "image": "/devs/nikhil.png",
    "link": "https://www.linkedin.com/in/nikhildate/",
    "tagline": "pwn is more fun without source"
  },
  {
    "name": "Minh Duong",
    "image": "/devs/minh.jpg",
    "link": "https://whitehoodhacker.net/",
    "tagline": "I made this!"
  },
  {
    "name": "Parithimaal",
    "image": "/devs/pari.jpg",
    "link": "https://github.com/pari-thimaalk",
    "tagline": "trust the bots"
  },
  {
    "name": "Akhil",
    "image": "/devs/akhil.png",
    "link": "https://github.com/akhilb15",
    "tagline": "i'm having heaps of fun"
  },
]

function DevProfile({name, image, link, tagline}: DevProfileProps) {
  return (
    <div className="no-underline px-2 py-2 transition-transform motion-reduce:transition-none hover:scale-125" >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip-id="tooltip"
        data-tooltip-content={tagline}
        className="group flex flex-col gap-1 items-center"
      >
        <img src={image} className="rounded-full w-32 h-32" alt="" />
        <span>{name}</span>
      </a>
    </div>
  )
}

export default function DevProfiles() {
  const [profiles, setProfiles] = useState(dev_profiles);
  useEffect(() => {
    setProfiles([...dev_profiles].sort(() => Math.random() - 0.5));
  }, []);
  return (
    <div className="flex flex-row flex-wrap justify-center my-4 gap-4">
      {profiles.map((profile) => (
        <DevProfile key={profile.image} {...profile} />
      ))}
      <Tooltip
        id="tooltip"
        opacity={1}
        className="!bg-surface-panelalt !text-surface-textalt !rounded-none"
      />
    </div>
  )
}