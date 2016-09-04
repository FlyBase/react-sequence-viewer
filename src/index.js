import React, {PropTypes, Component} from 'react';

import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
// See nwb.config.js for some webpack magic that allows this to work.
import Sequence from 'sequence-viewer';

export default class ReactSequenceViewer extends Component { 
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        // Initialize the sequence-viewer object.
        this._seqObj = new Sequence(this.props.sequence);
        this._div = null;
    }

    // Function to call the render function of sequence-viewer.
    // You can override existing props by passing an object with key value
    // pairs to override existing props.
    // e.g.
    // callRender({toolbar: false})
    // would override the existing toolbar setting.
    callRender(newProps = {}) {
        // Read in div from private variable.
        const div = this._div;
        //Render div if it is not null.
        if (div != null) {
            this._seqObj.render('#' + div.id,{...this.props,...newProps});
            this._seqObj.coverage(this.props.coverage);
            this._seqObj.addLegend(this.props.legend);
        }
    }

    // When the component mounts, add a change listenver to the document
    // and call render.  We attach the change listener here becuase
    // jQuery events don't see to bubble up through React properly.
    // Thus, when a user toggles the charsPerLine drop down menu.
    // the event is handled by jQuery, but not seen by React when the
    // listener is attached at the component div level.
    // Attaching it to the document seems to work.
    componentDidMount() {
        document.addEventListener('change', this.handleChange);
        this.callRender();
        this._seqObj.onSubpartSelected(this.props.onSubpartSelected);
        this._seqObj.onMouseSelection(this.props.onMouseSelection);
    }

    // Remove the event listener when the component is unmounted.
    componentWillUnmount() {
        document.removeEventListener('change', this.handleChange);
    }

    // Function called when the user changes the charsPerLine setting via the toolbar.
    handleChange(e) {
        const elem = e.target;
        // Check that the event was triggered by the right <select> button.
        if ((" " + elem.className + " " ).indexOf( " " + this.props.seqLenClass + " " ) > -1) {
            // Call render and override the charsPerLine setting with whatever the user specified.
            this.callRender({charsPerLine: elem.value});
        }
    }

    // Render a div with the sequence-viwer widget in it.
    render() {
        const { id, sequence, className } = this.props;
        // Create the container div and store a reference to it once it is mounted
        // in the DOM.  The componentDidMount function above will then get called
        // and render the widget.
        return (
            <div className={className}>
                <div id={this.props.id} ref={(div) => this._div = div}></div>
            </div>
        );
    }
}

ReactSequenceViewer.propTypes = {
    coverage: PropTypes.arrayOf(
        PropTypes.shape({
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        color : PropTypes.string,
        bgcolor : PropTypes.string,
        underscore : PropTypes.bool,
        tooltip : PropTypes.string,
        onclick : PropTypes.func,
    })),
    legend: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                color: PropTypes.string,
                underscore: PropTypes.bool,
    })),
    seqLenClass: PropTypes.string,
    onMouseSelection: PropTypes.func,
    onSubpartSelected: PropTypes.func,
};

ReactSequenceViewer.defaultProps = {
    coverage: [],
    legend: [],
    seqLenClass: "CPLChoice",
    onMouseSelection: (elem) => {},
    onSubpartSelected: (elem) => {},
}
