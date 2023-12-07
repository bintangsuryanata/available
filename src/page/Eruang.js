import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
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

export function Eruang() {
  const token = localStorage.getItem("token");
  const [ruang, setRuang] = useState({
    nama_ruangan: "",
    status: "",
    deskripsi: "",
    image: null,
  });

  const { id } = useParams();

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    setRuang((prevRuang) => ({
      ...prevRuang,
      [name]: files ? files[0] : event.target.value, // Use files[0] for file input
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("nama_ruangan", ruang.nama_ruangan);
    formData.append("status", ruang.status);
    formData.append("deskripsi", ruang.deskripsi);

    // Check if the image exists before appending
    if (ruang.image) {
      formData.append("image", ruang.image);
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/ruangupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully");
      window.location.href = "/druang";
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
          `http://127.0.0.1:8000/api/ruang/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the response contains an error
        if (response.data.error) {
          console.error("Error fetching data:", response.data.error);
          // Handle the error, e.g., redirect to an error page or show a message
        } else {
          // Update the state with the retrieved data
          setRuang({
            nama_ruangan: response.data.nama_ruangan,
            status: response.data.status,
            deskripsi: response.data.deskripsi,
            image: response.data.image,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle other errors as needed
      }
    };

    fetchData(); // Call the fetchData function
  }, [id, token]);

  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div class="p-4 w-full">
        <Card className=" font-poppins p-10 px-24" shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Sunting Data Ruangan
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className=" mx-auto max-w-4xl">
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
                          placeholder=""
                          value={ruang.nama_ruangan}
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
                              nama_ruangan: e.target.value,
                            })
                          }
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
                          value={ruang.status}
                          onChange={(e) =>
                            setRuang({ ...ruang, status: e.target.value })
                          }
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
                          value={ruang.deskripsi}
                          onChange={(e) =>
                            setRuang({ ...ruang, deskripsi: e.target.value })
                          }
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
                            type="file"
                            onChange={handleFileChange}
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
