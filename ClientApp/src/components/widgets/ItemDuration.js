import React from 'react';
import business from 'moment-business';
import moment from 'moment';
import { ThreeDimScatterChart } from "../ScatterChart/ThreeDimScatterChart"
import { getByQueryId } from '../../services/azureDevOpsService';
import { WidgetHeader } from './WidgetHeader';

export class ItemDuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workItems: [] };
    }

    componentDidMount() {
        getByQueryId(this.props.azureDevopsProject, this.props.queryId)
            .then(workItems => {
                this.setState({
                    workItems: createScatterData(workItems)
                })
            })
    }

    render() {
        return (
            <div
                style={this.props.style}
                className="widget"
                id={this.props.id}
                key={this.props.id.toString()}
                >
                <WidgetHeader 
                    style={{ zIndex: 10 }} 
                    text="Items and their duration the past 3 months"
                    />
                <ThreeDimScatterChart
                    style={{ zIndex: 0 }}
                    size={this.props.size}
                    data={this.state.workItems}
                    />
            </div>
        );
    }
}

let allClosedDates = [];
let scatterData = {
    techTask: [],
    bug: [],
    userStory: [],
    featureFix: []
};

const createScatterData = (workItems) => {
    workItems.map(mapWorkItemsToScatterData);

    for (const itemType of Object.keys(scatterData)) {
        scatterData[itemType].sort((a,b) => {
            return a.xAxis - b.xAxis;
        });
    }

    scatterData.minDate = Math.min( ...allClosedDates );
    scatterData.maxDate = Math.max( ...allClosedDates );

    return scatterData;
}

const mapWorkItemsToScatterData = (item) => {
    let devStart;
    if (!item.fields.DevStartDate) {
        if(!item.fields.ActivatedDate) {
            console.log("Work item is missing a development start date", item);
            return;
        }
        devStart = moment(item.fields.ActivatedDate.split('T')[0]);
    } else {
        devStart = moment(item.fields.DevStartDate.split('T')[0]);
    }

    const closedDate = moment(item.fields.ClosedDate.split('T')[0]);
    let closedDateInTicks = moment(closedDate,'YYYY-MM-DD').format('X');
    let duration = business.weekDays(devStart, closedDate);

    allClosedDates.push(closedDateInTicks);

    let workItem = {
        date: closedDateInTicks,
        duration: duration,
        nItems: 1,
        id: item.id,
    };

    switch(item.fields.WorkItemType){
        case "Tech Task":
            scatterData.techTask.push(workItem);
            break;
        case "Bug":
            scatterData.bug.push(workItem);
            break;
        case "User Story":
            scatterData.userStory.push(workItem);
            break;
        case "Feature Fix":
            scatterData.featureFix.push(workItem);
            break;
        default:
            scatterData.total++;
    }
}
