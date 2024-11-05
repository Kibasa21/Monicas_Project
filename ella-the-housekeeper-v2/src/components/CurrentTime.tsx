import React, { useEffect, useState } from "react";

function formatTime(time: number): string {
  if (time > 60 * 24 * 365) {
    return Math.round(time / (60 * 24 * 365)) + " y";
  } else if (time > 60 * 24 * 30) {
    return Math.round(time / (60 * 24 * 30)) + " mo";
  } else if (time > 60 * 24) {
    return Math.round(time / (60 * 24)) + " d";
  } else if (time > 60) {
    return Math.round(time / 60) + " h";
  } else if (time >= 0) {
    return time + " m";
  } else {
    return formatTime(-time) + " ago";
  }
}

export default function RemainingTime({
  time,
  setTime,
}: {
  time: Date;
  setTime: Date;
}) {
  const timeout = Math.round(
    (new Date(time).getTime() - setTime.getTime()) / (1000 * 60)
  );
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {}, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        if (
          Math.abs(prevRemainingTime) > 10 &&
          Math.abs(timeout - prevRemainingTime) % 5 === 0
        ) {
          return prevRemainingTime - 5;
        } else if (Math.abs(prevRemainingTime) <= 10) {
          return prevRemainingTime - 1;
        } else {
          return prevRemainingTime;
        }
      });
    }, 1 * 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-left font-medium">{formatTime(remainingTime)}</div>
  );
}
