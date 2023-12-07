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

export function Tmasuk() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    barang: [],
    formData: {
      barang_id: "",
      jumlah_masuk: "",
      tanggal_masuk: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/barang", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Log the response to the console

        setData((prevData) => ({
          ...prevData,
          barang: Array.isArray(response.data.data) ? response.data.data : [],
          formData: {
            ...prevData.formData,
            barang_id:
              response.data.data.length > 0
                ? response.data.data[0].barang_id
                : "",
          },
        }));
      } catch (error) {
        console.error("Error fetching barang data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      formData: {
        ...prevData.formData,
        [name]: name === "barang_id" ? value : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      barang_id: data.formData.barang_id,
      jumlah_masuk: data.formData.jumlah_masuk,
      tanggal_masuk: data.formData.tanggal_masuk,
    };

    try {
      const response = await axios
        .post("http://127.0.0.1:8000/api/masukpost", postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            window.location = "/bmasuk";
          }
        });
    } catch (error) {
      console.error("Error adding data:", error);
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
                  Tambah Barang Masuk
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-8 px-10">
              <div className="  ">
                <div className="pb-12">
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
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">Pilih Barang</option>
                          {data.barang.map((b) => (
                            <option key={b.barang_id} value={b.id}>
                              {b.nama_barang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Jumlah Barang Masuk
                      </label>
                      <div className="mt-2">
                        <input
                          name="jumlah_masuk"
                          type="number"
                          value={data.formData.jumlah_masuk}
                          onChange={handleInputChange}
                          required
                          placeholder="Jumlah Barang (1-100)"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tanggal Masuk
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_masuk"
                          value={data.formData.tanggal_masuk}
                          onChange={handleInputChange}
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
