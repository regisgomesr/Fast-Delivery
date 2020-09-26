/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from 'react-google-maps'
import Geocoder from 'react-geocode'

import ActionCreators from '../../redux/actionCreators'

const GOOGLE_MAPS_APIKEY = 'AIzaSyDZgYbbBa49qSvG4vz0P3L967JGuRI1fcA'




class Map extends Component {
    state = {
        directions: null,
        origin: { lat: 0, lng: 0 },
        destination: { lat: 0, lng: 0 },
        route: false
    }

componentDidMount() {
    this.props.load(this.props.match.params.id)
    console.log(this.props.deliveries.data)
    console.log(this.props.match.params.id)

    this.handleRoute(this.props.deliveries.data)

    // console.log('DidMount Route: ==> ' + this.state.route)

    // if ( this.state.route === true) {

    // this.setDirection()
    // }

    console.log('passou sem esperar o handleRoute, FIM!');

}

// shouldComponentUpdate(newProps, newState){
//     return newState.directions !== this.state.directions;

//   }

componentDidUpdate(){
    
    console.log('Update chamado!')

    const directionsService = new window.google.maps.DirectionsService()

    directionsService.route(
        {
            origin: this.state.origin,
            destination: this.state.destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            console.log('Result: ' + result);
            console.log('Status: ' + status);
            if (status === google.maps.DirectionsStatus.OK) {
                console.log('Resultado :' + result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`)
            }
        }
    );

}

handleRoute = (deliveries) => {

    console.log('Função handleRoute chamada!')
    console.log(deliveries)

    const oneDelivery = deliveries.filter((delivery) => {
        return delivery.id == this.props.match.params.id
    })

    console.log(oneDelivery[0])
    console.log(oneDelivery[0].starting_point)
    console.log(oneDelivery[0].destination_point)
    
    if(oneDelivery[0].starting_point != '') {

        Geocoder.setApiKey(GOOGLE_MAPS_APIKEY) // use a valid API key

        Geocoder.fromAddress(`${oneDelivery[0].starting_point}`)
            .then( response => {
                const { lat, lng } = response.results[0].geometry.location
                const latFloat = parseFloat(lat)
                const lngFloat = parseFloat(lng)
                
                this.setState({ origin: { lat: latFloat, lng: lngFloat } })
                // origin = { lat: latFloat, lng: lngFloat };
                console.log('Lat Origem: ' + this.state.origin.lat, 'Lng Origem: ' + this.state.origin.lng)

            })
            .catch(error => console.warn(error))
    }
    else {
        alert("Digite a origem ! ")
    }

    if(oneDelivery[0].destination_point != '') {

        Geocoder.setApiKey(GOOGLE_MAPS_APIKEY); // use a valid API key

        Geocoder.fromAddress(`${oneDelivery[0].destination_point}`)
            .then( response => {
                const { lat, lng } = response.results[0].geometry.location
                const latFloat = parseFloat(lat)
                const lngFloat = parseFloat(lng)
                
                
                this.setState({ destination: { lat: latFloat, lng: lngFloat } })
                // destination = { lat: latFloat, lng: lngFloat };
                console.log('Lat Destination: ' + this.state.destination.lat, 'Lng Destination: '
                 + this.state.destination.lng)
                this.setState({ route: true })
                console.log(this.state.route)
            })
            .catch(error => console.warn(error))
    }
    else {
        alert("Digite o destino ! ")
    }
}

render() {
  const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: parseFloat(-22.9099), lng:  parseFloat(-43.2095) }}
        defaultZoom={10}
      >
      <DirectionsRenderer
        directions={this.state.directions}
      />
        
          
      </GoogleMap>
  ));

  return (
      <div>
          <GoogleMapExample
            containerElement={<div style={{ height: `500px`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

      </div>


     );
  }
}

const mapStateToProps = state => {
    return {
        deliveries: state.deliveries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(ActionCreators.getDeliveryRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)