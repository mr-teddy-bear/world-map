import { Sequelize, Op } from "sequelize";
import Countries, { CountriesTypes } from "../../models/Countries";
import { AddCountriesReqType, GetCountriesDTO } from "./controller";

const getCountries = async (res: GetCountriesDTO) => {
  const countriesLength = await Countries.count();
  const countries = await Countries.findAll({
    limit: res.count && +res.count,
    raw: true,
    nest: true,
    offset: res.count && res.page ? Number(+res?.count * (+res.page - 1)) : 0,
    // order: filter?.field ? [[filter.field, filter.row]] : null,
    where: res.search ? { name: { [Op.like]: `%${res.search}%` } } : null,
  });

  return { countries, countriesLength };
};

const addCountry = async (req: AddCountriesReqType) => {
  const candidate = await Countries.findOne({
    where: { [Op.or]: [{ name: req.name }, { lat: req.lat, lng: req.lng }] },
    raw: true,
    nest: true,
  });
  if (candidate) {
    throw new Error("Country is already exist");
  }

  const country = await Countries.create({
    name: req.name,
    lat: req.lat,
    lng: req.lng,
    capital: req.capital,
    area: req.area,
    population: req.population,
    code: req.code,
    year: req.year,
    img: req.img,
  });

  await country.save();

  return country;
};

const changeCountry = async ({
  id,
  lat,
  lng,
  name,
  capital,
  area,
  population,
  code,
  year,
  description,
}: CountriesTypes) => {
  const contact = await Countries.update(
    { lat, lng, name, capital, area, population, code, year, description },
    { where: { id } }
  );
};

const deleteCountry = async (id: number) => {
  await Countries.destroy({ where: { id } });
};

export { getCountries, addCountry, changeCountry, deleteCountry };
