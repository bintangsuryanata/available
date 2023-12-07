import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { basename } from "path-browserify";

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

export function Trusak() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const history = useHistory();

  const [data, setData] = useState({
    barang: [],
    formData: {
      barang_id: "",
      jumlah_rusak: "",
      tanggal_rusak: "",
      status: "rusak",
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
        // Fetch barang data
        const barangResponse = await axios.get(
          "http://127.0.0.1:8000/api/barang",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData((prevData) => ({
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("barang_id", data.formData.barang_id);
    formData.append("jumlah_rusak", data.formData.jumlah_rusak);
    formData.append("tanggal_rusak", data.formData.tanggal_rusak);
    formData.append("image", data.formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/rusakpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.location = "/brusak";
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // Inside the render function, before the return statement
  const filteredBarang = data.barang.filter((b) => b.stok > 0);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="h-screen flex ">
      <Sidebar />

      <div class="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Tambah Barang Rusak
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-10 px-10">
              <div className="flex items-center gap-x-10  ">
                <div className=" ">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Barang
                      </label>
                      <div className="mt-2">
                        <select
                          type="text"
                          name="barang_id"
                          value={data.formData.barang_id}
                          onChange={handleInputChange}
                          required
                          className="block w-full px-2 h-11  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Pilih Barang</option>
                          {filteredBarang.map((b) => (
                            <option key={b.barang_id} value={b.id}>
                              {b.nama_barang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Jumlah Barang Rusak
                      </label>
                      <div className="mt-2">
                        <input
                          name="jumlah_rusak"
                          type="number"
                          value={data.formData.jumlah_rusak}
                          onChange={handleInputChange}
                          required
                          placeholder="Jumlah Barang (1-100)"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tanggal Rusak
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_rusak"
                          value={data.formData.tanggal_rusak}
                          onChange={handleInputChange}
                          required
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="mt-20  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-20 py-20">
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
              <div className="mt-6 flex items-center justify-end gap-x-6">
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
