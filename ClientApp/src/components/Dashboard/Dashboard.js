import React from 'react';
import { PieChartWidget } from '../widgets/PieChartWidget';
import { SimpleNumberWidget } from '../widgets/SimpleNumberWidget';
import { LastTwoWeeksWidget } from '../widgets/LastTwoWeeksWidget';
import { ThroughputPerWeekLast6MonthsWidget } from '../widgets/ThroughputPerWeekLast6MonthsWidget';
import { ItemDuration } from '../widgets/ItemDuration';
import './dashboard.css';

export class Dashboard extends React.Component {
    renderWidget = (widgetConf) => {
        const widgetSize = {
            cols: widgetConf.style.gridColumnEnd - widgetConf.style.gridColumnStart,
            rows: widgetConf.style.gridRowEnd - widgetConf.style.gridRowStart
        };
        const size = calcWidgetSize(this.props.size, widgetSize);

        switch (widgetConf.type) {
            case "PieChartWidget":
                return pieChartWidget(widgetConf, size);
            case "SimpleNumberWidget":
                return simpleNumberWidget(widgetConf, size);
            case "LastTwoWeeksWidget":
                return lastTwoWeeksWidget(widgetConf, size);
            case "ThroughputPerWeekLast6MonthsWidget":
                return throughputPerWeekLast6MonthsWidget(widgetConf, size);
            case "ItemDuration":
                return itemDuration(widgetConf, size);
            default:
                return "";
        }
    }

    render() {
        return (
            <div className="grid">
                {this.props.widgets.map(this.renderWidget)}
            </div>);
    }
}

const calcWidgetSize = (dashboardSize, widgetSize) => {
    const height = (1080 / dashboardSize.rows) * widgetSize.rows;
    const width = (1920 / dashboardSize.cols) * widgetSize.cols;

    return {
        width: width,
        height: height
    };
}

const pieChartWidget = (widgetConf, size) => {
    return ( 
        <PieChartWidget
            key={widgetConf.id} id={widgetConf.id}
            azureDevopsProject={widgetConf.azureDevopsProject}
            queryId={widgetConf.queryId}
            size={size}
            style={widgetConf.style}
            type={widgetConf.type}
            header={widgetConf.header}
            />
        );
}

const simpleNumberWidget = (widgetConf, size) => {
    return (
        <SimpleNumberWidget
            key={widgetConf.id} id={widgetConf.id}
            azureDevopsProject={widgetConf.azureDevopsProject}
            queryId={widgetConf.queryId}
            size={size}                    
            style={widgetConf.style}
            type={widgetConf.type}               
            header={widgetConf.header}     
        />
    );
}

const lastTwoWeeksWidget = (widgetConf, size) => {
    return ( 
        <LastTwoWeeksWidget
            key={widgetConf.id} id={widgetConf.id}
            azureDevopsProject={widgetConf.azureDevopsProject}
            queryId={widgetConf.queryId}
            size={size}
            style={widgetConf.style}
            type={widgetConf.type}
            header={widgetConf.header}
            />
        );
}

const throughputPerWeekLast6MonthsWidget = (widgetConf, size) => {
    return (
        <ThroughputPerWeekLast6MonthsWidget
            key={widgetConf.id} id={widgetConf.id}
            azureDevopsProject={widgetConf.azureDevopsProject}
            queryId={widgetConf.queryId}
            size={size}                    
            style={widgetConf.style}
            type={widgetConf.type}               
            header={widgetConf.header}     
        />
    );
}

const itemDuration = (widgetConf, size) => {
    return (
        <ItemDuration
            key={widgetConf.id} id={widgetConf.id}
            azureDevopsProject={widgetConf.azureDevopsProject}
            queryId={widgetConf.queryId}
            size={size}                    
            style={widgetConf.style}
            type={widgetConf.type}
        />
    )
}