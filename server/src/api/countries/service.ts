import { Sequelize, Op } from "sequelize";
import Countries, { CountriesTypes } from "../../models/Countries";
import { AddCountriesReqType, GetCountriesDTO } from "./controller";

const getCountries = async (res: GetCountriesDTO) => {
  const countries = await Countries.findAll({
    limit: res.limit && +res.limit,
    raw: true,
    nest: true,
    offset: res.limit && res.page ? Number(+res?.limit * (+res.page - 1)) : 0,
    // order: filter?.field ? [[filter.field, filter.row]] : null,
    // where: search ? { name: { [Op.like]: `%${search}%` } } : null,
  });

  return countries;
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
