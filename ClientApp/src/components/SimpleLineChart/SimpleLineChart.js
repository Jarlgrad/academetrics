import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { getWorkItemsByQuery } from "../../services/azureDevOpsService";

export class SimpleLineChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    };

    clickEvent = event => {
        let queryDates = {
            startDate: event.payload.startOfWeek,
            endDate: event.payload.endOfWeek
        }
        let query = this.buildWorkItemQuery(queryDates, "Rymdimperiet");
        getWorkItemsByQuery(query).then(workItems => {
            console.log("this weeks closed items:", workItems);
            // TODO: PRESENTERA workItems i en modal!! 
        })
    };

    render(){
        return (
            <LineChart 
                width={this.props.size.width} 
                height={this.props.size.height} 
                data={this.props.data}
                margin={{top: 5, right: 30, left: 20, bottom: 70}}
            >
            <XAxis dataKey="xAxisKey">
                <Label 
                    value={this.props.xAxisLabel} 
                    offset={-5} 
                    position="insideBottomLeft"
                    fill={this.props.color}
                />
            </XAxis>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />


            <Line type="monotone" dataKey="count" stroke={ this.props.dataColors.find(dc => dc.data === "count").color} activeDot={{onClick:this.clickEvent, r: 7}}/>
            <Line type="monotone" dataKey="mean" stroke={ this.props.dataColors.find(dc => dc.data === "mean").color} strokeDasharray="5 5 5 5" />
          </LineChart>
        );
    }

    
    buildWorkItemQuery = (dates, team) => {
        return `
Select [System.Id], [System.Title]
From WorkItems
Where [Closed Date] > '${dates.startDate}'
AND [Closed Date] < '${dates.endDate}'
AND [Kanban-Copyfortesting.Team] = '${team}'
AND [System.State] = 'Closed'`;
    }
}

// TODO: dot onClick triggar att visa upp en modal med mer detaljerad info för den veckan
// workitems, context switches, pie chart