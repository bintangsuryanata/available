import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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

export function Tpruang() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const history = useHistory();

  const [data, setData] = useState({
    ruang: [],
    formData: {
      ruang_id: "",
      tanggal_mulai: "",
      tanggal_selesai: null,
      status: "menunggu",
      image: null,
    },
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setData((prevData) => ({
      ...prevData,
      formData: {
        ...prevData.formData,
        [name]: name === "image" ? files[0] : value,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ruangResponse = await axios.get(
          "http://127.0.0.1:8000/api/ruang",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tersediaRuang = ruangResponse.data.data.filter(
          (ruang) => ruang.status === "tersedia"
        );

        setData((prevData) => ({
          ...prevData,
          ruang: Array.isArray(tersediaRuang) ? tersediaRuang : [],
          formData: {
            ...prevData.formData,
            ruang_id: tersediaRuang.length > 0 ? tersediaRuang[0].ruang_id : "",
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ruang_id", data.formData.ruang_id);
    formData.append("tanggal_mulai", data.formData.tanggal_mulai);
    formData.append("tanggal_selesai", data.formData.tanggal_selesai);
    formData.append("image", data.formData.image);

    console.log("Data to be sent:", {
      ruang_id: data.formData.ruang_id,
      tanggal_mulai: data.formData.tanggal_mulai,
      tanggal_selesai: data.formData.tanggal_selesai,
      image: data.formData.image,
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/pinjamruangpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.status === 200) {
        window.location = "/pruangan";
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleBack = () => {
    history.goBack(); // This will navigate back to the previous page
  };

  return (
    <div className="bg-gray-50 flex">
      <Sidebar />

      <div className="p-4 w-full">
        <Card className="font-poppins p-8 px-24" shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins">
                  Tambah Peminjaman Ruangan
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form
            className="mb-12"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-8 px-10">
              <div className=" ">
                <div className="pb-2">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block leading-6 text-gray-900"
                      >
                        Nama Ruangan
                      </label>
                      <div className="mt-2">
                        <select
                          type="text"
                          name="ruang_id"
                          value={data.formData.ruang_id}
                          onChange={handleInputChange}
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Pilih Ruangan</option>
                          {data.ruang
                            .filter((ruang) => ruang.status === "tersedia")
                            .map((b) => (
                              <option key={b.ruang_id} value={b.id}>
                                {b.nama_ruangan}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block leading-6 text-gray-900"
                      >
                        Tanggal Mulai
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_mulai"
                          value={data.formData.tanggal_mulai}
                          onChange={handleInputChange}
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>{" "}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block leading-6 text-gray-900"
                      >
                        Tanggal Selesai
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_selesai"
                          value={data.formData.tanggal_selesai}
                          onChange={handleInputChange}
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full mt-5">
                      <label className="block leading-6 text-gray-900 mb-2">
                        Gambar
                      </label>
                      <div className="flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                                onChange={handleInputChange}
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
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-6">
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
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
