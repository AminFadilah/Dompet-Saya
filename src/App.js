import "./App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function App() {
  const [uangSekarang, setUangSekarang] = useState(0);
  const [persentase, setPersentase] = useState(0);
  const [pemasukan, setPemasukan] = useState(0);
  const [pengeluaran, setPengeluaran] = useState(0);
  const [jmltransaksiIN, setJmltransaksiIN] = useState(0);
  const [jmltransaksiOUT, setJmltransaksiOUT] = useState(0);
  const [transaksi, setTransaksi] = useState([
    {
      nominal: 1000000,
      deskripsi: "Menerima Gaji",
      tanggal: "1 July 2022",
      kategori: "IN",
    },
    {
      nominal: 50000,
      deskripsi: "Ngopi",
      tanggal: "2 July 2022",
      kategori: "OUT",
    },
  ]);

  const tambahItem = (objek) => {
    setTransaksi([...transaksi, objek]);
  };
  useEffect(() => {
    let nominalUangIN = transaksi.filter((item) => item.kategori === "IN");
    let uangIN = nominalUangIN.map((item) => item.nominal);
    let totalUangIN = uangIN.reduce((total, num) => total + num);

    let nominalUangOUT = transaksi.filter((item) => item.kategori === "OUT");
    let uangOUT = nominalUangOUT.map((item) => item.nominal);
    let totalUangOUT = uangOUT.reduce((total, num) => total + num);

    setPersentase((totalUangIN - totalUangOUT) / totalUangIN * 100);
    setUangSekarang(totalUangIN - totalUangOUT);
    setPemasukan(totalUangIN);
    setJmltransaksiIN(nominalUangIN.length);
    setPengeluaran(totalUangOUT);
    setJmltransaksiOUT(nominalUangOUT.length);
  });

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12"></div>
          <h1 className="title-1 fw-bold text-center">Dompet Saya</h1>
          <hr className="w-75 mx-auto" />
          <div className="text-center">
            <h2 className="fw-bold ">Rp. {uangSekarang},-</h2>
            <span className="title-3 ">Sisa uang kamu {persentase} % lagi</span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="card-wrapper p-4">
              <div className="icon-wrapper-in">
                <i className="bi bi-wallet2"></i>
              </div>
              <span className="title-3">Pemasukan</span>
              <h4 className="fw-bold">Rp. {pemasukan} ,-</h4>
              <div>
                <span className="nominal me-2">{jmltransaksiIN}</span>
                <span className="title-3">transaksi</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-wrapper p-4">
              <div className="icon-wrapper-out">
                <i className="bi bi-cash-stack"></i>
              </div>
              <span className="title-3">Pengeluaran</span>
              <h4 className="fw-bold">Rp. {pengeluaran} ,-</h4>
              <div>
                <span className="nominal me-2">{jmltransaksiOUT}</span>
                <span className="title-3">transaksi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h4>Ringkasan Transaksi</h4>
            <div className="button-wrapper d-flex">
              <ModalButton
                action={tambahItem}
                category="IN"
                variant="button-pemasukan me-2"
                content="Pemasukan"
                variantIcon="bi bi-plus-circle"
                contentHeader="Data Pemasukan"
              />
              <ModalButton
                action={tambahItem}
                category="OUT"
                variant="button-pengeluaran"
                content="Pengeluaran"
                variantIcon="bi bi-dash-circle"
                contentHeader="Data Pengeluaran"
              />
            </div>
          </div>
        </div>
        {transaksi.map((trans, index) => {
          return (
            <div key={index} className="row mt-2">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className={`${
                      trans.kategori === "IN"
                        ? "icon-wrapper-in"
                        : "icon-wrapper-out"
                    } me-2`}
                  >
                    <i
                      className={
                        trans.kategori === "IN"
                          ? "bi bi-wallet2"
                          : "bi bi-bag-dash"
                      }
                    ></i>
                  </div>
                  <div className="transaction">
                    <h6 className="title-2">{trans.deskripsi}</h6>
                    <span className="title-3">{trans.tanggal}</span>
                  </div>
                </div>
                <h4
                  className={`fw-bold ${
                    trans.kategori === "IN" ? "uang-masuk" : "uang-keluar"
                  }`}
                >
                  Rp. {trans.nominal} , -
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

function ModalButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    input.category = props.category;
  };

  const [input, setInput] = useState({
    deskripsi: "",
    nominal: 0,
    tanggal: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const tambahItem = () => {
    // Konversi tipe data properti nominal menjadi integer
    const nominalInt = parseInt(input.nominal);

    // Kirim data ke main function
    const fntambahItem = props.action;
    fntambahItem({
      ...input,
      nominal: nominalInt,
      kategori: input.category,
    });

    setShow(false);
  };

  return (
    <>
      <button className={props.variant} onClick={handleShow}>
        {props.content} <i className={props.variantIcon}></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.contentHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi"
                placeholder="Masukkan Deskripsi"
                value={input.deskripsi}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="number"
                name="nominal"
                placeholder="Masukkan Nominal"
                value={input.nominal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="tanggal"
                placeholder="DD/MM/YYYY"
                value={input.tanggal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Masukan kategori"
                value={input.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className={props.variant} onClick={tambahItem}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
