import React from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = ({ timeElapsedPct }) => {
    return (
        <Progress.Bar 
            progress={timeElapsedPct} 
            width={300} 
            height={20}
            borderRadius={10}
            color={'#3F3D53'} 
            unfilledColor={'#F2F2F2'}
            animationType={'timing'}
        />
    );
};

export default ProgressBar;
