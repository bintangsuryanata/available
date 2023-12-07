import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./page/Home";
import { Pbarang } from "./page/Pbarang";
import { Pruangan } from "./page/Pruangan";
import { Bmasuk } from "./page/Bmasuk";
import { Tmasuk } from "./page/Tmasuk";
import { Brusak } from "./page/Brusak";
import { Trusak } from "./page/Trusak";
import { Dbarang } from "./page/Dbarang";
import { Druang } from "./page/Druang";
import { Eruang } from "./page/Eruang";
import { Duser } from "./page/Duser";
import { Euser } from "./page/Euser";
import { Tbarang } from "./page/Tbarang";
import { Ebarang } from "./page/Ebarang";
import { Detailbarang } from "./page/Detailbarang";
import { Detailuser } from "./page/Detailuser";
import { Detailruang } from "./page/Detailruang";
import Login from "./page/Login";
import { Truang } from "./page/Truang";
import { Lbarang } from "./page/Lbarang";
import { Lruang } from "./page/Lruang";
import { Lrusak } from "./page/Lrusak";
import { Lmasuk } from "./page/Lmasuk";
import { Erusak } from "./page/Erusak";
import { Detailrusak } from "./page/Detailrusak";
import { Tpbarang } from "./page/Tpbarang";
import { Epbarang } from "./page/Epbarang";
import { Epruang } from "./page/Epruang";
import { Detailpbarang } from "./page/Detailpbarang";
import { Tpruang } from "./page/Tpruang";
import { Detailpruang } from "./page/Detailpruang";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const Authenticated = localStorage.getItem("Authenticated") === "true";

  return (
    <>
      <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Home}>
            {Authenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/home">
            {Authenticated ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            {Authenticated ? <Home /> : <Login/>}
          </Route>

          {/* Table Data */}
          <Route exact path="/dbarang">
            {Authenticated ? <Dbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/druang">
            {Authenticated ? <Druang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/duser">
            {Authenticated ? <Duser /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/pbarang">
            {Authenticated ? <Pbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/pruangan">
            {Authenticated ? <Pruangan /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/bmasuk">
            {Authenticated ? <Bmasuk /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/brusak">
            {Authenticated ? <Brusak /> : <Redirect to="/login" />}
          </Route>


          {/* Tambah Data */}
          <Route exact path="/tbarang">
            {Authenticated ? <Tbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/Tmasuk">
            {Authenticated ? <Tmasuk /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/Trusak">
            {Authenticated ? <Trusak /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/truang">
            {Authenticated ? <Truang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tpbarang">
            {Authenticated ? <Tpbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tpruang">
            {Authenticated ? <Tpruang /> : <Redirect to="/login" />}
          </Route>

          {/* Edit Data */}
          <Route exact path="/ebarang/:id">
            {Authenticated ? <Ebarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/eruang/:id">
            {Authenticated ? <Eruang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/euser/:id">
            {Authenticated ? <Euser /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/erusak/:id">
            {Authenticated ? <Erusak /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/epbarang/:id">
            {Authenticated ? <Epbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/epruang/:id">
            {Authenticated ? <Epruang /> : <Redirect to="/login" />}
          </Route>



          {/* Detail Data */}
          <Route exact path="/detailbarang/:id">
            {Authenticated ? <Detailbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/detailruang/:id">
            {Authenticated ? <Detailruang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/detailuser/:id">
            {Authenticated ? <Detailuser /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/detailrusak/:id">
            {Authenticated ? <Detailrusak /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/detailpbarang/:id">
            {Authenticated ? <Detailpbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/detailpruang/:id">
            {Authenticated ? <Detailpruang /> : <Redirect to="/login" />}
          </Route>
         
         
         {/* Laporan */}
          <Route exact path="/lbarang">
            {Authenticated ? <Lbarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/lruang">
            {Authenticated ? <Lruang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/lrusak">
            {Authenticated ? <Lrusak /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/lmasuk">
            {Authenticated ? <Lmasuk /> : <Redirect to="/login" />}
          </Route>
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
