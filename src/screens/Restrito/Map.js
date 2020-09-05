/*global google*/
import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
} from 'react-google-maps'
import Geocoder from 'react-geocode'

const GOOGLE_MAPS_APIKEY = 'AIzaSyDZgYbbBa49qSvG4vz0P3L967JGuRI1fcA'


class Map extends Component {
    state = {
        directions: null,
        origin: { latitude: 0, longitude: 0 },
        destination: { latitude: 0, longitude: 0 }
    }

componentDidMount() {
    this.props.load(this.props.match.params.id)
    console.log(this.props.deliveries.data)
    // console.log(this.props)
    console.log(this.props.match.params.id)

    const directionsService = new window.google.maps.DirectionsService()
    
    this.handleRoute(this.props.deliveries.data)
    

    directionsService.route(
        {
            origin: this.state.origin,
            destination: this.state.destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                console.log('Resultado :' + result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );

}


handleRoute = (delivery) => {

    console.log('Função handle chamada!');
    console.log(delivery)

    var oneDelivery = delivery.filter((delivery) => {
        return delivery.id == this.props.match.params.id
    })

    console.log(oneDelivery[0])
    console.log(oneDelivery[0].starting_point);
    console.log(oneDelivery[0].destination_point);
    
    if(oneDelivery[0].starting_point != '') {

        Geocoder.setApiKey(GOOGLE_MAPS_APIKEY); // use a valid API key

        Geocoder.fromAddress(`${oneDelivery[0].starting_point}`)
            .then( response => {
                const { lat, lng } = response.results[0].geometry.location;
                const latFloat = parseFloat(lat)
                const lngFloat = parseFloat(lng)
                console.log('Lat Origem: ' + latFloat, 'Lng Origem: ' + lngFloat)
                this.setState({ origin: { latitude: latFloat, longitude: lngFloat } })
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
                const { lat, lng } = response.results[0].geometry.location;
                const latFloat = parseFloat(lat)
                const lngFloat = parseFloat(lng)
                console.log('Lat Destino: ' + latFloat, 'Lng Destino: ' + lngFloat)
                this.setState({ destination: { latitude: latFloat, longitude: lngFloat } })
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