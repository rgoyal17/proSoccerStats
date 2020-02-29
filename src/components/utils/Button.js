import React, { Component } from 'react';
import { Button } from 'reactstrap';

class MyButton extends Component {
    render() {
        return (
            <div>
                <Button id="my-btn">{this.props.text}</Button>
            </div>
        );
    }
}

export default MyButton;