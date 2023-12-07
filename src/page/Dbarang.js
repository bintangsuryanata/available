import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import animatedSpinner from "../assets/loading.gif";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";
import { HiSelector } from "react-icons/hi";

const TABLE_HEAD = ["No", "Nama Barang", "Stok", "Status", "Aksi"];

export function Dbarang() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/barang", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchQuery || null,
            page: currentPage,
            limit: 5,
          },
        });

        if (response.data && response.data.data) {
          const { data, meta } = response.data;

          if (meta && typeof meta.total_pages !== "undefined") {
            setTotalPages(meta.total_pages);
          } else {
            console.warn(
              "Warning: 'meta' or 'total_pages' is missing or undefined.",
              response.data
            );
          }

          const filteredData = response.data.data.filter((item) =>
            item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setData((prevData) =>
            currentPage === 1 ? filteredData : filteredData
          );
        } else {
          console.error("Invalid data format in the response:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, searchQuery, currentPage]);

  const handleView = (id) => {
    window.location.href = `/detailbarang/${id}`;
  };

  const handleEdit = (id) => {
    window.location.href = `/ebarang/${id}`;
  };

  const handleDelete = async (id, nama_barang) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/barangdelete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Data Barang Berhasil Dihapus", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Error deleting resource");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-row">
      <Sidebar />
      <div className="p-4 w-full">
        <Card className="h-full w-full font-poppins p-6 px-32" shadow={false}>
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none mb-8 flex items-center justify-between gap-8 text-center" // Center the text
          >
            <div>
              <Typography className="text-3xl font-poppins">
                Data Barang
              </Typography>
            </div>
            <div className="flex gap-2">
              <a href="/tbarang">
                <Button className="flex items-center gap-3 font-normal bg-blue-600 text-sm">
                  Tambah Data
                </Button>
              </a>
            </div>
          </CardHeader>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex w-full flex-wrap items-center justify-end px-3">
              <div className="ml-5 flex w-[30%] items-center justify-end">
                <input
                  type="search"
                  className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-gray-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none"
                  placeholder="Cari"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <span
                  class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 "
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <CardBody className="overflow-scroll mt-4 px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-gray-100">
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer border-y border-blue-gray-100 ${
                        index === TABLE_HEAD.length - 1 ? "text-right" : ""
                      } bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-6 font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="text-center py-20"
                    >
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={animatedSpinner}
                          alt="Animated Spinner"
                          className="w-16 h-16" // Sesuaikan ukuran gambar sesuai kebutuhan
                        />
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="text-center py-10"
                    >
                      Data Tidak Ditemukan atau Tidak Ada
                    </td>
                  </tr>
                ) : (
                  data.map(({ id, nama_barang, stok, status }, index) => {
                    const isLast = index === data.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    const displayNumber = (currentPage - 1) * 5 + index + 1;

                    return (
                      <tr key={id}>
                        <td className={classes + " text-center"}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {displayNumber}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {nama_barang}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {stok}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              value={status}
                              className={
                                status === "ON"
                                  ? "rounded-2xl bg-green-400 text-white"
                                  : "rounded-2xl bg-red-400 text-white"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center gap-2">
                              <Button
                                className="flex items-center px-1 py-1 bg-blue-600 "
                                onClick={() => handleView(id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="text-white  w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </Button>
                              <a href={`/ebarang/${id}`}>
                                <Button
                                  className="flex items-center px-1 py-1 bg-green-600"
                                  onClick={() => handleDelete(id, nama_barang)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white  w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </Button>
                              </a>
                              <Button
                                className="flex items-center px-1 py-1 bg-red-600"
                                onClick={() => handleDelete(id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="text-white w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Halaman {currentPage} dari {totalPages}
            </Typography>
            <div className="flex gap-2 text-sm">
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
