export const getDashboard = () => {
    return {
        team: "AW-IT",
        size: {
            rows: 4,
            cols: 4
        },
        widgets: [
            {
                id: 0,
                type: "ItemDuration",
                queryId: 'b2921595-33b6-4fe5-8162-bab18695b1e2',
                style: {
                    backgroundColor: 'rgb(40, 40, 40)',
                    padding: '10px',
                    gridColumnStart:1,
                    gridColumnEnd:5,
                    gridRowStart:1,
                    gridRowEnd:3,
                    borderColor:'rgb(25, 25, 25)',
                    dataColors: [
                        { data: 'bug', color: '#CC293D'},
                        { data: 'userStory', color: '#009CCC'},
                        { data: 'techTask', color: '#292E6B'},
                        { data: 'featureFix', color: '#F599D1'}
                    ]
                }
            },
        ]
    }
};