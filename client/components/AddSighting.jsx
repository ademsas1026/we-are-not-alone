import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';


import { addNewSighting } from '../store';

class AddSighting extends Component {
  constructor(){
    super();
    this.state = {
      date: '', 
      time: '', 
      city: '', 
      state: '', 
      shape: '', 
      duration: 0, 
      comments: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const { date, time, hour, minute, city, state, shape, duration, comments } = this.state;
    const { latitude, longitude } = this.props;
    const sighting = { date, time, city, state, shape, duration, comments, latitude, longitude };
    this.props.addNewSighting(sighting);
  }
  render() {
    const { date, time, hour, minute, city, state, shape, duration, comments } = this.state;
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'CD', 'TN', 'TX', 'UT', 'VI', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const { latitude, longitude } = this.props;

    return (
      <div id="addSightingForm">
        <FormGroup id="form">
          <ControlLabel className="col-xs-2 control-label"><h1><b>Tell Us More</b></h1></ControlLabel>
          <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Date</b></h2>
                <FormControl value={date} name="date" type="text" onChange={this.handleChange} placeholder="MM/DD/YYYY" />
          </ControlLabel>
          <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Time</b></h2>
              <FormControl value={time} name="time" type="text" onChange={this.handleChange} placeholder="0:00 - 23:59" />
          </ControlLabel>
          <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>City</b></h2>
              <FormControl value={city} name="city" type="text" onChange={this.handleChange}  placeholder="Walla Walla" />
          </ControlLabel>
          <ControlLabel className="col-xs-2 control-label" id="formLabels" ><h2><b>State</b></h2>
              <Typeahead
                labelKey="name"
                options={states}
                placeholder="Choose a state..."
                value={state}
                dropup
                onChange={this.handleChange}
            />
            </ControlLabel>
            <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Shape</b></h2>
                <FormControl value={shape} name="shape" type="text" onChange={this.handleChange} onChange={this.handleChange} placeholder="describe shape, if applicable" />
            </ControlLabel>
            <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Comments</b></h2>
                <FormControl value={comments} className="comments" name="comments" onChange={this.handleChange} type="text"  componentClass="textarea" placeholder="...flashing lights" />
            </ControlLabel>
            <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Latitude <h4>(click map)</h4></b></h2>
                <FormControl value={latitude}  type="text"/>
            </ControlLabel>
            <ControlLabel className="col-xs-2 control-label" id="formLabels"><h2><b>Longitude <h4>(click map)</h4></b></h2>
                <FormControl value={longitude} type="text"/>
            </ControlLabel>
            <Button onClick={this.handleSubmit} className="col-xs-2 control-label" id="addSightingButton" type="submit"><h4>We Are Not Alone</h4></Button>
          </FormGroup>
      </div>
    )
  }
}

/* --- Container --- */
const mapDispatch = dispatch => ({
  addNewSighting(sighting){
    console.log('this is sighting in map dispatch: ', sighting);
    dispatch(addNewSighting(sighting))
  }
})

const mapState = state => ({
  sighting: state.sighting
})


export default connect(mapState, mapDispatch)(AddSighting);