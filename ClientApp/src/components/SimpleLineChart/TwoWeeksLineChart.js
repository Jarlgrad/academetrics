import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

export const TwoWeeksLineChart = (props) => {

  	return (
        <LineChart 
            width={props.size.width} 
            height={props.size.height} 
            data={props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 50}}
            onClick={this.clickEvent}
        >
        <XAxis dataKey="xAxisKey">
            <Label value={props.xAxisLabel} position="insideBottom"/>
        </XAxis>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="userStory" stroke={getColor(props.dataColors, "userStory")} />
        <Line type="monotone" dataKey="bug" stroke={getColor(props.dataColors, "bug")} />
        <Line type="monotone" dataKey="featureFix" stroke={getColor(props.dataColors, "featureFix")} />
        <Line type="monotone" dataKey="techTask" stroke={getColor(props.dataColors, "techTask")} />
        <Line type="monotone" dataKey="total" />
      </LineChart>
    );
}

const getColor = (data, itemType) => {
    return data.find(dc => dc.data === itemType).color;
}
