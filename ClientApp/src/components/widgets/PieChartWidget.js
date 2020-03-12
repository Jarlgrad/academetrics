import React from 'react';
import { SimplePieChart } from '../SimplePieChart/SimplePieChart';
import { getByQueryId } from '../../services/azureDevOpsService';
import { Widget } from './Widget';
import { WidgetHeader } from './WidgetHeader';


export class PieChartWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workItems: [] };
    }

    groupByItemType(workItems) {
        const groups = [];
        for(let i = 0; i < workItems.length; ++i) {
            const fields = workItems[i].fields;
            let existingGroup = groups.find(g => g.name === fields.WorkItemType);
            if(!existingGroup) {
                existingGroup = {
                    name: workItems[i].fields.WorkItemType,
                    value: 0
                };
                groups.push(existingGroup);
            }
            ++existingGroup.value;
        }
    
        return groups;
    }

    componentDidMount() {
        getByQueryId(this.props.azureDevopsProject, this.props.queryId)
            .then(workItems => {
                this.setState({
                    workItems: this.groupByItemType(workItems)
                });
            }
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryId !== prevProps.queryId) {
            getByQueryId(this.props.azureDevopsProject, this.props.queryId)
                .then(workItems => {
                    this.setState({
                        workItems: this.groupByItemType(workItems),
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
                <SimplePieChart
                    style={{ zIndex: 0 }}
                    dataColors={this.props.style.dataColors}
                    size={this.props.size}
                    data={this.state.workItems}>
                </SimplePieChart>
            </Widget>
        );
    }
}