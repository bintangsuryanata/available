import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import * as Components from "../Components";
import axios from "axios";
import "../login.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox } from "@material-tailwind/react";

function Login() {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama_user, setNama] = useState("");
  const [no_telp, setTelp] = useState("");
  const [nis_nip, setNIS] = useState("");

  const history = useHistory();
  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama_user", nama_user);
    formData.append("email", email);
    formData.append("no_telp", no_telp);
    formData.append("password", password);
    formData.append("nis_nip", nis_nip);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      localStorage.setItem("token", response.data.token);
      history.push("/");
      console.log(response);

      // Show success toast
      toast.success("Registrasi Berhasil", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "colored",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined, // Auto close the notification after 3 seconds
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  });
  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("http://127.0.0.1:8000/api/login", formData)
      .then(function (response) {
        console.log("login: ", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("Authenticated", true);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);
  const [signIn, toggle] = React.useState(true);
  return (
    <>
      {" "}
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form className="space-y-3" onSubmit={registerHandler}>
              <Components.Title className="text-4xl">Registrasi</Components.Title>
              <Components.Input
                type="text"
                placeholder="Nama Lengkap"
                name="name"
                className="rounded-xl text-base  "
                value={nama_user}
                onChange={(e) => setNama(e.target.value)}
              />
              <Components.Input
                type="number"
                placeholder="NIS/NIP"
                name="nis"
                className="rounded-xl text-base"
                value={nis_nip}
                onChange={(e) => setNIS(e.target.value)}
              />
              <Components.Input
                type="email"
                placeholder="Email"
                name="email"
                className="rounded-xl text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Components.Input
                type="number"
                placeholder="Nomor Telepon"
                name="notelp"
                className="rounded-xl text-base"
                value={no_telp}
                onChange={(e) => setTelp(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Kata Sandi"
                name="password"
                className="rounded-xl text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Components.Button type="submit" className="">
                Registrasi
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={loginHandler} className="space-y-3">
              <Components.Title className="text-4xl">Masuk</Components.Title>
              <Components.Input
                type="email"
                placeholder="Email"
                name="email"
                className="rounded-xl text-base  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* { {
                            validation.email (
                                <small className='text-red-600'>
                                    {validation.email[0]}
                                </small>
                            )
                        } } */}
              <Components.Input
                type="password"
                placeholder="Kata Sandi"
                name="password"
                className="rounded-xl text-base  "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* {
                            validation.password && (
                                <small className='text-red-600'>
                                    {validation.password[0]}
                                </small>
                            )
                        } */}
              {/* <button href='#' className="bg-[#13003C] text-white text-xs font-bold uppercase px-[45px] py-[12px] rounded-full">Sign In</button> */}
              <Components.Button type="submit">Masuk</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Available</Components.Title>
                <Components.Paragraph>
                  SMK Telkom Banjarbaru{" "}
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Masuk
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Selamat Datang Kembali !</Components.Title>
                <Components.Paragraph>
                  SMK Telkom Banjarbaru
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Registrasi
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      )}
    </>
  );
}

export default Login;
