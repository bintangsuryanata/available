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

export function Truang() {
  const history = useHistory();
  const [newData, setNewData] = useState({
    nama_ruangan: "",
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
        .post("http://127.0.0.1:8000/api/ruangpost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            window.location = "/druang";
          }
        });
    } catch (error) {
      console.error("Error adding data:", error.response.data);
      // Handle errors as needed
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div class="p-4 w-full">
        <Card className=" font-poppins p-10 px-24" shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Tambah Data Ruangan
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className=" mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="bg-gray-100 py-2 shadow rounded-lg space-y-8  px-10">
              <div className=" ">
                <div className="pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Ruangan
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nama_ruangan"
                          placeholder="Nama Ruangan"
                          value={newData.nama_ruangan}
                          onChange={handleInputChange}
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          value={newData.status}
                          onChange={handleInputChange}
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option name="tersedia" value="tersedia">
                            Tersedia
                          </option>
                          <option name="tidak tersedia" value="tidak tersedia">
                            Tidak Tersedia
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
                          placeholder="Deskripsi Ruangan"
                          value={newData.deskripsi}
                          onChange={handleInputChange}
                          rows={3}
                          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <div className=" flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
