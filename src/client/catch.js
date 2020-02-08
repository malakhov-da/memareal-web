import React, { Component } from 'react';

export default class Catch extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, message: error.message, stack: error.stack, errorInfo: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            //TODO Добавить нормальную обработку ошибок
            return (
                <div>
                    {
                        this.state.message
                    }
                    <br />
                    {
                        this.state.stack
                    }
                    <br />
                    {
                        JSON.stringify(this.state.errorInfo)
                    }
                </div>
            );
        }

        return this.props.children;
    }
}
