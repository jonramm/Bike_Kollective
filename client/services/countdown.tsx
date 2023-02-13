import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useCountdown = (startDate: string | number | Date | dayjs.Dayjs, targetDate: string | number | Date | dayjs.Dayjs) => {
  const countDownStart = dayjs(startDate).valueOf();
  const countDownEnd = dayjs(targetDate).valueOf();

  const [countDown, setCountDown] = useState(
    countDownEnd - dayjs().valueOf() // equivalent of new Date().getTime() to get current time
  );

  const [timeElapsed, setTimeElapsed] = useState(
    dayjs().valueOf() - countDownStart
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeValue = dayjs().valueOf();
      setCountDown(countDownEnd - currentTimeValue);
      setTimeElapsed(currentTimeValue - countDownStart);
    }, 1000);

    return () => clearInterval(interval); // avoid memory leaks
  }, [countDownEnd]);

  return getReturnValues(countDown, timeElapsed, countDownStart, countDownEnd);
};

const getReturnValues = (countDown: number, timeElapsed: number, countDownStart: number, countDownEnd: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  // calculate time passed in percentage
  const allowedDuration = countDownEnd - countDownStart;
  // if time has exceed total allowed duration, display 100% progress
  const timeElapsedPct = (((timeElapsed / allowedDuration)) > 1) ? 1 : (timeElapsed / allowedDuration);

  return [days, hours, minutes, seconds, timeElapsedPct];
};

export { useCountdown };
