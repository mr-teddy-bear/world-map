import { useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { GoogleMap } from "../../components/GoogleMap";
import { RightPannel } from "../../components/RightPannel";
import canada from "../../assets/canada.png";
import belarus from "../../assets/belarus.jpg";
import { useGetCountries } from "../../hooks/useGetCountries";

export type MarkerType = {
  lat: number;
  lng: number;
  name: string;
  capital: string;
  area: number;
  population: number;
  code: string;
  year: number | null;
  description: string;
  img: string;
};

const data = [
  {
    lat: 53.709807,
    lng: 27.953389,
    name: "Belarus",
    capital: "Minsk",
    area: 207,
    population: 10,
    code: "BY",
    year: null,
    description: "Good Country",
    img: belarus,
  },
  {
    lat: 56.130366,
    lng: -106.346771,
    name: "Canada",
    capital: "Otava",
    area: 1052,
    population: 403,
    code: "CA",
    year: 1740,
    description: "",
    img: canada,
  },
];

export const Map = () => {
  const { countries, isLoading } = useGetCountries();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
      "AIzaSyBmvXeSvsPLX5QeP7aL3ZTEwof8AVoKyN8",
    libraries: ["places"],
  });

  const [center, setCenter] = useState({
    lat: 37.09024,
    lng: -95.712891,
  });

  const [selected, setSelected] = useState<MarkerType | null>(null);

  const mapRef = useRef();

  const panTo = useCallback(({ lat, lng }) => {
    //@ts-ignore
    mapRef?.current?.panTo({ lat, lng });
    //@ts-ignore
    mapRef?.current?.setZoom(4);
  }, []);

  const onMapLoad = React.useCallback(
    (map) => {
      mapRef.current = map;

      let userMarker = new window.google.maps.Marker({
        position: { lat: 100, lng: 100 },
        map,
      });
      userMarker.setMap(map);
    },
    [center]
  );

  return (
    <MapWrapper>
      <GoogleMap
        center={center}
        markers={countries?.data}
        isLoaded={isLoaded}
        loadError={loadError}
        selected={selected}
        setSelected={setSelected}
        onMapLoad={onMapLoad}
        isLoadingData={isLoading}
      />
      <RightPannel panTo={panTo} isLoading={isLoading} data={countries?.data} />
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  display: flex;
`;
