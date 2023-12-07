import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState } from "react";
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

export function Tbarang() {
  const [newData, setNewData] = useState({
    nama_barang: "",
    stok: "",
    status: "",
    deskripsi: "",
    image: null, // Use null for file input
  });

  const handleInputChange = (e) => {
    const { name, files } = e.target;

    setNewData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : e.target.value, // Use files[0] for file input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const token = localStorage.getItem("token"); // Replace with your actual token

    Object.entries(newData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios
        .post("http://127.0.0.1:8000/api/barangpost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            window.location = "/dbarang";
          }
        });
    } catch (error) {
      console.error("Error adding data:", error.response.data);
      // Handle errors as needed
    }
  };

  const history = useHistory();
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
                  Tambah Data Barang
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
                          placeholder="Nama Barang"
                          name="nama_barang"
                          value={newData.nama_barang}
                          onChange={handleInputChange}
                          className="block w-full pl-2  h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          type="number"
                          placeholder="Stok"
                          value={newData.stok}
                          onChange={handleInputChange}
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
                          value={newData.status}
                          onChange={handleInputChange}
                          name="status"
                          className="block w-full pl-2 px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option value="ON">ON</option>
                          <option value="OFF">OFF</option>
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
                          placeholder="Deskripsi"
                          value={newData.deskripsi}
                          onChange={handleInputChange}
                          rows={3}
                          className="block w-full pl-2 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
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
