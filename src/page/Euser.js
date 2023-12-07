import { useHistory } from "react-router-dom";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export function Euser() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    nama_user: "",
    nis_nip: "",
    no_telp: "",
    email: "",
    role: "",
    status: "",
  });

  const { id } = useParams();

  const handleFileChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("nama_user", user.nama_user);
    formData.append("nis_nip", user.nis_nip);
    formData.append("no_telp", user.no_telp);
    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("status", user.status);

    const token = localStorage.getItem("token");

    try {
      await axios.post(`http://127.0.0.1:8000/api/userupdate/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data updated successfully");
      window.location.href = "/duser";
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
          `http://127.0.0.1:8000/api/user/${id}`,
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
          setUser({
            nama_user: response.data.nama_user,
            nis_nip: response.data.nis_nip,
            no_telp: response.data.no_telp,
            email: response.data.email,
            role: response.data.role,
            status: response.data.status,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
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
                  Sunting Data Pengguna
                </Typography>
              </div>
            </div>
          </CardHeader>

          <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="bg-gray-100 shadow rounded-lg py-2 space-y-8 px-10">
              <div className="flex items-center gap-x-6 grid grid-cols-2  ">
                <div className=" ">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nama Pengguna
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nama_user"
                          placeholder="Nama Pengguna"
                          value={user.nama_user}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              nama_user: e.target.value,
                            })
                          }
                          className="block w-full pl-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        NIS/NIP
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nis_nip"
                          placeholder="Nis / Nip"
                          value={user.nis_nip}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              nis_nip: e.target.value,
                            })
                          }
                          className="block w-full pl-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Peran
                      </label>
                      <div className="mt-2">
                        <select
                          name="status"
                          value={user.role}
                          onChange={(e) =>
                            setUser({ ...user, role: e.target.value })
                          }
                          type="text"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Pilih Peran</option>
                          <option value="admin">Admin</option>
                          <option value="guest">Guest</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <select
                          name="status"
                          value={user.status}
                          onChange={(e) =>
                            setUser({ ...user, status: e.target.value })
                          }
                          type="text"
                          className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option className="text-gray-500">Status</option>
                          <option value="On">ON</option>
                          <option value="Off">OFF</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="mb-14 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nama_user"
                          placeholder=""
                          value={user.email}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              email: e.target.value,
                            })
                          }
                          className="block w-full pl-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Nomor Telepon
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="no_telp"
                          placeholder=""
                          value={user.no_telp}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              no_telp: e.target.value,
                            })
                          }
                          className="block w-full pl-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
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
