import React from 'react';
import moment from 'moment';
import { SimpleLineChart } from '../SimpleLineChart/SimpleLineChart';
import { getByQueryId } from '../../services/azureDevOpsService';
import { WidgetHeader } from './WidgetHeader';
import { Widget } from './Widget';


export class ThroughputPerWeekLast6MonthsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workItems: [] };
    }


    groupWorkItems(workItems) {
        let weeks = [];
        
        workItems.map(groupByWeek);
        weeks.sort((a,b) => {
            return a.sortDate - b.sortDate;
        });
        addMeanValueToWeeks(weeks);
        return weeks;

        function groupByWeek(value, index, array) {
            let itemDate = moment(value.fields.ClosedDate);
            let itemWeek = itemDate.week();

            let week = weeks.find(arr => arr.xAxisKey === itemWeek);
            if(week) {
                week.count ++;
            } else {
                week = { 
                    xAxisKey:  itemWeek,
                    sortDate: itemDate,
                    startOfWeek: itemDate.startOf('isoWeek').format("M/D/YY"),
                    endOfWeek: itemDate.endOf('isoWeek').format("M/D/YY"),
                    count: "",
                    mean: ""
                }
                weeks.push(week);
            }
        }

        function addMeanValueToWeeks(values) {
            let sum = 0;
            for (let i = 0; i < values.length; i++){
                if (values[i].count === "") continue;
                sum += values[i].count;
            }
            const mean = sum / (values.length);
            
            values.forEach(element => {
                element.mean = mean;
            });
        }
    }

    componentDidMount() {
        getByQueryId(this.props.azureDevopsProject, this.props.queryId)
            .then(workItems => {
                this.setState({
                    workItems: this.groupWorkItems(workItems)
                });
            }
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryId !== prevProps.queryId) {
            getByQueryId(this.props.azureDevopsProject, this.props.queryId)
                .then(workItems => {
                    this.setState({
                        workItems: this.groupWorkItems(workItems),
                        queryId: this.props.queryId
                    });
                }
                );
        }
    }

    render() {
        return (
            <Widget
                style={this.props.style}
                className="widget"
                id={this.props.id}
                key={this.props.id.toString()}
            >
                <WidgetHeader style={{ zIndex: 10 }} text={this.props.header}></WidgetHeader>
                <SimpleLineChart
                    style={{ zIndex: 0 }}
                    size={this.props.size}
                    data={this.state.workItems}
                    xAxisLabel="Week"
                    color={this.props.style.color}
                    dataColors={this.props.style.dataColors}
                    >
                </SimpleLineChart>
            </Widget>
        );
    }
}