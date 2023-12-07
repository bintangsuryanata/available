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
export function Epbarang() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [barang, setBarang] = useState({
    barang: [],
    barang_id: "",
    user_id: "",
    jumlah_pinjam: "",
    tanggal_mulai: "",
    tanggal_selesai: null,
    status: "",
    image: null,
    imageUrl: "",
  });

  const [filteredBarang, setFilteredBarang] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    let imageUrl = "";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/pinjambarang/${id}`,
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
          imageUrl = response.data.image
            ? `http://127.0.0.1:8000/storage/images/${basename(
                response.data.image
              )}`
            : "";
          console.log("Fetched Data:", response.data); // Add this line
          setBarang({
            barang_id: response.data.barang_id,
            user_id: response.data.user_id,
            jumlah_pinjam: response.data.jumlah_pinjam,
            tanggal_mulai: response.data.tanggal_mulai,
            tanggal_selesai: response.data.tanggal_selesai,
            status: response.data.status,
            image: response.data.image,
            imageUrl: imageUrl,
          });

          console.log("Pinjam Barang Data:", response.data);
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
          setBarang((prevBarang) => ({
            ...prevBarang,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("barang_id", barang.barang_id);
    formData.append("user_id", barang.user_id);
    formData.append("jumlah_pinjam", barang.jumlah_pinjam);
    formData.append("tanggal_mulai", barang.tanggal_mulai);
    formData.append("tanggal_selesai", barang.tanggal_selesai);
    formData.append("status", barang.status);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/pinjambarangupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully");
      window.location.href = "/pbarang";
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className=" flex h-screen ">
      <Sidebar />

      <div class="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Sunting Peminjaman Barang
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
                        Nama Pengguna
                      </label>
                      <div className="mt-2">
                        <select
                          name="user_id"
                          value={barang.user_id}
                          disabled
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              user_id: e.target.value,
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredUser?.map((user) => (
                            <option
                              key={user.id}
                              value={user.id}
                              selected={user.id == barang.user_id}
                            >
                              {user.nama_user}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Barang
                      </label>
                      <div className="mt-2">
                        <select
                          name="barang_id"
                          value={barang.barang_id}
                          disabled
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              barang_id: e.target.value,
                            })
                          }
                          type="text"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredBarang.map((b) => (
                            <option
                              key={b.id}
                              value={b.id}
                              selected={b.id == barang.barang_id} // Use == instead of === for loose comparison
                            >
                              {b.nama_barang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Jumlah Pinjam Barang
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="jumlah_pinjam"
                          readOnly
                          value={barang.jumlah_pinjam}
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              jumlah_pinjam: e.target.value,
                            })
                          }
                          placeholder="Jumlah Pinjam"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tanggal Mulai
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_mulai"
                          readOnly
                          value={barang.tanggal_mulai}
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              tanggal_mulai: e.target.value,
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tanggal Selesai
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="tanggal_selesai"
                          value={barang.tanggal_selesai || ""}
                          onChange={(e) =>
                            setBarang({
                              ...barang,
                              tanggal_selesai: e.target.value || null, // set to null if the value is empty
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full ">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <select
                          name="status"
                          value={barang.status}
                          type="text"
                          onChange={(e) =>
                            setBarang({ ...barang, status: e.target.value })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option name="status" value="menunggu">
                            Menunggu
                          </option>
                          <option name="disetujui" value="disetujui">
                            Disetujui
                          </option>
                          <option name="dikembalikan" value="dikembalikan">
                            Dikembalikan
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className=" mb-32  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-10 py-12">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
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
