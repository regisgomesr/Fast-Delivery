import React, { Component } from 'react'
import { withScriptjs } from 'react-google-maps'
import Map from './Map'

const MapLoader = withScriptjs(Map)

class Routes extends Component {
  render() {
    return(
      <div>
        <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZgYbbBa49qSvG4vz0P3L967JGuRI1fcA"
        loadingElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
export default Routes