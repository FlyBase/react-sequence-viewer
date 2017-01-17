import React, {PropTypes, Component} from 'react';
import { v4 } from 'uuid';

import Sequence from 'sequence-viewer';

export default class ReactSequenceViewer extends Component { 
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRef    = this.handleRef.bind(this);

    if (props.selection && props.selection.length > 0 && props.coverage && props.coverage.length > 0) {
      console.warn("The selection and coverage options are not compatible with each other.");
    }
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
    const { selection, ...props} = this.props;

    // Read in div from private variable.
    const div = this._div;

    //Render div if it is not null.
    if (div !== null) {
      this._seqObj.render('#' + div.id,{...props,...newProps});
      if (this.props.coverage.length > 0) this._seqObj.coverage(this.props.coverage);
      if (this.props.legend.length > 0) this._seqObj.addLegend(this.props.legend);
      if (selection.length > 0) this._seqObj.selection(...selection);
    }
  }

  // When the component mounts, add a change listenver to the document
  // and call render.  We attach the change listener here becuase
  // jQuery events don't bubble up through React due to its synthetic event
  // handling.  Thus, when a user toggles the charsPerLine drop down menu.
  // the event is handled by jQuery, but not seen by React when the
  // listener is attached at the component div level.
  // Attaching it to the document seems to work.
  componentDidMount() {
    document.addEventListener('change', this.handleChange);
    this.callRender();
    this._seqObj.onSubpartSelected(this.props.onSubpartSelected);
    this._seqObj.onMouseSelection(this.props.onMouseSelection);
  }

  // Update the sequence-viewer object if we get a new DNA sequence.
  componentWillReceiveProps(nextProps) { 
    if (this.props.sequence !== nextProps.sequence) {
      this._seqObj = new Sequence(nextProps.sequence);
    }
  }

  // Re-render if the component has updated.
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.callRender();
    }
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

  handleRef(div) {
    this._div = div;
  }

  // Render a div with the sequence-viwer widget in it.
  render() {
    const { id, sequence, className } = this.props;
    // Create the container div and store a reference to it once it is mounted
    // in the DOM.  The componentDidMount function above will then get called
    // and render the widget.
    return (
      <div className={className} id={this.props.id} ref={this.handleRef}></div>
    );
  }
}

ReactSequenceViewer.propTypes = {
  id: PropTypes.string,
  sequence: PropTypes.string.isRequired,
  className: PropTypes.string,
  selection: PropTypes.arrayOf((arr, key, compName, location, propFullName) => {
    if (arr.length !== 3) {
      return new Error(
        'Invalid prop `selection` supplied to `' + compName + '`. Validation failed.'
      );
    }
  }),
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
  id: v4(),
  coverage: [],
  legend: [],
  selection: [], 
  seqLenClass: "CPLChoice",
  onMouseSelection: (elem) => {},
  onSubpartSelected: (elem) => {},
  className: '',
}
