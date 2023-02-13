import dayjs from 'dayjs';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useCountdown } from '../services/countdown';
import DateTimeDisplay from './DateTimeDisplay';
import Loading from './Loading';
import ProgressBar from './ProgressBar';

const ExpiredNotice = () => {
  return (
    <View style={styles.showExpired}>
      <Text>Expired!</Text>
    </View>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <View style={styles.showCounter}>
        <DateTimeDisplay value={days} />
        <Text>:</Text>
        <DateTimeDisplay value={hours} />
        <Text>:</Text>
        <DateTimeDisplay value={minutes} />
        <Text>:</Text>
        <DateTimeDisplay value={seconds} />
    </View>
  );
};

const CountdownTimer = ({ startDate, targetDate }) => {
  const [days, hours, minutes, seconds, timeElapsedPct] = useCountdown(startDate, targetDate);

  if (days + hours + minutes + seconds > 0) {
    return (
      <View>
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        <ProgressBar timeElapsedPct={timeElapsedPct} />
      </View>
      
    );
  } else if (dayjs(startDate).valueOf() === dayjs(targetDate).valueOf()) {
    console.log("Loading");
    return(
      <View>
        <Loading />
      </View>
    );
  } else {
    return (
      <View>
        <ExpiredNotice />
        <ProgressBar timeElapsedPct={timeElapsedPct} />
      </View>
    );
  }
};

const styles  = StyleSheet.create({
  showCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }, 
  showExpired: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CountdownTimer;
