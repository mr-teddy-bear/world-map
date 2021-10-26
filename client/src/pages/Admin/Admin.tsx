import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSortBy, useTable } from "react-table";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/vector.svg";
import { useGetCountries } from "../../hooks/useGetCountries";
import { MarkerType } from "../Map/Map";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { Modal } from "../../components/Modal";
import { Formik } from "formik";
import validationSchema from "./validationSchema";
import { CircProgress } from "../../components/CircProgress";
import { useAddCountry } from "../../hooks/useAddCountry";
import { DeleteModal } from "../../components/DeleteModal";
import { useDeleteCountry } from "../../hooks/useDeleteCountry";
import { queryClient } from "../../config";

enum Headers {
  NAME = "Name",
  CODE = "Code",
  AREA = "Area",
  CAPITAL = "Capital",
  DESCRIPTION = "Description",
  LAT = "Lat",
  LNG = "Lng",
  POPULATION = "Population",
  YEAR = "Year",
  ACTION = "Actions",
}

const limitOfTableRows = 5;

type AdminPropsType = {
  tableData?: MarkerType[];
};

export const Admin = (props: AdminPropsType) => {
  const [isAddCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const { mutate: addCountry, isLoading: addCountryLoader } = useAddCountry();
  const { mutate: deleteCountry, isLoading: deleteCountryLoader } =
    useDeleteCountry(setIsDeleteModalOpen);
  const params = useParams<{ pageId: string }>();
  const { countries, isLoading } = useGetCountries(
    params.pageId,
    limitOfTableRows,
    searchValue
  );
  const history = useHistory();
  const countOfPages = Math.ceil(
    Number(countries?.data.countriesLength) / limitOfTableRows
  );

  useEffect(() => {
    searchValue &&
      searchValue.length > 3 &&
      queryClient.invalidateQueries("getCountries");
  }, [searchValue]);

  const columns = React.useMemo(
    () => [
      {
        Header: Headers.NAME,
        accessor: (originalRow: MarkerType) => (
          <BoldTableText>{originalRow.name}</BoldTableText>
        ),
      },
      {
        Header: Headers.CODE,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.code}</NormalText>
        ),
      },
      {
        Header: Headers.CAPITAL,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.capital}</NormalText>
        ),
      },
      {
        Header: Headers.LAT,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.lat}</NormalText>
        ),
      },

      {
        Header: Headers.LNG,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.lng}</NormalText>
        ),
      },

      {
        Header: Headers.AREA,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.area}</NormalText>
        ),
      },
      {
        Header: Headers.POPULATION,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.population}</NormalText>
        ),
      },
      {
        Header: Headers.YEAR,
        accessor: (originalRow: MarkerType) => (
          <NormalText>{originalRow.year}</NormalText>
        ),
      },
      {
        Header: Headers.ACTION,
        accessor: (originalRow: MarkerType) => (
          <ActionBtnWrapper>
            <button
              onClick={() =>
                setIsDeleteModalOpen({
                  id: originalRow.id,
                  name: originalRow.name,
                })
              }
            >
              DELETE
            </button>
            <button>CHANGE</button>
          </ActionBtnWrapper>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countries?.data.countries]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: countries?.data.countries || [],
      columns,
    });
  return (
    <>
      {isDeleteModalOpen && (
        <Modal
          visible={!!isDeleteModalOpen.name}
          onClose={() => setIsDeleteModalOpen(null)}
        >
          <DeleteModal
            name={isDeleteModalOpen.name}
            delete={() => deleteCountry({ id: isDeleteModalOpen.id })}
            close={() => setIsDeleteModalOpen(null)}
            loading={deleteCountryLoader}
          />
        </Modal>
      )}
      {isAddCountryOpen && (
        <Modal
          visible={isAddCountryOpen}
          onClose={() => setIsCountryOpen(false)}
        >
          <AddCountryWrapper>
            <SignUpContentTitle>Add new country</SignUpContentTitle>
            <Formik
              initialValues={{
                name: "",
                code: "",
                capital: "",
                lat: 0,
                lng: 0,
                area: 0,
                population: 0,
                year: 0,
                img: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("countries", values);
                addCountry(values);
                setIsCountryOpen(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                /* and other goodies */
              }) => (
                <form method="post" onSubmit={handleSubmit}>
                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      placeholder=""
                      type="text"
                      error={errors.name && touched.name ? 1 : 0}
                    />
                    <label htmlFor="">Country name</label>
                  </InputWrapper>
                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="code"
                      type="text"
                      error={errors.code && touched.code ? 1 : 0}
                    />
                    <label htmlFor="">Country code</label>
                  </InputWrapper>
                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.capital}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="capital"
                      placeholder=""
                      type="text"
                      error={errors.capital && touched.capital ? 1 : 0}
                    />
                    <label htmlFor="">Country capital</label>
                  </InputWrapper>
                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.lat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lat"
                      placeholder=""
                      type="text"
                      error={errors.lat && touched.lat ? 1 : 0}
                    />
                    <label htmlFor="">LAT</label>
                  </InputWrapper>
                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.lng}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lng"
                      placeholder=""
                      type="text"
                      error={errors.lng && touched.lng ? 1 : 0}
                    />
                    <label htmlFor="">LNG</label>
                  </InputWrapper>

                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="area"
                      placeholder=""
                      type="text"
                      error={errors.area && touched.area ? 1 : 0}
                    />
                    <label htmlFor="">Area</label>
                  </InputWrapper>

                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.population}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="population"
                      placeholder=""
                      type="text"
                      error={errors.population && touched.population ? 1 : 0}
                    />
                    <label htmlFor="">Population</label>
                  </InputWrapper>

                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="year"
                      placeholder=""
                      type="text"
                      error={errors.year && touched.year ? 1 : 0}
                    />
                    <label htmlFor="">Year</label>
                  </InputWrapper>

                  <InputWrapper req={true}>
                    <StyledInput
                      value={values.img}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="img"
                      placeholder=""
                      type="text"
                      error={errors.img && touched.img ? 1 : 0}
                    />
                    <label htmlFor="">Img Link</label>
                  </InputWrapper>

                  {addCountryLoader ? (
                    <CircProgress />
                  ) : (
                    <SubmitBtn>Submit</SubmitBtn>
                  )}
                </form>
              )}
            </Formik>
          </AddCountryWrapper>
        </Modal>
      )}
      <AdminWrapper>
        <SearchWrapper>
          <SearchBar>
            <SearchIconStyled />
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              type="search"
              placeholder="Search... "
            />
            <SearchBtn>Search</SearchBtn>
          </SearchBar>
          <AddNewBtn onClick={() => setIsCountryOpen(true)}>
            Add new country
          </AddNewBtn>
        </SearchWrapper>
        <TableWrapper>
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                      //@ts-ignore
                      // {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render("Header")}
                        <span>
                          {/* @ts-ignore */}
                          {/* {column.isSorted ? (
                          //@ts-ignore
                          column.isSortedDesc ? (
                            <ArrowStyled top={true} />
                          ) : (
                            <ArrowStyled bottom={true} />
                          )
                        ) : (
                          <ArrowStyled />
                        )} */}
                        </span>
                      </th>
                    );
                  })}
                  <th></th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
        <TablePagination>
          <PaginationText>
            Page {params.pageId} of {isNaN(countOfPages) ? 1 : countOfPages}
          </PaginationText>
          <PaginationBtns>
            <PaginationBtn
              disabled={Number(params.pageId) === 1}
              onClick={() => history.push(`${Number(params.pageId) - 1}`)}
            >
              Previous
            </PaginationBtn>
            <PaginationBtn
              disabled={Number(params.pageId) >= countOfPages}
              onClick={() => history.push(`${Number(params.pageId) + 1}`)}
            >
              Next
            </PaginationBtn>
          </PaginationBtns>
        </TablePagination>
      </AdminWrapper>
    </>
  );
};

const AddCountryWrapper = styled.div`
  padding: 34px 30px 14px 30px;

  @media all and (max-height: 920px) {
    overflow-y: scroll;
  } ;
`;

const InputWrapper = styled.div<{ req?: boolean }>`
  min-width: 900px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  margin-bottom: 21px;
  position: relative;

  ${(props) =>
    props.req &&
    `::after {
    content: "*";
    width: 2px;
    height: 2px;
    color: red;
    position: absolute;
    right: -5px;
    top: 13px;
  }`}

  label {
    font-family: "Nunito";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.257143px;
    color: #a1a1a1;
    margin-bottom: 2px;
  }

  @media all and (max-height: 920px) {
    margin-bottom: 12px;
  } ;
`;

const StyledInput = styled.input<{ error?: number }>`
  width: 100%;
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.3px;
  color: #000;
  outline: none;
  border: 1px solid ${(props) => (props.error ? "#ff0000" : "#6A7280")};
  text-indent: 24px;
  padding: 10px 0;

  :focus {
    color: #757575;
    border: 1px solid #4a90e2;
  }

  :focus ~ label {
    color: #4a90e2;
  }

  @media all and (max-height: 920px) {
    padding: 5px 0;
  } ;
`;

const SignUpContentTitle = styled.h3`
  font-family: "Nunito";
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: 0.5625px;
  color: #757575;
  margin: 0 0 40px 0;
`;

const SubmitBtn = styled.button`
  padding: 14px 42px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  background: #ea201a;
  box-shadow: 0px 2px 24px rgba(72, 128, 255, 0.2);
  border-radius: 24px;
  border: 1px solid #ea201a;

  :hover {
    color: #ea201a;
    background: none;
    cursor: pointer;
  }
`;

const AdminWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  height: calc(100vh - 90px);
`;

const TableWrapper = styled.div`
  font-family: Nunito;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  margin: 45px auto 0 auto;
  border-spacing: 0;
  border-radius: 5px;

  th {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #b2b3bd;
    text-align: left;
    padding-bottom: 26px;
    border-bottom: 1px solid #e4e4e4;

    &:first-child {
      padding-left: 23px;
      max-width: 140px;
      width: 140px;
    }

    :nth-child(4) {
      max-width: 150px;
      width: 150px;
    }

    :nth-child(5) {
      max-width: 150px;
      width: 150px;
    }

    :nth-child(6) {
      max-width: 100px;
      width: 100px;
    }

    :nth-child(7) {
      max-width: 250px;
      width: 250px;
    }
  }

  td {
    height: 90px;
    color: #808191;
    line-height: 1.5em;
    font-size: 14px;
    text-align: left;
  }

  tbody tr:hover {
    cursor: pointer;
    background: rgba(228, 228, 228, 0.2);
  }

  tr td {
    border-bottom: 1px solid #e4e4e4;

    &:first-child {
      padding-left: 23px;
      max-width: 140px;
      width: 140px;
    }

    :nth-child(4) {
      max-width: 150px;
      width: 150px;
    }

    :nth-child(5) {
      max-width: 150px;
      width: 150px;
    }

    :nth-child(6) {
      max-width: 100px;
      width: 100px;
    }

    :nth-child(7) {
      max-width: 250px;
      width: 250px;
    }
  }
`;

const BoldTableText = styled.h4`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

const NormalText = styled.p<{ underline?: boolean }>`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  ${(props) =>
    props.underline &&
    `
    text-decoration:underline;
  `}
`;

const ArrowStyled = styled(Arrow)<{ top?: boolean; bottom?: boolean }>`
  fill: gray;
  margin-left: 20px;
  opacity: 0.5;

  ${(props) =>
    props.top &&
    `
    fill: blue;
    transform: rotate(
      180deg);
  `}
  ${(props) =>
    props.bottom &&
    `
    fill: blue
  `};
`;

const ActionBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;

  button {
    :first-child {
      margin-bottom: 10px;
      background: red;
      color: #fff;
      border: 1px solid red;

      :hover {
        background: none;
        cursor: pointer;
        color: red;
      }
    }

    :nth-child(2) {
      background: #9534b5;
      color: #fff;
      border: 1px solid #9534b5;

      :hover {
        background: none;
        cursor: pointer;
        color: #9534b5;
      }
    }
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 56px;
  margin-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(228, 228, 228, 0.2);
  border-radius: 16px;
`;

const SearchIconStyled = styled(SearchIcon)`
  margin: 0 20px;
`;

const SearchInput = styled.input`
  background: none;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border: none;
`;

const SearchBtn = styled.button`
  background: #2a55f4;
  border-radius: 16px;
  height: 48px;
  width: 116px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #fff;
  text-transform: initial;
  margin-right: 5px;
  border: none;

  :hover {
    color: #fff;
    cursor: pointer;
  }
`;

const TablePagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 53px 0 38px 0;
  padding: 0 64px 0 76px;
`;

const PaginationText = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #808191;
`;

const PaginationBtns = styled.div``;

const PaginationBtn = styled.button`
  background: #e3e6ec;
  border-radius: 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #11142d;
  padding: 9px 0;
  width: 110px;

  &:hover:not(:disabled) {
    color: #fff;
    background: #1b1d21;
    cursor: pointer;
  }

  &:last-child {
    margin-left: 25px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const AddNewBtn = styled.button`
  background: #2a55f4;
  border-radius: 16px;
  height: 48px;
  padding: 0 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: #fff;
  text-transform: initial;
  margin-right: 5px;
  border: 1px solid #2a55f4;

  :hover {
    color: #2a55f4;
    cursor: pointer;
    background: none;
  }
`;
