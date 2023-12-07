import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, CardFooter } from "@material-tailwind/react";
import { format, parseISO } from "date-fns";
import idLocale from "../assets/tanggal";
import Sidebar from "../components/Sidebar";
import animatedSpinner from "../assets/loading.gif";
import * as XLSX from "xlsx"; // Import xlsx library
import ExcelJS from "exceljs";

export function Lmasuk() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/masuklaporan?tanggal_masuk=${startDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchQuery || null,
            page: currentPage,
            limit: 5,
          },
        }
      );

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

        const fetchDataDetails = async (item) => {
          try {
            const barangResponse = await axios.get(
              `http://127.0.0.1:8000/api/barang/${item.barang_id}`, // Replace with your actual API endpoint
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (barangResponse.data && barangResponse.data.nama_barang) {
              return {
                ...item,
                nama_barang: barangResponse.data.nama_barang,
              };
            } else {
              console.error(
                "Invalid data format in the barang response:",
                barangResponse
              );
              return null;
            }
          } catch (error) {
            console.error("Error fetching barang details:", error);
            return null;
          }
        };

        const fetchDataDetailsPromises =
          response.data.data.map(fetchDataDetails);
        const fetchedDataDetails = await Promise.all(fetchDataDetailsPromises);
        const filteredData = fetchedDataDetails.filter(Boolean);

        setData(filteredData);
      } else {
        console.error("Invalid data format in the response:", response);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, startDate, searchQuery]);

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
      fetchData();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setCurrentPage(1);
      await fetchData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayNumber = (currentPage, index) => {
    return (currentPage - 1) * 5 + index + 1;
  };

  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("BarangMasuk");

    // Define header style and column widths
    const headerCellStyle = {
      font: { bold: true, size: 14, color: { argb: "ffffff" } },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "ff3232" } },
      alignment: { horizontal: "left" },
    };

    const columnWidths = [5, 25, 25, 25]; // Adjust the widths as needed

    // Add headers with style and set column widths
    const headers = [
      "No",
      "Nama Barang",
      "Jumlah Barang Masuk",
      "Tanggal Masuk",
    ];
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell, colNumber) => {
      cell.style = headerCellStyle;
      worksheet.getColumn(colNumber).width = columnWidths[colNumber - 1];
    });

    // Add data
    data.forEach((item, index) => {
      const rowData = [
        displayNumber(currentPage, index),
        item.nama_barang,
        item.jumlah_masuk,
        format(parseISO(item.tanggal_masuk), "dd, MMMM yyyy", {
          locale: idLocale,
        }),
      ];

      const row = worksheet.addRow(rowData);
      row.eachCell((cell, colNumber) => {
        worksheet.getColumn(colNumber).width = columnWidths[colNumber - 1];
      });
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "barang_masuk.xlsx";
      link.click();
    });
  };

  return (
    <div className=" min-h-screen flex flex-row bg-gray-50 ">
      <Sidebar />
      <div className="p-4 w-full">
        <Card className="  bg-gray-50  font-poppins p-8 px-32 " shadow={false}>
          <div className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography className="text-3xl font-poppins ">
                  Laporan Barang Masuk
                </Typography>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg mt-6 py-6 ">
            <div className="flex items-center pl-10 justify-between ">
              <div>
                <p className="text-lg font-poppins ">
                  Masukan Tanggal Masuk
                </p>
              </div>
            </div>
            <hr class="h-px my-4 bg-gray-300 border-0 " />

            <div class=" px-40">
              <div class=" gap-x-8 gap-y-4 sm:grid-cols-6">
                <div className="">
                  <label className="block leading-6 text-gray-900">
                    Tanggal Masuk
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="tanggal_masuk"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full px-2 h-11 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div class="flex w-full py-5 flex-wrap items-center justify-end">
                <Button className="flex items-center  gap-3 font-normal  bg-blue-600 text-sm">
                  Kirim
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg  rounded-lg mt-6 py-6 ">
            <div className="flex items-center pl-10 justify-between ">
              <div>
                <p className="text-lg font-poppins ">
                  Laporan Data Barang Masuk
                </p>
              </div>
            </div>
            <hr class="h-px my-4 bg-gray-300 border-0 " />
            <div className="flex flex-col items-center justify-between gap-4 py-2 md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 pl-8 sm:flex-row">
                <Button
                  className="flex items-center gap-3  font-normal bg-yellow-400 text-sm"
                  onClick={exportToExcel}
                >
                  Ekspor Excel
                </Button>
              </div>
              <div class="flex w-full flex-wrap items-center justify-end px-3">
                <div class="ml-5 flex w-[30%] items-center justify-end">
                  <input
                    type="Cari"
                    class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-gray-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none "
                    placeholder="Search"
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

            <div class="flex flex-col">
              <div class="inline-block min-w-full py-6 sm:px-6 lg:px-8">
                <div class="overflow-scroll">
                  <table class="min-w-full  text-left text-sm font-light">
                    <thead class="border bg-neutral-100 font-medium ">
                      <tr>
                        <th scope="col" class="px-6 py-4">
                          No
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Nama Barang
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Jumlah Barang Masuk
                        </th>
                        <th scope="col" class="px-6 py-4">
                          Tanggal Masuk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-10">
                            Data Tidak Ditemukan atau Tidak Ada
                          </td>
                        </tr>
                      ) : (
                        data.map((data, index) => (
                          <tr className="border-b bg-neutral-50" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {displayNumber(currentPage, index)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {data.nama_barang}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {data.jumlah_masuk}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {format(
                                parseISO(data.tanggal_masuk),
                                "dd MMMM yyyy",
                                { locale: idLocale }
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>{" "}
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
