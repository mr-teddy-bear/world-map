import { GoogleMap as GoogleMapApi, Marker } from "@react-google-maps/api";
import React from "react";
import styled from "styled-components";
import { apiRoute } from "../../config";
import { MarkerType } from "../../pages/Map/Map";
import { AboutCountry } from "../AboutCountry";
import { Modal } from "../Modal";

type MapMarkeredPropsType = {
  center: {
    lat: number;
    lng: number;
  };

  markers?: MarkerType[];
  loadError: Error | undefined;
  isLoaded: any;
  isLoadingData: boolean;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<MarkerType | null>>;
  onMapLoad: (map: any) => void;
};

export const GoogleMap = (props: MapMarkeredPropsType) => {
  if (props.loadError) return <div>Error</div>;
  if (!props.isLoaded || props.isLoadingData) return <div>Loading...</div>;
  return (
    <GoogleMapWrapper>
      <GoogleMapApi
        id="map"
        zoom={3}
        center={props.center}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onLoad={props.onMapLoad}
      >
        {props.markers?.map((marker, idx) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              props.setSelected(marker);
            }}
            icon={{
              url: `${
                marker.img.includes("http")
                  ? marker.img
                  : apiRoute + "/" + marker.img
              }`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(14, 7),
              scaledSize: new window.google.maps.Size(24, 12),
            }}
          />
        ))}

        {props.selected && (
          <Modal
            visible={props.selected}
            onClose={() => props.setSelected(null)}
          >
            <AboutCountry country={props.selected} />
          </Modal>
        )}
      </GoogleMapApi>
    </GoogleMapWrapper>
  );
};

const GoogleMapWrapper = styled.div`
  width: 70%;
  height: calc(100vh - 90px);

  > div {
    width: 100%;
    height: 100%;
  }
`;
