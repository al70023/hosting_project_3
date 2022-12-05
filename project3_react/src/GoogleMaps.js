import React from 'react';
import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function GoogleMaps() {

    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
        </GoogleMap>
    );
}

export default GoogleMaps;