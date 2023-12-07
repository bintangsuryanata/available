import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";
import { distance2D } from "framer-motion";

export function Ebarang() {
  const token = localStorage.getItem("token");
  const [barang, setBarang] = useState({
    nama_barang: "",
    stok: "",
    status: "",
    deskripsi: "",
    image: null,
  });

  const { id } = useParams();

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    setBarang((prevBarang) => ({
      ...prevBarang,
      [name]: files ? files[0] : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("nama_barang", barang.nama_barang);
    formData.append("stok", barang.stok);
    formData.append("status", barang.status);
    formData.append("deskripsi", barang.deskripsi);

    if (barang.image) {
      formData.append("image", barang.image);
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/barangupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully");
      window.location.href = "/dbarang";
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
        const response = await axios.get(
          `http://127.0.0.1:8000/api/barang/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.error) {
          console.error("Error fetching data:", response.data.error);
        } else {
          setBarang({
            nama_barang: response.data.nama_barang,
            stok: response.data.stok,
            status: response.data.status,
            deskripsi: response.data.deskripsi,
            image: response.data.image,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id, token]);

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className=" flex h-screen">
      <Sidebar />

      <div class="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Sunting Data Barang
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-8 px-10">
              <div className="flex items-center gap-x-6  ">
                <div className=" ">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Barang
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nama_barang"
                          placeholder=""
                          value={barang.nama_barang}
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              nama_barang: e.target.value,
                            })
                          }
                          className="block w-full pl-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Stok Barang
                      </label>
                      <div className="mt-2">
                        <input
                          name="stok"
                          type="text"
                          value={barang.stok}
                          onChange={(e) =>
                            setBarang({ ...barang, stok: e.target.value })
                          }
                          className="block w-full pl-2 px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <select
                          type="text"
                          name="status"
                          value={barang.status}
                          onChange={(e) =>
                            setBarang({ ...barang, status: e.target.value })
                          }
                          className="block w-full pl-2 px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option name="ON" value="ON">
                            ON
                          </option>
                          <option name="OFF" value="OFF">
                            OFF
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Deskripsi
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="deskripsi"
                          value={barang.deskripsi}
                          onChange={(e) =>
                            setBarang({ ...barang, deskripsi: e.target.value })
                          }
                          rows={3}
                          className="block w-full pl-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="mt-20  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-16 py-20">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="image"
                            onChange={handleFileChange}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2 flex items-center justify-end gap-x-6 ">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
