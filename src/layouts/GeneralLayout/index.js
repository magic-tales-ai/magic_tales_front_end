import React, { Component } from 'react';
import withRouter from "../../components/withRouter";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { changeLayoutMode } from '../../redux/actions';
import { websocketConnect } from '../../redux/actions';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    componentDidMount() {
        var getLayoutMode = localStorage.getItem("layoutMode");
        this.props.changeLayoutMode(getLayoutMode);

        if (getLayoutMode) {
            this.props.changeLayoutMode(getLayoutMode);
        } else {
            this.props.changeLayoutMode(this.props.layout.layoutMode);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

Index.propTypes = {
    layoutMode: PropTypes.any,
    websocketConnect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { layoutMode, Websocket } = state;
    return { layoutMode, Websocket };
};

export default withRouter(connect(mapStateToProps, { changeLayoutMode, websocketConnect })(Index));