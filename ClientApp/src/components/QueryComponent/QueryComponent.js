import React from 'react';

export class QueryComponent extends React.Component{
    setQueryId = () => {
        return this.props.setQueryId(this.state.input);
      }
    
      handleChange = (e) => {
        this.setState({ input: e.target.value });
      }

    render() {
        return (
            <div>
                <input size="36" onChange={this.handleChange} placeholder="Azure devOps query Id"></input>
                <button type="button" onClick={this.setQueryId}> Show me the other graphs</button>
            </div>
        )
    }
}