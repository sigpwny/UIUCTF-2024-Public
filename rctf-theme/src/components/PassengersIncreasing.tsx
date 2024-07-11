"use client";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  PassengerCircle,
  PassengerTriangle,
  PassengerSquare
} from "@/components/Icons";

enum PassengerType {
  CIRCLE,
  TRIANGLE,
  SQUARE
};

interface PassengersIncreasingProps {
  limit: number;
}

const probabilities = {
  [PassengerType.CIRCLE]: 0.4,
  [PassengerType.TRIANGLE]: 0.35,
  [PassengerType.SQUARE]: 0.25
};

export default function PassengersIncreasing({ limit }: PassengersIncreasingProps) {
  const [passengers, setPassengers] = useState<PassengerType[]>([]);
  // Add a new passenger every 2-8 seconds
  useEffect(() => {
    if (passengers.length >= limit) {
      return;
    }
    const interval = setInterval(() => {
      const newPassenger = Math.random();
      let type = PassengerType.CIRCLE;
      // The first three passengers are always CIRCLE, TRIANGLE, SQUARE
      if (passengers.length < 3) {
        type = passengers.length;
      } else {
        if (newPassenger < probabilities[PassengerType.CIRCLE]) {
          type = PassengerType.CIRCLE;
        } else if (newPassenger < probabilities[PassengerType.CIRCLE] + probabilities[PassengerType.TRIANGLE]) {
          type = PassengerType.TRIANGLE;
        } else {
          type = PassengerType.SQUARE;
        }
      }
      setPassengers([...passengers, type]);
    }, Math.floor(Math.random() * 4000) + 2000);
    return () => clearInterval(interval);
  }, [passengers, limit]);
  return (
    <LayoutGroup>
      <div className="flex flex-row flex-wrap gap-2">
        {passengers.map((passenger, index) => {
          let icon;
          let ping;
          const classes = "animate-ping motion-reduce:hidden absolute top-0 justify-self-center rounded-full h-8 w-8 opacity-40 bg-surface-text";
          switch (passenger) {
            case PassengerType.CIRCLE:
              icon = <PassengerCircle height={32} className="repeated-jitter" />;
              ping = <PassengerCircle height={32} className={classes} />;
              break;
            case PassengerType.TRIANGLE:
              icon = <PassengerTriangle height={32} className="repeated-jitter" />;
              ping = <PassengerTriangle height={32} className={classes} />;
              break;
            case PassengerType.SQUARE:
              icon = <PassengerSquare height={32} className="repeated-jitter" />;
              ping = <PassengerSquare height={32} className={classes} />;
              break;
          }
          return (
            <motion.div
              key={index}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative grid"
            >
              {ping}
              {icon}
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  )
}