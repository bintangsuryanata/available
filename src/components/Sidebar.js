import React, { useState, useEffect } from "react";
import "../style.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {
  BsArrowLeftShort,
  BsFillImageFill,
  BsFillBoxSeamFill,
  BsFillClipboard2CheckFill,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { BiChevronDown, BiSolidUserCheck } from "react-icons/bi";
import { RiArchiveLine, RiHomeOfficeLine, AiOutlineMail } from "react-icons/ri";
import { ImFilesEmpty } from "react-icons/im";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  var token = localStorage.getItem("token");

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get("http://127.0.0.1:8000/api/logout")
      .then(() => {
        localStorage.clear();
        window.location = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [imageUrl, setImageUrl] = useState('https://smktelkom-pwt.sch.id/wp-content/uploads/2019/02/logo-telkom-schools-bundar-1024x1024.png');

  const changeImageUrl = () => {
    setImageUrl('https://smktelkom-pwt.sch.id/wp-content/uploads/2019/02/logo-telkom-schools-bundar-1024x1024.png');
  };
  return (
    <div className="flex ">
      <div
        className={`bg-alo p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-alo text-3xl rounded-full absolute -right-3 top-9 border border-alo cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex ">
        <img src={imageUrl} className=" w-10 h-10 rounded-full cursor-pointer block float-left mr-2 duration-500 " alt="Dynamic Image" />
          <h1
            className={`text-white mt-2 origin-left font-poppins text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Admin
          </h1>
        </div>
        <ul className="pt-2">
          <a href="/">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <span className="text-2xl block float-left">
                <RxDashboard />
              </span>
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Halaman Utama
              </span>
            </li>
          </a>
        </ul>
        <ul className="pt-2">
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
            <span className="text-2xl block float-left">
              <FaUsers />
            </span>
            <span className={`text-base flex-1 ${!open && "hidden"}`}>
              Data Master
            </span>
            <span>
              <BiChevronDown
                className={`${submenuOpen && "rotate-180"} ${
                  !open && "hidden"
                }`}
                onClick={() => setSubmenuOpen(!submenuOpen)}
              />
            </span>
          </li>
          {submenuOpen && (
            <ul>
              <a href="/dbarang">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  Data Barang
                </li>
              </a>
              <a href="/druang">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Data Ruangan
                </li>
              </a>
              <a href="/duser">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Data Pengguna
                </li>
              </a>
            </ul>
          )}
        </ul>
        <ul className="pt-2">
          <a href="/pbarang">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <span className="text-2xl block float-left">
                <RiArchiveLine />
              </span>
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Peminjaman Barang
              </span>
            </li>
          </a>
        </ul>
        <ul className="pt-2">
          <a href="/pruangan">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <span className="text-2xl block float-left">
                <RiHomeOfficeLine />
              </span>
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Peminjaman Ruangan
              </span>
            </li>
          </a>
        </ul>
        <ul className="pt-2">
          <a href="/bmasuk">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <span className="text-2xl block float-left">
                <FaBoxOpen />
              </span>
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Barang Masuk
              </span>
            </li>
          </a>
        </ul>
        <ul className="pt-2">
          <a href="/brusak">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <span className="text-2xl block float-left">
                <HiOutlineArchiveBoxXMark />
              </span>
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Barang Rusak
              </span>
            </li>
          </a>
        </ul>
        <ul className="pt-2">
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
            <span className="text-2xl block float-left">
              <ImFilesEmpty />
            </span>
            <span className={`text-base flex-1 ${!open && "hidden"}`}>
              Laporan
            </span>
            <span>
              <BiChevronDown
                className={`${subMenuOpen && "rotate-180"} ${
                  !open && "hidden"
                }`}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
              />
            </span>
          </li>
          {subMenuOpen && (
            <ul>
              <a href="/lbarang">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Peminjaman Barang
                </li>
              </a>
              <a href="/lruang">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Peminjaman Ruangan
                </li>
              </a>
              <a href="/lmasuk">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Barang Masuk
                </li>
              </a>
              <a href="/lrusak">
                <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
                  {" "}
                  Barang Rusak
                </li>
              </a>
            </ul>
          )}
        </ul>

        <ul className="pt-56">
          <a onClick={logoutHandler}>
            <li className=" text-gray-300 border-2 border-gray-600 text-sm flex items-center gap-x-4 p-2 hover:bg-[#402281] rounded-md mt-2">
              <FiLogOut className="text-white text-2xl block float-left " />
              <span className={`text-base flex-1 ${!open && "hidden"}`}>
                Keluar
              </span>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
