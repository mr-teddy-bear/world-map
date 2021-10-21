import React, { useState } from "react";
import styled from "styled-components";
import { MarkerType } from "../../pages/Map/Map";

type AboutCountryPropsType = {
  country: MarkerType;
};

export const AboutCountry = ({ country }: AboutCountryPropsType) => {
  return (
    <AboutCountryWrapper>
      <AboutCountryTitleWrapper>
        <h2>
          {country.name}, {country.capital}
        </h2>
        <h3>{country.code}</h3>
        <img src={country.img} alt="" />
      </AboutCountryTitleWrapper>

      <AboutCountryRowWrapper>
        <AboutCountryRow>
          <h4>Area</h4>
          <p>
            {country.area
              ? `Area of ${country.name} is about ${country.area} thousand sqare kilometers`
              : "No data about area"}
          </p>
        </AboutCountryRow>
        <AboutCountryRow>
          <h4>Population</h4>
          <p>
            {country.population
              ? `Population of ${country.name} is about ${country.population} mln people`
              : "No data about population"}
          </p>
        </AboutCountryRow>
        <AboutCountryRow>
          <h4>Description</h4>
          <p>{country.description || `No description about ${country.name}`}</p>
        </AboutCountryRow>
      </AboutCountryRowWrapper>
    </AboutCountryWrapper>
  );
};

const AboutCountryWrapper = styled.div`
  padding: 42px 26px 45px 26px;
  width: 479px;
  box-sizing: border-box;
  font-family: Nunito;
`;

const AboutCountryTitleWrapper = styled.div`
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
  img {
    width: 250px;
  }
`;

const AboutCountryRowWrapper = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const AboutCountryRow = styled.div`
  margin-bottom: 10px;
  line-height: 22px;
  color: #717579;
  font-style: normal;
  font-weight: 600;

  h4 {
    margin: 0;
    font-size: 20px;
  }

  p {
    margin: 0;
    font-size: 11px;
  }
`;
