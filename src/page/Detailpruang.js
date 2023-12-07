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

export function Detailpruang() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [ruang, setRuang] = useState({
    ruang: [],
    ruang_id: "",
    user_id: "",
    tanggal_mulai: "",
    tanggal_selesai: null,
    status: "",
    image: null,
    imageUrl: "",
  });

  const [filteredRuang, setFilteredRuang] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    let imageUrl = "";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/pinjamruang/${id}`,
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
          setRuang({
            ruang_id: response.data.ruang_id,
            user_id: response.data.user_id,
            tanggal_mulai: response.data.tanggal_mulai,
            tanggal_selesai: response.data.tanggal_selesai,
            status: response.data.status,
            image: response.data.image,
            imageUrl: imageUrl,
          });

          console.log("Pinjam Ruang Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchAndSetData = async () => {
      try {
        const [ruangResponse, rusakResponse, userResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/ruang", {
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
        ]);

        const ruangData = ruangResponse.data.data || [];
        setFilteredRuang(ruangData);

        const selectedRuang = ruangData.find(
          (r) => r.id === rusakResponse?.ruang_id
        );

        if (selectedRuang) {
          setRuang((prevRuang) => ({
            ...prevRuang,
            ruang_id: selectedRuang.id,
          }));
        }

        // Assuming you want to do something similar for user data
        const userData = userResponse.data.data || [];
        setFilteredUser(userData);

        console.log("Filtered Ruang Data:", ruangData);
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
    formData.append("ruang_id", ruang.ruang_id);
    formData.append("user_id", ruang.user_id);
    formData.append("tanggal_mulai", ruang.tanggal_mulai);
    formData.append("tanggal_selesai", ruang.tanggal_selesai);
    formData.append("status", ruang.status);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/pinjamruangupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully");
      window.location.href = "/pruangan";
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
    }
  };

  const handleBack = () => {
    history.goBack(); // This will navigate back to the previous page
  };

  return (
    <div className=" flex  h-screen">
      <Sidebar />

      <div class="p-4 w-full">
        <Card className="  font-poppins p-8 px-24 " shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Rincian Peminjaman Ruangan
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className="mx-auto max-w-4xl">
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-8 px-10">
              <div className="flex items-center gap-x-6  ">
                <div className=" ">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Pengguna
                      </label>
                      <div className="mt-2">
                        <select
                          name="user_id"
                          value={ruang.user_id}
                          disabled
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
                              user_id: e.target.value,
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredUser?.map((user) => (
                            <option
                              key={user.id}
                              value={user.id}
                              selected={user.id == ruang.user_id}
                            >
                              {user.nama_user}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Ruangan
                      </label>
                      <div className="mt-2">
                        <select
                          name="ruang_id"
                          value={ruang.ruang_id}
                          disabled
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
                              ruang_id: e.target.value,
                            })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {filteredRuang.map((r) => (
                            <option
                              key={r.id}
                              value={r.id}
                              selected={r.id == ruang.ruang_id} // Use == instead of === for loose comparison
                            >
                              {r.nama_ruangan}
                            </option>
                          ))}
                        </select>
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
                          value={ruang.tanggal_mulai}
                          readOnly
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
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
                          readOnly
                          value={ruang.tanggal_selesai || ""}
                          onChange={(e) =>
                            setRuang({
                              ...ruang,
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
                          value={ruang.status}
                          type="text"
                          disabled
                          onChange={(e) =>
                            setRuang({ ...ruang, status: e.target.value })
                          }
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option className="text-gray-500">Status</option>
                          <option name="status" value="menunggu">
                            Menunggu
                          </option>
                          <option name="disetujui" value="disetujui">
                            Disetujui
                          </option>
                          <option name="dikembalikan" value="selesai">
                            Selesai
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className=" mb-14  flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-16 py-16">
                    <div className="text-center">
                      <div className="mt-4 mb-10 flex text-sm leading-6 text-gray-600">
                        {ruang.imageUrl && (
                          <img
                            src={ruang.imageUrl}
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
                  className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
