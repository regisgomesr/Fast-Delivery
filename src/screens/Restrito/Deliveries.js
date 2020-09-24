import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withScriptjs } from 'react-google-maps'

import Map from './Map'
import ActionCreators from '../../redux/actionCreators'

const MapLoader = withScriptjs(Map)


class Deliveries extends Component{
        state = {
            route: false
        }

    componentDidMount(){
        this.props.load()
        // console.log(this.props.auth)
        console.log(this.props.deliveries.data)
    }
    
    renderDelivery = delivery => {

        return(
            <Table.Row key={delivery.id}>
                <Table.Cell>
                  {delivery.name_client}
                </Table.Cell>
                <Table.Cell>
                  {delivery.starting_point}
                </Table.Cell>
                <Table.Cell>
                  {delivery.destination_point}
                </Table.Cell>
                <Table.Cell>
                  {delivery.date}
                </Table.Cell>
                <Table.Cell>
                  <Button inverted color='red' 
                    onClick={() => this.setState({ route: true })} 
                    as={Link} to={`/restrito/deliveries/${delivery.id}/route`}>Rota</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render(){

        return (
            <div>
                <h1>Entregas</h1>

                <Button animated color='green' size='big' as={Link} to='/restrito/create-delivery'>
                    <Button.Content visible>Criar Entrega</Button.Content>
                        <Button.Content hidden>
                        <Icon name='angle double right' />
                    </Button.Content>
                </Button>
                
                { this.props.deliveries.isLoading && <p>Carregando...</p> }

                {
                    !this.props.deliveries.isLoading && this.props.deliveries.data.length === 0 &&
                        <Segment color='blue'>Nenhuma Entrega Cadastrada!</Segment>
                }

                {
                    !this.props.deliveries.isLoading && this.props.deliveries.data.length > 0 && 
                
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome do Cliente</Table.HeaderCell>
                                <Table.HeaderCell>Ponto de Partida</Table.HeaderCell>
                                <Table.HeaderCell>Ponto de Destino</Table.HeaderCell>
                                <Table.HeaderCell>Data</Table.HeaderCell>
                                <Table.HeaderCell>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { this.props.deliveries.data.map(this.renderDelivery) }
                        </Table.Body>
                    </Table>
                }
                {
                    this.state.route &&
                    <MapLoader
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZgYbbBa49qSvG4vz0P3L967JGuRI1fcA"
                        loadingElement={<div style={{ height: `100%` }} />}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        deliveries: state.deliveries,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getDeliveriesRequest()),
        create: (delivery) => dispatch(ActionCreators.createDeliveryRequest(delivery))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries)