import React from 'react';
import { SingleNumber } from '../SingleNumber/SingleNumber';
import { getByQueryId } from '../../services/azureDevOpsService';
import { WidgetHeader } from './WidgetHeader'
import { Widget } from './Widget';


export class SimpleNumberWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workItems: [] };
    }

    componentDidMount() {
        getByQueryId(this.props.azureDevopsProject, this.props.queryId)
            .then(workItems => {
                this.setState({
                    workItems: workItems
                });
            }
            );
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryId !== prevProps.queryId) {
            getByQueryId(this.props.azureDevopsProject, this.props.queryId)
                .then(workItems => {
                    this.setState({
                        workItems: workItems,
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
                <SingleNumber
                    style={{ zIndex: 0 }}
                    size={this.props.size}
                    data={this.state.workItems.length}>
                </SingleNumber>
            </Widget>
        );
    }
}