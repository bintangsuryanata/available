import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";

export function Erusak() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const history = useHistory();

  const [rusak, setRusak] = useState({
    rusak: {
      barang_id: "",
      jumlah_rusak: "",
      tanggal_rusak: "",
      status: "rusak",
    },
    barang: [],
    formData: {
      barang_id: "",
      jumlah_rusak: "",
      tanggal_rusak: "",
      status: "rusak",
    },
  });

  const { id } = useParams();

  const handleFileChange = (event) => {
    const { name, value } = event.target;

    setRusak((prevRusak) => ({
      ...prevRusak,
      rusak: {
        ...prevRusak.rusak,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("status", rusak.rusak.status);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/rusakupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully");
      window.location.href = "/brusak";
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rusakResponse = await axios.get(
          `http://127.0.0.1:8000/api/rusak/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (rusakResponse.data.error) {
          console.error(
            "Error fetching rusak data:",
            rusakResponse.data.error
          );
        } else {
          setRusak((prevData) => ({
            ...prevData,
            rusak: {
              barang_id: rusakResponse.data.barang_id,
              jumlah_rusak: rusakResponse.data.jumlah_rusak,
              tanggal_rusak: rusakResponse.data.tanggal_rusak,
              status: rusakResponse.data.status,
            },
          }));
        }

        const barangResponse = await axios.get(
          "http://127.0.0.1:8000/api/barang",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRusak((prevData) => ({
          ...prevData,
          barang: Array.isArray(barangResponse.data.data)
            ? barangResponse.data.data
            : [],
          formData: {
            ...prevData.formData,
            barang_id:
              barangResponse.data.data.length > 0
                ? barangResponse.data.data[0].barang_id
                : "",
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id, token]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className=" bg-gray-50 flex ">
      <Sidebar />
      <div className="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Tambah Data Barang Rusak
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 mb-24 shadow rounded-lg py-32 space-y-8 mx-auto max-w-4xl px-40">
              <div className="  ">
                <div className="">
                  <div className=" ">
                    <div className="col-span-full -mt-12">
                      <label
                        htmlFor="last-name"
                        className="block  text-gray-900"
                      >
                        Nama Barang
                      </label>
                      <div className="mt-2 mb-5">
                        <input
                          type="text"
                          name="barang_id"
                          placeholder=""
                          value={rusak.rusak.barang_id}
                          onChange={(e) =>
                            setRusak({
                              ...rusak,
                              rusak: {
                                ...rusak.rusak,
                                barang_id: e.target.value,
                              },
                            })
                          }
                          className="block w-full  h-11 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="first-name"
                        className="block leading-6 text-gray-900"
                      >
                        Jumlah Barang Rusak
                      </label>
                      <div className="mt-2 mb-5">
                        <input
                          name="jumlah_rusak"
                          type="number"
                          value={rusak.rusak.jumlah_rusak}
                          onChange={(e) =>
                            setRusak({
                              ...rusak,
                              rusak: {
                                ...rusak.rusak,
                                jumlah_rusak: e.target.value,
                              },
                            })
                          }
                          required
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className="block leading-6 text-gray-900">
                        Tanggal Rusak
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_rusak"
                          value={rusak.rusak.tanggal_rusak}
                          onChange={(e) =>
                            setRusak({
                              ...rusak,
                              rusak: {
                                ...rusak.rusak,
                                tanggal_rusak: e.target.value,
                              },
                            })
                          }
                          required
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
