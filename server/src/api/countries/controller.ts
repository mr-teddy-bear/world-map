import { Request, Response } from "express";
import { CountriesTypes } from "../../models/Countries";
import {
  addCountry,
  changeCountry,
  deleteCountry,
  getCountries,
} from "./service";

export type GetCountriesDTO = {
  page?: string;
  limit?: string;
  filter?: {};
  search?: string;
};

export type AddCountriesReqType = {
  name: string;
  code: string;
  capital: string;
  lat: number;
  lng: number;
  area: number;
  population: number;
  year: number;
  img: string;
};

const getCountriesController = async (req: Request, res: Response) => {
  try {
    const { page, limit, filter, search }: GetCountriesDTO = req.query;
    const countries = await getCountries({ page, limit, filter, search });
    res.json(countries);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

const addCountriesController = async (req: Request, res: Response) => {
  try {
    const reqs: AddCountriesReqType = req.body;
    await addCountry(reqs);
    res.json({ message: "Succesfull" });
  } catch (e) {
    res.status(500).json({ message: e.message || "Что-то пошло не так..." });
  }
};

const changeCountriesController = async (req, res) => {
  try {
    const reqs: CountriesTypes = req.body;
    await changeCountry(reqs);
    res.json({ message: "Succesfull" });
  } catch (e) {
    res.status(500).json({ message: e.message || "Что-то пошло не так..." });
  }
};

const deleteCountriesController = async (req, res) => {
  try {
    const { id } = req.body;
    await deleteCountry(id);
    res.json({ message: "Succesfull" });
  } catch (e) {
    res.status(500).json({ message: e.message || "Что-то пошло не так..." });
  }
};

export {
  getCountriesController,
  addCountriesController,
  changeCountriesController,
  deleteCountriesController,
};
