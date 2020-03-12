import React from 'react';
import moment from 'moment';
import { TwoWeeksLineChart } from '../SimpleLineChart/TwoWeeksLineChart';
import { getByQueryId } from '../../services/azureDevOpsService';
import { WidgetHeader } from './WidgetHeader';


export class LastTwoWeeksWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workItems: [] };
    }

    groupByItemType(workItems) {
        let dates = getLastTwoWeeks();
        workItems.map(groupByDateAndType);

        const filteredDates = dates.filter(d => d.workItems.length > 0)
        return filteredDates;

        function groupByDateAndType(value, index, array) {
            let d = moment(value.fields.ClosedDate.split('T')[0]);
            let momentDate = d.format("YYYY-M-D");
            let date = dates.find(arr => arr.date === momentDate)
            if(date){
                    switch(value.fields.WorkItemType){
                        case "Tech Task":
                            date.techTask++;
                            break;
                        case "Bug":
                            date.bug++;
                            break;
                        case "User Story":
                            date.userStory++;
                            break;
                        case "Feature Fix":
                            date.featureFix++;
                            break;
                        default:
                            date.total++;
                    }
                    date.total++;
                }
                date.workItems.push(value);
            }

        function getLastTwoWeeks() {
            let dates = [];
            for (let i = 14; i > -1; --i){
                let d = moment().subtract(i, 'days');
                dates.push({ 
                    xAxisKey: d.format('D/M'),
                    date: d.format('YYYY-M-D'),
                    workItems: [],
                    bug: 0,
                    featureFix: 0,
                    techTask: 0,
                    userStory: 0,
                    total: 0
                });
            }
            return dates;
        }
    }

    componentDidMount() {
        getByQueryId(this.props.azureDevopsProject, this.props.queryId)
            .then(workItems => {
                this.setState({
                    workItems: this.groupByItemType(workItems)
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryId !== prevProps.queryId) {
            getByQueryId(this.props.azureDevopsProject, this.props.queryId)
                .then(workItems => {
                    this.setState({
                        workItems: this.groupByItemType(workItems),
                        queryId: this.props.queryId
                    });
                });
        }
    }

    render() {
        return (
            <div
                style={this.props.style}
                className="widget"
                id={this.props.id}
                key={this.props.id.toString()}
            >
                <WidgetHeader style={{ zIndex: 10 }} text={this.props.header}></WidgetHeader>
                <TwoWeeksLineChart
                    style={{ zIndex: 0 }}
                    size={this.props.size}
                    data={this.state.workItems}
                    dataColors={this.props.style.dataColors}>
                </TwoWeeksLineChart>
            </div>
        );
    }
}