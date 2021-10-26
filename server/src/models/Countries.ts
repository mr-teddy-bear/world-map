import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/mysql";

export interface CountriesTypes {
  id?: number;
  lat: number;
  lng: number;
  name: string;
  capital: string;
  area: number;
  population: number;
  code: string;
  year: number;
  description?: string;
  img: string;
}

class Countries extends Model<CountriesTypes> implements CountriesTypes {
  public id!: number;
  public lat!: number;
  public lng!: number;
  public name!: string;
  public capital!: string;
  public area!: number;
  public population!: number;
  public code!: string;
  public year!: number;
  public description!: string;
  public img!: string;
}

Countries.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lat: {
      type: DataTypes.DOUBLE,
    },
    lng: { type: DataTypes.DOUBLE },
    name: { type: DataTypes.STRING, unique: true },
    capital: { type: DataTypes.STRING },
    area: { type: DataTypes.DOUBLE },
    population: { type: DataTypes.DOUBLE },
    code: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    img: { type: DataTypes.TEXT },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    tableName: "countries",
    schema: "public",
  }
);

export default Countries;
