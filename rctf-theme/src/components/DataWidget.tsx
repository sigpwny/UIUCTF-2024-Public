"use client";
import { useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ConfigContext } from "./ConfigProvider";
import { FluentClock } from "./Icons";

enum TimerStatus {
  UNINITIALIZED,
  BEFORE_START,
  DURING,
  AFTER_CLOSE
}

interface Timer {
  status: TimerStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  time_start: number;
  time_close: number;
}

function Countdown({ time_start, time_close }: CountdownProps) {
  const [timer, setTimer] = useState<Timer>({
    status: TimerStatus.UNINITIALIZED,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    function tick(start: Dayjs, close: Dayjs) {
      const now = dayjs();
      let target: Dayjs;
      let status: TimerStatus;
      if (now < start) {
        target = start;
        status = TimerStatus.BEFORE_START;
      } else if (now < close) {
        target = close;
        status = TimerStatus.DURING;
      } else {
        target = now;
        status = TimerStatus.AFTER_CLOSE;
      }
      const diff = target.diff(now, "second");
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff - days * 86400) / 3600);
      const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
      const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;
      setTimer({ status, days, hours, minutes, seconds });
    }

    // Initialize countdown
    let start = dayjs.unix(time_start);
    let close = dayjs.unix(time_close);
    tick(start, close);
    setInterval(() => {
      tick(start, close);
    }, 1000);
  }, [time_start, time_close])
  function formatNumber(num: number) {
    return num.toString().padStart(2, "0");
  }
  return (
    <div className={`${timer.status === TimerStatus.UNINITIALIZED ? "opacity-0 translate-x-4" : "opacity-1 translate-x-0"} hidden sm:flex flex-row h-fit gap-2 bg-surface-main/50 backdrop-blur-xl rounded-2xl px-4 py-2 text-right transition-all hover:shadow-2xl`}>
      {timer.status === TimerStatus.AFTER_CLOSE ? (
        <p className="text-2xl font-semibold select-none">UIUCTF 2024 has ended!</p>
      ) : (
        <>
      <div className="flex flex-col select-none">
        <p className="font-semibold leading-4">
          {timer.status === TimerStatus.BEFORE_START ?
            "Starting in" : timer.status === TimerStatus.DURING ?
            "Ending in" :
            "Ended"
          }
        </p>
        <div className="flex flex-row">
          {timer.days > 0 ? (
            <>
              <div className="flex flex-col">
                <div className="text-2xl font-semibold tabular-nums">
                  {formatNumber(timer.days)}
                </div>
                <p className="text-center leading-none">
                  D
                </p>
              </div>
              <span className="text-2xl font-semibold tabular-nums">
                :
              </span>
            </>
          ) : null}
          {timer.days > 0 || timer.hours > 0 ? (
            <>
              <div className="flex flex-col">
                <div className="text-2xl font-semibold tabular-nums">
                  {formatNumber(timer.hours)}
                </div>
                <p className="text-center leading-none">
                  H
                </p>
              </div>
              <span className="text-2xl font-semibold tabular-nums">
                :
              </span>
            </>
          ) : null}
          <div className="flex flex-col">
            <div className="text-2xl font-semibold tabular-nums">
              {formatNumber(timer.minutes)}
            </div>
            <p className="text-center leading-none">
              M
            </p>
          </div>
          <span className="text-2xl font-semibold tabular-nums">
            :
          </span>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold tabular-nums">
              {formatNumber(timer.seconds)}
            </div>
            <p className="text-center leading-none">
              S
            </p>
          </div>
        </div>
      </div>
      <span className="text-[2em] content-center">
        <FluentClock />
      </span>
        </>
      )}
    </div>
  )
}

export default function DataWidget() {
  const config = useContext(ConfigContext);
  // useEffect(() => {
  //   console.log(JSON.stringify(config));
  //   console.log(config?.startTime)
  //   console.log(config?.endTime)
  // })
  // if (config === null) return null;
  // const epoch_start = config.startTime / 1000;
  // const epoch_end = config.endTime / 1000;
  const epoch_start = 1719619200000 / 1000;
  const epoch_end = 1719792000000 / 1000;
  return (
    <Countdown time_start={epoch_start} time_close={epoch_end} />
  )
}