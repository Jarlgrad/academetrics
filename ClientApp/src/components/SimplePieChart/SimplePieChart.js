import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="#ededed" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const SimplePieChart = (props) => {
    return (
        <PieChart 
            width={props.size.width}
            height={props.size.height}
            onMouseEnter={this.onPieEnter}
            margin={{bottom: 20, top: 40}}
            >
            <Pie
                strokeWidth={0}
                dataKey={"value"}
                data={props.data}
                cx={props.size.width/2}
                cy={(props.size.height/3)}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={props.size.height/3}
            >
                {
                    props.data.map((entry, index) => <Cell 
                        key={index} 
                        fill={props.dataColors.find(color => color.data.toLowerCase() === entry.name.toLowerCase()).color} 
                    />)
                }
            </Pie>
            <Legend
                verticalAlign="top"
                align="right"
                layout="vertical"
                fill="white"
            />
        </PieChart>
    );
}
