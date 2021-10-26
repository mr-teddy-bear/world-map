import React from "react";
import styled from "styled-components";
import { MarkerType } from "../../pages/Map/Map";
import { CircProgress } from "../CircProgress";

type RightPannelPropsType = {
  data?: MarkerType[];
  panTo: ({ lat, lng }: any) => void;
  isLoading: boolean;
};

export const RightPannel = (props: RightPannelPropsType) => {
  const handleCardClick = (lat: number, lng: number) => {
    props.panTo({
      lat: lat,
      lng: lng,
    });
  };
  return (
    <RightPannelWrapper>
      <PanelTitle>Available Countries</PanelTitle>

      <CountriesWrapper>
        {props.isLoading && <CircProgress />}
        {props.data?.map((country) => (
          <CountryBlock
            onClick={() => handleCardClick(country.lat, country.lng)}
            key={country.code}
          >
            <CountryTitleWrapper>
              <h2>
                {country.name}, {country.capital}
              </h2>
              <h3>{country.code}</h3>
            </CountryTitleWrapper>
            <CountryInfoRow>
              <p>
                Population:{" "}
                {country.population ? `${country.population} mln` : "No data"}
              </p>
              <p>Year: {country.year ? `${country.year}` : "No data"}</p>
            </CountryInfoRow>
            <CountryInfoRow>
              <p>
                Area:
                {country.area ? `~${country.area} thousand sq km` : "No data"}
              </p>
            </CountryInfoRow>
          </CountryBlock>
        ))}
      </CountriesWrapper>
    </RightPannelWrapper>
  );
};

const RightPannelWrapper = styled.div`
  background: #fafafa;
  width: 30%;
  padding: 12px 27px 0 27px;
  font-family: Nunito;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const PanelTitle = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 38px;
  color: #000000;
  margin: 8px 0 0 15px;
`;

const CountriesWrapper = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const CountryBlock = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin-top: 18px;
  box-sizing: border-box;
  padding: 10px 8px;

  :hover {
    cursor: pointer;
  }
`;

const CountryTitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 22px;
    color: #000000;
    margin-right: 24px;
  }

  h3 {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    color: #000000;
  }
`;

const CountryInfoRow = styled.div`
  display: flex;
  margin-top: 22px;

  > p {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    color: #717579;
    margin: 0;

    :first-child {
      margin-right: 28px;
    }
  }
`;
