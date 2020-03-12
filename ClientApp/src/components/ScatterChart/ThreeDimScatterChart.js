import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./scatterChart.css";
import moment from 'moment';

export class ThreeDimScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <ScatterChart
        width={this.props.size.width}
        height={this.props.size.height}
        margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
      >
        <XAxis
          dataKey={'date'}
          scale='time'
          domain={[this.props.data.minDate, this.props.data.maxDate]}
          tickFormatter={(unixTime) => moment.unix(unixTime).format('D/M')}
          tick={<CustomizedAxisTick/>}
          type='number'
          interval={0}
        />

        <YAxis dataKey={'duration'} unit=' days' />
        <ZAxis dataKey={'nItems'} range={[300,550]} name='released' />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend height={40} verticalAlign='top'/>
        <Scatter name='bug' data={this.props.data.bug} fill='#CC293D' shape="circle" onClick={clickEvent} />
        <Scatter name='userStory' data={this.props.data.userStory} fill='#009CCC' shape="square" onClick={clickEvent}/>
        <Scatter name='techTask' data={this.props.data.techTask} fill='#292E6B' shape="triangle" onClick={clickEvent}/>
        <Scatter name='featureFix' data={this.props.data.featureFix} fill='#F599D1' shape="diamond" onClick={clickEvent}/>
      </ScatterChart>
    );
  }
}

const clickEvent = event => {
  console.log(event.payload);
}

const CustomizedAxisTick = (props) => {
  const {x, y, payload} = props;
   return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} padding={[40,40]} textAnchor="end" fill="#666" transform="rotate(-35)">
        {moment.unix(payload.value).format('DD/MM')}
      </text>
    </g>
  );
};
