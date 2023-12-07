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

export function Detailrusak() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState("");
  const [rusak, setRusak] = useState({
    barang_id: "",
    user_id: "",
    jumlah_rusak: "",
    tanggal_rusak: "",
    image: "",
    imageUrl: "",
  });
  const [filteredBarang, setFilteredBarang] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/rusak/${id}`,
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
          const imageUrl = response.data.image
            ? `http://127.0.0.1:8000/storage/images/${basename(
                response.data.image
              )}`
            : "";

          setRusak({
            barang_id: response.data.barang_id,
            user_id: response.data.user_id,
            jumlah_rusak: response.data.jumlah_rusak,
            tanggal_rusak: response.data.tanggal_rusak,
            status: response.data.status,
            image: response.data.image,
            imageUrl: imageUrl,
          });

          console.log("Rusak Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchAndSetData = async () => {
      try {
        const [barangResponse, rusakResponse, userResponse] = await Promise.all(
          [
            axios.get("http://127.0.0.1:8000/api/barang", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetchData(),
            axios.get("http://127.0.0.1:8000/api/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]
        );

        const barangData = barangResponse.data.data || [];
        setFilteredBarang(barangData);

        const selectedBarang = barangData.find(
          (b) => b.id === rusakResponse?.barang_id
        );

        if (selectedBarang) {
          setRusak((prevRusak) => ({
            ...prevRusak,
            barang_id: selectedBarang.id,
          }));
        }

        // Assuming you want to do something similar for user data
        const userData = userResponse.data.data || [];
        setFilteredUser(userData);

        console.log("Filtered Barang Data:", barangData);
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndSetData();
  }, [id, token]);

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
                  Rincian Data Barang Rusak
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
                        <select
                          name="barang_id"
                          value={rusak.barang_id}
                          disabled
                          onChange={(e) =>
                            setRusak((prevRusak) => ({
                              ...prevRusak,
                              barang_id: e.target.value,
                            }))
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredBarang.map((b) => (
                            <option
                              key={b.id}
                              value={b.id}
                              selected={b.id == rusak.barang_id} // Use == instead of === for loose comparison
                            >
                              {b.nama_barang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Pngguna
                      </label>
                      <div className="mt-2">
                        <select
                          name="user_id"
                          value={rusak.user_id}
                          disabled
                          onChange={(e) =>
                            setRusak((prevRusak) => ({
                              ...prevRusak,
                              user_id: e.target.value,
                            }))
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredUser?.map((user) => (
                            <option
                              key={user.id}
                              value={user.id}
                              selected={user.id == rusak.user_id}
                            >
                              {user.nama_user}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Stok Barang
                      </label>
                      <div className="mt-2">
                        <input
                          name="jumlah_rusak"
                          readOnly
                          type="number"
                          value={rusak.jumlah_rusak}
                          required
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <input
                          name="status"
                          readOnly
                          type="text"
                          value={
                            (rusak.status &&
                              rusak.status.charAt(0).toUpperCase() +
                                rusak.status.slice(1)) ||
                            ""
                          }
                          required
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
                          readOnly
                          name="tanggal_rusak"
                          value={rusak.tanggal_rusak}
                          required
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className=" mt-20  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-16 py-16">
                    <div className="text-center">
                      <div className="mt-4 mb-10 flex text-sm leading-6 text-gray-600">
                        {rusak.imageUrl && (
                          <img
                            src={rusak.imageUrl}
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
                  className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-skt-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
