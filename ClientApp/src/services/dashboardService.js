export const getDashboard = dashboard => {
    if (dashboard === "Rymdimperiet") {
        return {
            team: "Rymdimperiet",
            size: {
                rows: 4,
                cols: 4
            },
            widgets: [
                {
                    id: 0,
                    type: "PieChartWidget",
                    header: "Completed Work Last 2 Weeks",
                    azureDevopsProject: 'AW-IT',
                    queryId: 'eacb53bf-1776-4c3f-9346-4a9b71f5a540',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        gridRowStart: 1,
                        gridRowEnd: 3,
                        borderColor: 'rgb(25, 25, 25)',
                        dataColors: [
                            { data: 'bug', color: '#CC293D' },
                            { data: 'user story', color: '#009CCC' },
                            { data: 'feature fix', color: '#F599D1' },
                            { data: 'tech task', color: '#292E6B' },
                            { data: 'total', color: '#ba0b0b' }
                        ]
                    }
                },
                {
                    id: 1,
                    type: "SimpleNumberWidget",
                    header: "Hyper Speed Count",
                    azureDevopsProject: 'AW-IT',
                    queryId: 'd343be7b-6600-49dc-836c-caed522617ad',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 3,
                        gridColumnEnd: 4,
                        gridRowStart: 1,
                        gridRowEnd: 2,
                        borderColor: 'rgb(25, 25, 25)'
                    }
                },
                {
                    id: 2,
                    type: "ThroughputPerWeekLast6MonthsWidget",
                    azureDevopsProject: 'AW-IT',
                    queryId: '10af5363-4b14-4916-991c-1dc6f8a34bb4',
                    header: 'Throughput last 6 months (per week)',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 3,
                        gridColumnEnd: 5,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                        borderColor: 'rgb(25, 25, 25)',
                        color: 'rgb(255, 255, 255, 0.5)',
                        dataColors: [
                            { data: 'count', color: '#225b79' },
                            { data: 'mean', color: '#bf7c2d' }
                        ]
                    }
                },
                {
                    id: 3,
                    type: "ItemDuration",
                    azureDevopsProject: 'AW-IT',
                    queryId: '5306340b-4044-4c66-ac10-457b0eab0f40',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 1,
                        gridColumnEnd: 5,
                        gridRowStart: 3,
                        gridRowEnd: 5,
                        borderColor: 'rgb(25, 25, 25)',
                        dataColors: [
                            { data: 'bug', color: '#CC293D' },
                            { data: 'userStory', color: '#009CCC' },
                            { data: 'techTask', color: '#292E6B' },
                            { data: 'featureFix', color: '#F599D1' }
                        ]
                    }
                },
                {
                    id: 4,
                    type: "LastTwoWeeksWidget",
                    azureDevopsProject: 'AW-IT',
                    queryId: 'eacb53bf-1776-4c3f-9346-4a9b71f5a540',
                    header: 'Completed Work Last 2 Weeks',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 1,
                        gridColumnEnd: 5,
                        gridRowStart: 6,
                        gridRowEnd: 8,
                        borderColor: 'rgb(25, 25, 25)',
                        dataColors: [
                            { data: 'bug', color: '#CC293D' },
                            { data: 'userStory', color: '#009CCC' },
                            { data: 'techTask', color: '#292E6B' },
                            { data: 'featureFix', color: '#F599D1' },
                            { data: 'total', color: '#ba0b0b' }
                        ]
                    }
                }
            ]
        };
    }
    else {
        return {
            team: "Client Relations",
            size: {
                rows: 4,
                cols: 4
            },
            widgets: [
                {
                    id: 0,
                    type: "ThroughputPerWeekLast6MonthsWidget",
                    azureDevopsProject: 'Innovation',
                    queryId: '73f7ed0b-0ecc-48d9-b450-518206279db7',
                    header: 'Throughput last 6 months (per week)',
                    style: {
                        backgroundColor: 'rgb(40, 40, 40)',
                        padding: '10px',
                        gridColumnStart: 1,
                        gridColumnEnd: 5,
                        gridRowStart: 1,
                        gridRowEnd: 3,
                        borderColor: 'rgb(25, 25, 25)',
                        color: 'rgb(255, 255, 255, 0.5)',
                        dataColors: [
                            { data: 'count', color: '#225b79' },
                            { data: 'mean', color: '#bf7c2d' }
                        ]
                    }
                }
            ]
        }
    }
}