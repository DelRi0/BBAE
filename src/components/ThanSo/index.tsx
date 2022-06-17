import React, { useState } from "react";
import { Button, Input, DatePicker, Form } from "antd";
import lodash from "lodash";
import moment from "moment";
import styles from "./thanso.module.scss";
import MaskedInput from "antd-mask-input";
import SignatureCanvas from "react-signature-canvas";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

let sigPad: any = {};

const ThanSo = () => {
  const dateFormat = "DD/MM/YYYY";
  const [baihoc, setBaihoc] = useState(null);
  const [noNghiepBaihocDuongDoi, setNoNghiepBaihocDuongDoi] = useState(null);
  const [nangLucTuNhien, setNangLucTuNhien] = useState(null);
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState(moment(new Date(), dateFormat));
  const [nangLucTiepCan, setNangLucTiepCan] = useState(null);
  const [dongLucThoaMan, setDongLucThoaMan] = useState(null);
  const [thaiDoBenNgoai, setThaiDoBenNgoai] = useState(null);
  const [dongLucTiepCan, setDongLucTiepCan] = useState(null);
  const [namThanSoHienTai, setNamThanSoHienTai] = useState(null);
  const [namThanSoTiepTheo, setNamThanSoTiepTheo] = useState(null);
  const arrConSo = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [noBaiHoc, setNoBaiHoc] = useState([]);
  const [chiSoCanBang, setChiSoCanBang] = useState(null);
  const [chiSoPhatTrien, setChiSoPhatTrien] = useState(null);
  const [thanhPhanNoiTroi, setThanhPhanNoiTroi] = useState([]);
  const [baGiaiDoan, setBaGiaiDoan] = useState({});
  const [bonGiaiDoan, setBonGiaiDoan] = useState({});
  const [chiSoNgaySinh, setChiSoNgaySinh] = useState(null);

  const tinhRutGon = (conSoInput: number): number => {
    let conSoRutGon = 0;
    if (conSoInput !== 11 && conSoInput !== 22) {
      conSoInput
        .toString()
        .split("")
        .map((item) => {
          conSoRutGon += parseInt(item);
        });
    } else {
      conSoRutGon = conSoInput;
    }
    if (conSoRutGon === 10) {
      conSoRutGon = 1;
    } else if (conSoRutGon < 10 || conSoRutGon === 11 || conSoRutGon === 22) {
      conSoRutGon = conSoRutGon;
    } else {
      let conSoRutGon2 = 0;
      conSoRutGon
        .toString()
        .split("")
        .map((item) => {
          conSoRutGon2 += parseInt(item);
        });
      conSoRutGon = conSoRutGon2;
    }
    return conSoRutGon;
  };

  const convertUnicode = (text) => {
    let str = "";
    if (text) {
      if (typeof text !== "string") {
        str = text.toString();
      } else {
        str = text;
      }
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
      str = str.replace(/Đ/g, "d");
    }
    return str.trim();
  };

  const convertNameToNumber = (text) => {
    let str = text;
    str = str.replace(/a|A|j|J|s|S/g, "1");
    str = str.replace(/b|B|k|K|t|T/g, "2");
    str = str.replace(/c|C|l|L|u|U/g, "3");
    str = str.replace(/d|D|m|M|v|V/g, "4");
    str = str.replace(/e|E|n|N|w|W/g, "5");
    str = str.replace(/f|F|o|O|x|X/g, "6");
    str = str.replace(/g|G|p|P|y|Y/g, "7");
    str = str.replace(/h|H|q|Q|z|Z/g, "8");
    str = str.replace(/i|I|r|R/g, "9");
    return str;
  };

  const tinhKyTu = (fullName) => {
    let name = convertUnicode(fullName);
    let nameWithNumber = convertNameToNumber(name).split(" ");
    let tongTen = 0;
    nameWithNumber.map((itemTen) => {
      let tenDon = 0;
      itemTen.split("").map((item) => {
        tenDon += parseInt(item);
      });
      tenDon = tinhRutGon(tenDon);
      if (tenDon < 10 || tenDon === 11 || tenDon === 22) {
        tongTen += tenDon;
      } else if (nameWithNumber.length > 1) {
        tongTen +=
          parseInt(tenDon.toString().split("")[0]) +
          parseInt(tenDon.toString().split("")[1]);
      } else {
        tongTen = tenDon;
      }
    });
    return convertValue(tongTen);
  };

  const tinhChiSoNgaySinh = (birthDay) => {
    if (birthDay) {
      let thongTinNgaySinh = tinhThongTinNgaySinh();
      let baGiaiDoan = tinh3GiaiDoan(thongTinNgaySinh.baiHoc);
      let bonGiaiDoan = tinh4GiaiDoan(thongTinNgaySinh.baiHoc);
      let namThanSo = tinhNamThanSo(
        thongTinNgaySinh.ngaySinhRutGon + thongTinNgaySinh.thangSinhRutGon
      );
      setBaihoc(thongTinNgaySinh.baiHoc);
      setNoNghiepBaihocDuongDoi(thongTinNgaySinh.noNghiepDuongDoi);
      setNamThanSoHienTai(namThanSo.namThanSoHienTai);
      setNamThanSoTiepTheo(namThanSo.namThanSoTiepTheo);
      setBaGiaiDoan(baGiaiDoan);
      setBonGiaiDoan(bonGiaiDoan);
      setChiSoNgaySinh(thongTinNgaySinh.ngaySinhRutGon);
    }
  };

  const tinhThongTinNgaySinh = () => {
    let birthDate = moment(birthDay, dateFormat);
    if (birthDate) {
      let ngaySinhRutGon = 0,
        thangSinhRutGon = 0,
        namSinhRutGon = 0;
      ngaySinhRutGon = tinhRutGon(birthDate.date());
      thangSinhRutGon = tinhRutGon(birthDate.month() + 1);
      namSinhRutGon = tinhRutGon(birthDate.year());
      let tongNgaySinh = ngaySinhRutGon + thangSinhRutGon + namSinhRutGon;
      let baiHoc = 0;
      let noNghiepDuongDoi = "";
      if (tongNgaySinh < 10 || tongNgaySinh === 11 || tongNgaySinh === 22) {
        baiHoc = tongNgaySinh;
      } else if (tongNgaySinh === 10) {
        baiHoc = 1;
      } else {
        let conSoRutGon2 = 0;
        tongNgaySinh
          .toString()
          .split("")
          .map((item) => {
            conSoRutGon2 += parseInt(item);
          });
        noNghiepDuongDoi = tongNgaySinh.toString();
        tongNgaySinh = tinhRutGon(conSoRutGon2);
        baiHoc = tongNgaySinh;
      }

      return { noNghiepDuongDoi, baiHoc, ngaySinhRutGon, thangSinhRutGon };
    }
  };

  const tinhMoc3GiaiDoanBaiHocNhanCach = (baiHocDuongDoi): object => {
    let giaiDoan1 = 0;
    let giaiDoan2 = 0;
    if (baiHocDuongDoi < 5 || baiHocDuongDoi === 11 || baiHocDuongDoi === 22) {
      giaiDoan1 = 27 - baiHocDuongDoi;
      giaiDoan2 = giaiDoan1 + 27;
    } else if (baiHocDuongDoi >= 5 && baiHocDuongDoi <= 9) {
      giaiDoan1 = 36 - baiHocDuongDoi;
      giaiDoan2 = giaiDoan1 + 27;
    } else {
      giaiDoan1 = 27 - baiHocDuongDoi;
      giaiDoan2 = giaiDoan1 + 27;
    }
    return { giaiDoan1, giaiDoan2 };
  };

  const tinh4GiaiDoan = (baiHocDuongDoi): object => {
    // giai doan 1 bang ngay sinh rut gon + thang sinh rut gon
    // giai doan 2 bang ngay sinh rut gon + nam sinh rut gon
    // giai doan 3 bang giai doan 1 + giai doan 2
    // giai doan 4 bang thang sinh rut gon + nam sinh rut gon
    // let arrBirthDay = birthDay.split("/");
    let birthDate = moment(birthDay, dateFormat);
    let ngaySinhRutGon = tinhRutGon(birthDate.date());
    let thangSinhRutGon = tinhRutGon(birthDate.month() + 1);
    let namSinhRutGon = tinhRutGon(birthDate.year());
    let giaiDoan1 = tinhRutGon(ngaySinhRutGon + thangSinhRutGon);
    let giaiDoan2 = tinhRutGon(ngaySinhRutGon + namSinhRutGon);
    let giaiDoan3 = tinhRutGon(giaiDoan1 + giaiDoan2);
    let giaiDoan4 = tinhRutGon(thangSinhRutGon + namSinhRutGon);
    let baiHoc4GiaiDoan = { giaiDoan1, giaiDoan2, giaiDoan3, giaiDoan4 };
    let mocThoiGian = {
      giaiDoan1: 36 - baiHocDuongDoi,
      giaiDoan2: 36 - baiHocDuongDoi + 9,
      giaiDoan3: 36 - baiHocDuongDoi + 18,
    };
    return { baiHoc4GiaiDoan, mocThoiGian };
  };

  const tinh3GiaiDoan = (baiHocDuongDoi) => {
    // let birthDate = birthDay;
    let birthDate = moment(birthDay, dateFormat);
    if (birthDate) {
      // let arrBirthDay = birthDay.split("/");
      let giaiDoan1 = tinhRutGon(birthDate.month() + 1);
      let giaiDoan2 = tinhRutGon(birthDate.date());
      let giaiDoan3 = tinhRutGon(birthDate.year());
      let baiHocNhanCach3GiaiGoan = { giaiDoan1, giaiDoan2, giaiDoan3 };
      let moc3GiaiDoan = tinhMoc3GiaiDoanBaiHocNhanCach(baiHocDuongDoi);
      return { moc3GiaiDoan, baiHocNhanCach3GiaiGoan };
    }
    return {};
  };

  const tinhNoBaiHoc = (fullName) => {
    let name = convertUnicode(fullName).replaceAll(" ", "");
    let nameWithNumber = lodash.orderBy(convertNameToNumber(name).split(""));
    let arrNoBaiHoc = [];
    arrConSo.map((item) => {
      if (!lodash.includes(nameWithNumber, item)) {
        arrNoBaiHoc.push(item);
      }
      return item;
    });
    return arrNoBaiHoc;
  };

  const tinhThanhPhanNoiTroi = (fullName) => {
    let name = convertUnicode(fullName).replaceAll(" ", "");
    let nameWithNumber = lodash.orderBy(convertNameToNumber(name).split(""));
    let arrThanhPhanNoiTroi = [];
    arrConSo.map((item) => {
      let count = lodash.countBy(nameWithNumber)[item];
      if (count >= 3) {
        arrThanhPhanNoiTroi.push(item);
      }
      return item;
    });
    return arrThanhPhanNoiTroi;
  };

  const tinhNamThanSo = (baiHocDuongDoi: number) => {
    var year = moment().year();
    let namThanSoHienTai = tinhTongDaySoVeMotSo(year + baiHocDuongDoi);
    let namThanSoTiepTheo = tinhTongDaySoVeMotSo(namThanSoHienTai + 1);

    return { namThanSoHienTai, namThanSoTiepTheo };
  };

  const tinhChiSoCanBang = (fullName) => {
    let name = convertUnicode(fullName);
    let nameWithNumber = lodash.orderBy(convertNameToNumber(name).split(" "));
    let arrKyTuDauTien = [];
    nameWithNumber.map((item) => {
      arrKyTuDauTien.push(item[0]);
    });
    let joinStringToNumber = parseInt(arrKyTuDauTien.join(""));
    let chiSoCanBang = tinhTongDaySoVeMotSo(joinStringToNumber);
    return chiSoCanBang;
  };

  const tinhTongDaySoVeMotSo = (number: number) => {
    let tong = 0;
    number
      .toString()
      .split("")
      .map((item) => {
        tong += parseInt(item);
      });
    if (tong > 9) {
      tong = tinhTongDaySoVeMotSo(tong);
    }
    return tong;
  };

  const kiemTraYPhuAm = (valueCheck) => {
    if (
      valueCheck === "u" ||
      valueCheck === "e" ||
      valueCheck === "o" ||
      valueCheck === "a" ||
      valueCheck === "i"
    ) {
      return false;
    }
    return true;
  };

  const tinhNguyenAmTheoTen = (arrTen) => {
    let nguyenAm = "";
    let phuAm = "";
    arrTen = convertUnicode(arrTen);
    arrTen.split("").map((item, index) => {
      if (item === " ") {
        phuAm += item;
        nguyenAm += item;
      } else if (item === "y") {
        if (
          !kiemTraYPhuAm(arrTen[index - 1] ? arrTen[index - 1] : "c") ||
          !kiemTraYPhuAm(arrTen[index + 1] ? arrTen[index + 1] : "c")
        ) {
          // y la phu am
          phuAm += item;
        } else {
          // y la nguyen am
          nguyenAm += item;
        }
      } else if (kiemTraYPhuAm(item)) {
        // day la phu am
        phuAm += item;
      } else {
        // day la nguyen am
        nguyenAm += item;
      }
    });
    return { phuAm, nguyenAm };
  };

  const tinhChiSoTheoTen = (fullName) => {
    let arrFullName = fullName.split(" ");
    let tenRieng = lodash.last(arrFullName);
    let valueTenTieng = tinhNguyenAmTheoTen(tenRieng);
    let valueFullName = tinhNguyenAmTheoTen(fullName);

    let dongLucThoaMan = tinhKyTu(valueFullName.nguyenAm);
    let thaiDoBenNgoai = tinhKyTu(valueFullName.phuAm);
    let nangLucTuNhien = tinhKyTu(fullName);
    let nangLucTiepCan = tinhKyTu(tenRieng);
    let dongLucTiepCan = tinhKyTu(valueTenTieng.nguyenAm);
    let chiSoCanBang = tinhChiSoCanBang(fullName);
    let noBaiHoc = tinhNoBaiHoc(fullName);
    let thanhPhanNoiTroi = tinhThanhPhanNoiTroi(fullName);
    setNangLucTuNhien(nangLucTuNhien);
    setNangLucTiepCan(nangLucTiepCan);
    setThaiDoBenNgoai(thaiDoBenNgoai);
    setDongLucTiepCan(dongLucTiepCan);
    setDongLucThoaMan(dongLucThoaMan);
    setNoBaiHoc(noBaiHoc);
    setChiSoCanBang(chiSoCanBang);
    setChiSoPhatTrien(nangLucTiepCan);
    setThanhPhanNoiTroi(thanhPhanNoiTroi);
  };

  const convertValue = (value: number) => {
    if (value === 19) {
      return "19 - 1";
    } else if (value === 10) {
      return "1";
    } else if (value < 10 || value === 11 || value === 22) {
      return value.toString();
    } else {
      let dataSplit = value.toString().split("");
      let totalData = parseInt(dataSplit[0]) + parseInt(dataSplit[1]);
      let dataResult =
        value.toString() + " - " + (totalData === 10 ? "1" : totalData);
      return dataResult;
    }
  };

  const onClickTinhToan = (values: any) => {
    tinhChiSoTheoTen(values.username);
    tinhChiSoNgaySinh(values.birthDay);
  };

  const handleOnchangeBirthDay = (value) => {
    let valueFormat = moment(value, dateFormat);
    setBirthDay(valueFormat);
  };

  const handleOnchangeFullName = (value) => {
    setFullName(value);
  };
  const clear = () => {
    sigPad.clear();
  };

  return (
    <div
      style={{
        display: "flex",
        // backgroundColor: "rgb(0 0 0 / 5%)",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div style={{ marginRight: 100 }}>
        <div style={{ marginTop: 15 }}>
          <div className={styles.chiSo}>{`Bài học đường đời: ${
            noNghiepBaihocDuongDoi ? `${noNghiepBaihocDuongDoi} - ` : ""
          } ${baihoc ? baihoc : ""}`}</div>
          <div className={styles.chiSo}>{`Năng lực tự nhiên: ${
            nangLucTuNhien ? nangLucTuNhien : ""
          }`}</div>
          <div className={styles.chiSo}>{`Phản ứng ban đầu: ${
            nangLucTiepCan ? nangLucTiepCan : ""
          }`}</div>
          <div className={styles.chiSo}>{`Thái độ thể hiện: ${
            thaiDoBenNgoai ? thaiDoBenNgoai : ""
          }`}</div>
          <div className={styles.chiSo}>{`Động lực ban đầu: ${
            dongLucTiepCan ? dongLucTiepCan : ""
          }`}</div>
          <div className={styles.chiSo}>{`Động lực bên trong: ${
            dongLucThoaMan ? dongLucThoaMan : ""
          }`}</div>
          <div className={styles.chiSo}>{`Cân bằng nội tâm: ${
            chiSoCanBang ? chiSoCanBang : ""
          }`}</div>
          <div className={styles.chiSo}>{`Chỉ số dẫn đường: ${
            chiSoPhatTrien ? chiSoPhatTrien : ""
          }`}</div>
          <div className={styles.chiSo}>{`Năng lượng ngày sinh: ${
            chiSoNgaySinh ? chiSoNgaySinh : ""
          }`}</div>
          <div className={styles.chiSo}>{`Năm thần số ${moment().year()}: ${
            namThanSoHienTai ? namThanSoHienTai : ""
          }`}</div>
          <div className={styles.chiSo}>{`Năm thần số ${moment().year() + 1}: ${
            namThanSoTiepTheo ? namThanSoTiepTheo : ""
          }`}</div>
          {thanhPhanNoiTroi.length ? (
            <div className={styles.chiSo}>
              <span>{`Chỉ số năng lượng nổi trội: ${thanhPhanNoiTroi.toString()}`}</span>
            </div>
          ) : null}
          {noBaiHoc.length ? (
            <div>
              <div className={styles.chiSo}>
                <span>{`Chỉ số thiếu: ${noBaiHoc.toString()}`}</span>
              </div>
            </div>
          ) : null}
          <br></br>
          {baGiaiDoan.moc3GiaiDoan ? (
            <div>
              <div
                className={styles.chiSo}
              >{`Giai đoạn đức tính từ 0 - ${lodash.get(
                baGiaiDoan,
                "moc3GiaiDoan.giaiDoan1"
              )} tuổi: ${lodash.get(
                baGiaiDoan,
                "baiHocNhanCach3GiaiGoan.giaiDoan1"
              )}`}</div>
              <div className={styles.chiSo}>{`Giai đoạn đức tính từ ${
                lodash.get(baGiaiDoan, "moc3GiaiDoan.giaiDoan1") + 1
              } - ${lodash.get(
                baGiaiDoan,
                "moc3GiaiDoan.giaiDoan2"
              )} tuổi: ${lodash.get(
                baGiaiDoan,
                "baiHocNhanCach3GiaiGoan.giaiDoan2",
                ""
              )}`}</div>
              <div className={styles.chiSo}>{`Giai đoạn đức tính từ ${
                lodash.get(baGiaiDoan, "moc3GiaiDoan.giaiDoan2") + 1
              } - hết tuổi: ${lodash.get(
                baGiaiDoan,
                "baiHocNhanCach3GiaiGoan.giaiDoan3",
                ""
              )}`}</div>
            </div>
          ) : null}
          <br></br>
          {bonGiaiDoan.mocThoiGian ? (
            <div>
              <div
                className={styles.chiSo}
              >{`Giai đoạn kỹ năng từ 1 - ${lodash.get(
                bonGiaiDoan,
                "mocThoiGian.giaiDoan1",
                ""
              )} tuổi: ${lodash.get(
                bonGiaiDoan,
                "baiHoc4GiaiDoan.giaiDoan1",
                ""
              )}`}</div>
              <div className={styles.chiSo}>{`Giai đoạn kỹ năng từ ${
                lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan1", "") + 1
              } - ${lodash.get(
                bonGiaiDoan,
                "mocThoiGian.giaiDoan2"
              )} tuổi: ${lodash.get(
                bonGiaiDoan,
                "baiHoc4GiaiDoan.giaiDoan2",
                ""
              )}`}</div>
              <div className={styles.chiSo}>{`Giai đoạn kỹ năng từ ${
                lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan2") + 1
              } - ${lodash.get(
                bonGiaiDoan,
                "mocThoiGian.giaiDoan3"
              )} tuổi: ${lodash.get(
                bonGiaiDoan,
                "baiHoc4GiaiDoan.giaiDoan3",
                ""
              )}`}</div>
              <div className={styles.chiSo}>{`Giai đoạn kỹ năng từ ${
                lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan3") + 1
              } - hết tuổi: ${lodash.get(
                bonGiaiDoan,
                "baiHoc4GiaiDoan.giaiDoan4",
                ""
              )}`}</div>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div>
          <h1>Tính các con số</h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onClickTinhToan}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ float: "left" }}
          >
            <Form.Item
              label="Ngày/Tháng/Năm"
              name="birthDay"
              rules={[
                {
                  required: true,
                  message: "Bạn phải nhập vào ngày tháng năm sinh",
                },
              ]}
            >
              <MaskedInput
                mask="11/11/1111"
                name="expiry"
                placeholder={"Ngày/Tháng/Năm"}
                onChange={(e) => handleOnchangeBirthDay(e.target.value)}
                style={{ width: 250 }}
              />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="username"
              rules={[
                { required: true, message: "Bạn phải nhập vào họ và tên" },
              ]}
            >
              <Input
                placeholder="Nhập họ và tên"
                onChange={(e) => handleOnchangeFullName(e.target.value)}
                style={{ width: 250 }}
              ></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Tính Toán
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
          style={{
            width: 900,
            marginTop: 30,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            className={styles.circles1}
            style={{
              backgroundColor: "#297648",
            }}
          >
            <div> TĐTH: {thaiDoBenNgoai || ""}</div>
            <div
              className={styles.circles2}
              style={{
                backgroundColor: "gray",
              }}
            >
              <div>Tố chất: {nangLucTuNhien}</div>
              <div
                className={styles.circles3}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                <div>ĐLBT: {dongLucThoaMan}</div>
              </div>
            </div>
          </div>
          <div
            className={styles.circles1}
            style={{
              backgroundColor: "none",
            }}
          >
            <div>{` `}</div>
            <div
              className={styles.circles2}
              style={{
                backgroundColor: "#297648",
              }}
            >
              <div>PƯBĐ: {nangLucTiepCan}</div>
              <div
                className={styles.circles3}
                style={{
                  backgroundColor: "yellow",
                }}
              >
                <div>ĐLBĐ: {dongLucTiepCan}</div>
              </div>
            </div>
          </div>
          <div
            className={styles.circles1}
            style={{
              backgroundColor: "#ff9900",
              width: 250,
              height: 250,
            }}
          >
            <div>
              {`BHĐĐ: `}
              {noNghiepBaihocDuongDoi
                ? `${noNghiepBaihocDuongDoi} - `
                : ""}{" "}
              {baihoc}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f8efef", marginTop: 10 }}>
          <SignatureCanvas
            ref={(ref) => {
              sigPad = ref;
            }}
            penColor="green"
            canvasProps={{
              width: 900,
              height: 500,
              className: "sigCanvas",
            }}
          />
          <Button onClick={() => clear()} type="primary">
            XÓA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThanSo;
