import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: []
        }
    }
    static defaultProps = {
        center: {
            lat: 40.296898,
            lng: -111.694649
        },
        zoom: 9,
    };

    getLocations = () => {
        Axios({
            method: 'get',
            url: `http://localhost:5000/locations/${localStorage.getItem('_id')}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            let parsedRes = res.data
            var fetchedCoordinates = [];
            parsedRes.forEach((el) => {
                el.coordinates._id = el._id;
                el.coordinates.formatted_address = el.formatted_address
                fetchedCoordinates.push(el.coordinates);
            })

            this.setState({
                coordinates: fetchedCoordinates
            })


        }).catch(err => {
            console.log('error!!', err);
        })
    };

    deleteLocation = (id) => {
        Axios({
            method: 'delete',
            url: `http://localhost:5000/locations/${localStorage.getItem('_id')}/${id}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {

            console.log(this.state.coordinates[0]);
            console.log(this.state.coordinates[0]._id);
            console.log(id);

            let newCoordinates = this.state.coordinates.filter((coordinate) => {
                return coordinate._id != id;
            })

            this.setState({
                coordinates: newCoordinates
            })


        }).catch(() => {
            console.log('error deleting');
        });
    }

    componentDidMount() {
        this.getLocations();
    }

    render() {
        return (
            <div className="google-map_wrapper" style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    className="google-map_map"
                    bootstrapURLKeys={{ key: 'AIzaSyBP0Nmt5png_GzOHi4hCfdwfYGZzX3p8rg' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    getLocations={this.getLocations}
                >

                    {
                        this.state.coordinates.map(coordinates => (
                            <div
                                className="google-map_marker"
                                key={coordinates._id}
                                lat={coordinates.lat}
                                lng={coordinates.lng}
                            />
                        ))
                    }

                </GoogleMapReact>
                <div className="google-map_locations-list">
                    {
                        this.state.coordinates.map(coordinates => (
                            <div value={coordinates._id}
                                className="google-map_location-item"
                                onClick={() => this.deleteLocation(coordinates._id)}>
                                {coordinates.formatted_address} <span className="deleteButton">delete</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

