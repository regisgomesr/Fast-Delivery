import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'

import ActionCreators from '../../redux/actionCreators'
import InputPlacesAutocomplete from './elements/InputPlacesAutocomplete'

class CreateDelivery extends Component{

    state = {
        name_client: '',
        starting_point: '',
        destination_point: '',
        date: moment(),
        error: ''
    }

    componentDidMount() {
        this.props.reset()
    }

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleChangeAddressStart = (address) => {
        this.setState({ starting_point: address });
      };

    handleChangeAddressDestination = (address) => {
        this.setState({ destination_point: address });
    };

    handleSave = () => {

        // const dtLocal = moment.tz(this.state.date, this.props.auth.user.timezone)
        // const dtFormatada = dtLocal.clone().utc().format('YYYY-MM-DD, H:mm:ss') // formato para salvar no BD
        // console.log(dtFormatada)

        // console.log(this.state.name_client);
        // console.log(this.state.starting_point);
        // console.log(this.state.destination_point);
        // console.log(this.state.date);

        this.props.create({
            name_client: this.state.name_client,
            starting_point: this.state.starting_point,
            destination_point: this.state.destination_point,
            date: this.state.date
        })
    }

    render(){

        if(this.props.deliveries.saved) {
            return <Redirect to='/restrito/deliveries' />
        }

        return (
            <div>
                <h1>Criar Entrega</h1>

                {
                    this.props.deliveries.saved && <Segment color='green'>Entrega Criada com sucesso!</Segment>
                }

                {
                    !this.props.deliveries.saved && 
                    <Form>
                        <Form.Field>
                            <label >Cliente:</label>
                            <input type='text' value={this.state.name_client} onChange={this.handleChange('name_client')} />
                        </Form.Field>
                        <Form.Field>
                            
                            <label >Ponto de Partida:</label>
                            <InputPlacesAutocomplete type='text' value={this.state.starting_point} changeAddressCallback={this.handleChangeAddressStart} />

                        </Form.Field>
                        <Form.Field>
                            <label>Ponto de Destino:</label>
                            <InputPlacesAutocomplete type='text' value={this.state.destination_point} changeAddressCallback={this.handleChangeAddressDestination} />
                        </Form.Field>
                        <Form.Field>
                            <label>Data da Entrega:</label>
                            <input type='text' value={this.state.date.format('DD/MM/YYYY, H:mm:ss')} onChange={this.handleChange('date')} />
                        </Form.Field>

                        <InputMoment
                            moment={this.state.date}
                            onChange={(val) => this.setState({ date: val })}
                        />

                        <div>
                            <Button inverted color='blue' size='big' onClick={this.handleSave}>Salvar Entrega</Button>
                        </div>
                    </Form>
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
        create: (delivery) => dispatch(ActionCreators.createDeliveryRequest(delivery)),
        reset: () => dispatch(ActionCreators.createDeliveryReset())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDelivery)
