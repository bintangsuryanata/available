import Sidebar from "./Sidebar";
import { IoMdNotificationsOutline } from "react-icons/io";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Dashboard() {
  const [barangCount, setBarangCount] = useState(null);
  const [ruangCount, setRuangCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [pinjamBarangCount, setPinjambarangCount] = useState(null);
  const [pinjamRuangCount, setPinjamruangCount] = useState(null);
  const [barangMasukCount, setBarangmasukCount] = useState(null);
  const [barangRusakCount, setBarangrusakCount] = useState(null);

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token is missing.");
          return;
        }

        // Fetch count for Data Barang
        const barangResponse = await Axios.get(
          "http://127.0.0.1:8000/api/barangtotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch count for Data Ruang
        const ruangResponse = await Axios.get(
          "http://127.0.0.1:8000/api/ruangtotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userResponse = await Axios.get(
          "http://127.0.0.1:8000/api/usertotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pinjamBarangResponse = await Axios.get(
          "http://127.0.0.1:8000/api/pinjambarangtotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pinjamRuangResponse = await Axios.get(
          "http://127.0.0.1:8000/api/pinjamruangtotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const barangMasukResponse = await Axios.get(
          "http://127.0.0.1:8000/api/masuktotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const barangRusakResponse = await Axios.get(
          "http://127.0.0.1:8000/api/rusaktotal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBarangCount(barangResponse.data.count);
        setRuangCount(ruangResponse.data.count);
        setUserCount(userResponse.data.count);
        setPinjambarangCount(pinjamBarangResponse.data.count);
        setPinjamruangCount(pinjamRuangResponse.data.count);
        setBarangmasukCount(barangMasukResponse.data.count);
        setBarangrusakCount(barangRusakResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-row">
        <Sidebar />
        <div class="p-6 sm:p-10  space-y-6">
          <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6">
              <h1 class="text-4xl font-semibold mb-2">Selamat Datang Di Halaman Utama</h1>
            </div>
          </div>
          <section class="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            <a href="/dbarang">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16  bg-blue-100 rounded-full mr-6">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzklEQVR4nO2VwQrCMAyG+xIOvAiNHvU9HD6XlwR9Bh9EfQgdeFebTvHuUclsQcS5dniZ7ocSKOX7k5SmSv2cgOxEIx+B+BazNPEBiNNKA3cwCg7eBHkfUEE9OLj1BwbNFzT+DqA1qFL7DkSDKXc0mhXM8pF6VfXENCcgO1Sf4dvHCDfrKANNfPFwiRp5KcC38CLaJM4AzcKfk+yKfTQbAQfBAz6cax957CpINJnMA5/akpXCXQVpHRMIgdeRtEbaBMi73vzc/SrcS7Iuy/wO1VGReiPByQUAAAAASUVORK5CYII=" />
                </div>
                <div>
                  <span className="inline-block text-2xl font-bold">
                    {barangCount}
                  </span>
                  <span class="block text-gray-500">Data Barang</span>
                </div>
              </div>
            </a>
            <a href="/druang">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA9UlEQVR4nGNgGHZAaEfbf0oww6gFQoM+iIY+EBpNptQLotb7wttbs/m2NSvL76/nENjSLA/iU8UCwR2tu/n31wsQNIwsC7a3PYIZLrCjzUdwR+spwe2tXyB0izcDtYDAjjYfbA4Q3tEaQBULBLe3nYYEV7OV4LYOG3jwbW87iVcjwaJgVT0b2IIdrZ/ABm7rsBHY3mqLFD+fKLKAf3u7ArIPsOCLFFkgDE2KoAjFngha/wltb8sj2wKh7a0PBXd38MMsAYW54Pa2zyCXgw2HWbKjNZc8C3aAwrltj9C2ej5Mva25RFlCCUC3hOoWgIDgzvY0mCUAVQtgu2ztJxQAAAAASUVORK5CYII=" />
                </div>
                <div>
                  <span class="block text-2xl font-bold">{ruangCount}</span>
                  <span class="block text-gray-500">Data Ruang</span>
                </div>
              </div>
            </a>
            <a href="/duser">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block text-2xl font-bold">{userCount}</span>
                  <span class="block text-gray-500">Data Pengguna</span>
                </div>
              </div>
            </a>
            <a href="/pbarang">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="100"
                    viewBox="0 0 128 128"
                    fill="#228BE6"
                  >
                    <path d="M125,28.7l-33.8-12c-0.8-0.3-1.6-0.2-2.3,0.1C87.8,17.3,29,38.1,29,38.1c-1.5,0.5-2.5,1.9-2.5,3.5v14c0,1.3,0.8,2.4,2,2.8 l7.8,2.8c2,0.7,4-0.7,4-2.8V46.7c0-1.6,1-3,2.5-3.5l53.1-18.4l19.2,6.8L63,49.9c0,0,0,0,0,0c-1.1,0.4-2,1.5-2,2.8v60.8L7,94.4V33.6 l58-20.5c1.6-0.6,2.4-2.3,1.8-3.8c-0.6-1.6-2.3-2.4-3.8-1.8L3,28.7c-1.2,0.4-2,1.6-2,2.8v65c0,1.3,0.8,2.4,2,2.8l60,21.2 c0.3,0.1,0.7,0.2,1,0.2c0.2,0,0.3,0,0.5,0c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.4-0.1c0,0,0,0,0,0l60-21.2c1.2-0.4,2-1.6,2-2.8v-65 c0,0,0,0,0,0C127,30.2,126.2,29.1,125,28.7z"></path>
                  </svg>
                </div>
                <div>
                  <span class="inline-block text-2xl font-bold">
                    {pinjamBarangCount}
                  </span>
                  <span class="block text-gray-500">Pinjam Barang</span>
                </div>
              </div>
            </a>
            <a href="/pruangan">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACbklEQVR4nO2Wv2tUQRDH16jEoJjcm3lEJSJCLDSFRQotLC0stEwlRKsUYgJBUDBvZm0UUygE0qRNJfoHCEY7wUK00sIfaQymMSmEIOLNZmXeuxz3cu/dvZO7BOEGFh6735n97Ow8dozp2v9m3h5F4XDMMS4Iw6owrjmGp0I44S0ca/+GY2avJxwVhjvC8FoInWP0eUMIPzrCh2UbXPQTZv8/njI8IlF43RE8EcL11AYMvxzBcyGcqtl0Kp7TtTTMehyDg2sas+nGjvCBMLwXxs10IPjkGObKNrzkp4f6qvrKehV8eqhPNapNfGrBcVMI3jmG+/kAXHtKXNK0+yg43Uyfm8mZwZNaG5Ua+dlMb7YEfnK4t2m6CgCkYCaHewsDmILWdr3LEfhbgwfLFi87wvkdB3BJLfzOXMvWzyusQrcHgNP/eVF9DE24tGsArqA+ZV0A1ySlwvhhx69ACN8IwW0f4aki+rYDNLJdA/D2cCBRMF69migY17mOAviZ0nGh4KYjfCWE5Yw+QOdethXA2+CMEN4Vwre1T7Qw/nGML4Tgho74O5mra1B8VBppGcAxzta/57DhCJ4Jw1Vv+wfqr6V/QNcqmo10duJYs60A+MpJ1xzhovaA3oaHch3rYE4c0JYsbkwYVhtdS8qEYHkbwDfH8MhTcM4bs8cUNNWqj/omMVLZWG7sHJVGHME9IfiSATPnbXghD6bqy/C5Vd/sU9jgvCN4LIQr2+rhq/Z2PgrP6tDvZC71V6yor8ZoJXu5pq150mzi96xqr6T3h9ZM3JJb02M6Yd6aHk3lVoElrTculgmueGv2dWTTrpkO2l8YGneAt8pOtgAAAABJRU5ErkJggg==" />
                </div>
                <div>
                  <span class="block text-2xl font-bold">
                    {pinjamRuangCount}
                  </span>
                  <span class="block text-gray-500">Pinjam Ruangan</span>
                </div>
              </div>
            </a>
            <a href="/bmasuk">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block text-2xl font-bold">
                    {barangMasukCount}
                  </span>
                  <span class="block text-gray-500">Barang Masuk</span>
                </div>
              </div>
            </a>
            <a href="/brusak">
              <div class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
                <div>
                  <span class="inline-block text-2xl font-bold">
                    {barangRusakCount}
                  </span>
                  <span class="block text-gray-500">Barang Rusak</span>
                </div>
              </div>
            </a>
          </section>
          {/* <section class="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
                        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                            <div class="px-6 py-5 font-semibold border-b border-gray-100">Your insights will appear here soon.</div>
                            <div class="p-4 flex-grow">
                                <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                            </div>
                        </div>


                        <div class="row-span-3 bg-white shadow rounded-lg">
                            <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                                <span>Users By Country ID</span>
                                <button type="button" class="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                    USERS
                                    <svg class="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                           
                        </div>
                        <div class="flex flex-col row-span-3 bg-white shadow rounded-lg">
                            <div class="px-6 py-5 font-semibold border-b border-gray-100">WHAT ARE YOUR TOP CAMPAIGNS?</div>
                            <div class="p-4 flex-grow">
                                <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                            </div>
                        </div>
                    </section> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
