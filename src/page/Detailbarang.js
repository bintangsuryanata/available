import { HiSelector } from "react-icons/hi";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { basename } from "path-browserify";

import { Card, CardHeader, Typography } from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";

export function Detailbarang() {
  const token = localStorage.getItem("token");
  const [barang, setBarang] = useState({
    nama_barang: "",
    stok: "",
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
          imageUrl = response.data.image
            ? `http://127.0.0.1:8000/storage/images/${basename(
                response.data.image
              )}`
            : "";

          setBarang({
            nama_barang: response.data.nama_barang,
            stok: response.data.stok,
            status: response.data.status,
            deskripsi: response.data.deskripsi,
            image: response.data.image,
            imageUrl: imageUrl,
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
    <div className="h-screen flex ">
      <Sidebar />

      <div class="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Rincian Data Barang
                </Typography>
              </div>
            </div>
          </CardHeader>
          <form className="mx-auto max-w-4xl">
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
                          placeholder=""
                          value={barang.nama_barang}
                          readOnly
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
                          type="text"
                          value={barang.stok}
                          readOnly
                          onChange={(e) =>
                            setBarang({ ...barang, stok: e.target.value })
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
                          value={barang.status}
                          disabled
                          onChange={(e) =>
                            setBarang({ ...barang, status: e.target.value })
                          }
                          className="block w-full pl-2 px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option>ON</option>
                          <option>OFF</option>
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
                          name="about"
                          value={barang.deskripsi}
                          readOnly
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
                  <div className=" mt-20  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-16 py-16">
                    <div className="text-center">
                      <div className="mt-4 mb-10 flex text-sm leading-6 text-gray-600">
                        {barang.imageUrl && (
                          <img
                            src={barang.imageUrl}
                            alt="Description of the image"
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-2 flex items-center justify-end gap-x-6 ">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Kembali
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
