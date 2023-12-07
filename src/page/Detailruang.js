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

export function Detailruang() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState("");
  const [ruang, setRuang] = useState({
    nama_ruangan: "",
    status: "",
    deskripsi: "",
    image: "",
    imageUrl: "",
  });

  const { id } = useParams();

  useEffect(() => {
    let imageUrl = "";

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

        if (response.data.error) {
          console.error("Error fetching data:", response.data.error);
          // Handle the error, e.g., redirect to an error page or show a message
        } else {
          // Get Image From Storage
          imageUrl = response.data.image
            ? `http://127.0.0.1:8000/storage/images/${basename(
                response.data.image
              )}`
            : "";
          // Update the state with the retrieved data
          setRuang({
            nama_ruangan: response.data.nama_ruangan,
            status: response.data.status,
            deskripsi: response.data.deskripsi,
            image: response.data.image,
            imageUrl: imageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle other errors as needed
      }
    };

    fetchData(); // Call the fetchData function
  }, [id, token]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div class="p-4 w-full">
        <Card className=" font-poppins p-10 px-24" shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Rincian Data Ruangan
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
                          readOnly
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
                              nama_ruangan: e.target.value,
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
                          value={ruang.status}
                          disabled
                          onChange={(e) =>
                            setRuang({ ...ruang, status: e.target.value })
                          }
                          name="status"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
                          readOnly
                          onChange={(e) =>
                            setRuang({ ...ruang, deskripsi: e.target.value })
                          }
                          rows={3}
                          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <div className=" flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-16 py-16">
                    <div className="text-center">
                      <div className="mt-4 mb-10 flex text-sm leading-6 text-gray-600">
                        {ruang.imageUrl && (
                          <img
                            src={ruang.imageUrl}
                            alt="Description of the image"
                            className="w-auto h-auto object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Kembali
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
