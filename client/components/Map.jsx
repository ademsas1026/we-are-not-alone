import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Map,  Marker, Popup, TileLayer } from 'react-leaflet';
import { withRouter } from 'react-router-dom';

import { markerIcon } from '../mapElements/marker';
import {  loadSightingsByCluster  } from '../store';
const { mostCommonWords, allDataCommonWords } = require('../../script/prepData');
import Chart from './Chart.jsx';
import AddSighting from './AddSighting.jsx';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [36.8, -98], 
      zoom: 3.5, 
      clicked: false, 
      latitude: 0.00, 
      longitude: 0.00
    };
    this.handleClick = this.handleClick.bind(this);
  }

  
  loadCluster(event){
    console.log('loading cluster!!!')
    if (!this.state.clicked) this.props.loadSightingsByCluster(event.latlng.lat, event.latlng.lng)
    else this.setState({ latitude: event.latlng.lat, longitude: event.latlng.lng })
  } 

  handleClick(){
    this.setState({ clicked: !this.state.clicked })
  }


  render() {
    const { center, zoom, latitude, longitude } = this.state;
    const { sightings } = this.props;
    console.log('loading the map!!!')
    const mostCommonlyUsedWords = mostCommonWords(sightings).slice(0, 10);
    return (
      <div id="mapid">
       
        <Map 
          style={{height: "100vh", width: "55%"}}
          center={center}
          zoom={zoom}
          onclick={this.loadCluster.bind(this)}
          id="actualMap"
          
          >
          <h1 className="col-xs-2 control-label">Not Alone</h1>
          <h2 className="col-xs-2 control-label">An Interactive Visualization of UFO Sightings in the US</h2>
          <h3 className="col-xs-2 control-label">1949 - 2013</h3>
          <h3 className="col-xs-2 control-label">click map...if you dare</h3>
          <TileLayer  
            url="https://api.mapbox.com/styles/v1/ademsas/cjggt8ilb002k2rqw269apfqt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRlbXNhcyIsImEiOiJjamdncThncmIwMGw4MnhxbWNybnV1cDMwIn0.DmUIWxfIPjHyD-nu9GVqrw"
            attribution="data courtesy of the National UFO Reporting Center (NUFORC)"
          />
          { !this.state.clicked && sightings.length && sightings.map(sighting => (
              <Marker key ={sighting.id} position={[sighting.latitude, sighting.longitude]} icon={markerIcon}>
                <Popup >
                  <span id="popup">{`${sighting.city},  ${sighting.state}`}<br />{sighting.comments}<br/>{sighting.date}</span>
                </Popup>
              </Marker>
          ))}
          <Button onClick={this.handleClick} className="col-xs-2 control-label" id="showFormButton" style={{zIndex: 1000, width: "12vw"}}><h4>I, Too, Have Seen</h4></Button>
        </Map>
        <div id="chartAndForm">
          {this.state.clicked 
          ? <AddSighting latitude={latitude} longitude={longitude}/>
          : <Chart id="chartRender" mostCommonlyUsedWordsPerCluster={mostCommonlyUsedWords} mostCommonlyUsedWordsOverall={allDataCommonWords}/>
          }
        </div>
       
        
      </div>
    )
  }
}


/*--- Container ---*/
const mapState = state => ({
  sightings: state.sightings
})

const mapDispatch = dispatch => ({
  loadSightingsByCluster(latitude, longitude){
    dispatch(loadSightingsByCluster(latitude, longitude))
  }

})

export default withRouter(connect(mapState, mapDispatch)(MapView));