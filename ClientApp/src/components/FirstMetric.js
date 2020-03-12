import React, { Component } from 'react';

export class FirstMetric extends Component {

    constructor(props) {
        super(props);
        this.state = { result: "" };

        fetch('api/Metrics')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ result: data.greeting });
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.result}, this is metric world!</h1>
            </div>
                
        )
    }

}