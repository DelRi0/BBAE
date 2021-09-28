import React, { useState } from "react";
import { Button, Input } from "antd";
import lodash from "lodash";

const ThanSo = () => {
  const [baihoc, setBaihoc] = useState(null);
  const [nangluc, setNangluc] = useState(null);
  const [noNghiepBaihocDuongDoi, setNoNghiepBaihocDuongDoi] = useState(null);
  const [nangLucTuNhien, setNangLucTuNhien] = useState(null);
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [nangLucTiepCan, setNangLucTiepCan] = useState(null);
  const arrNghiep = [13, 14, 16, 19];

  const tinhRutGon = (conSoInput: number) => {
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

  const tinhNangLucTuNhien = () => {
    if (fullName) {
      let name = convertUnicode(fullName);
      let nameWithNumber = convertNameToNumber(name).split(" ");
      let tenDemRutGonArr = "";
      let tenRieng = lodash.last(nameWithNumber);
      let nangLucTiepCan = 0;
      console.log(tenRieng);
      tenRieng.split("").map((item) => {
        nangLucTiepCan += parseInt(item);
      });
      if (nangLucTiepCan === 10) {
        setNangLucTiepCan("1");
      } else if (
        nangLucTiepCan === 11 ||
        nangLucTiepCan === 22 ||
        nangLucTiepCan < 10
      ) {
        setNangLucTiepCan(nangLucTiepCan);
      } else {
        setNangLucTiepCan(`${nangLucTiepCan} - ${tinhRutGon(nangLucTiepCan)}`);
      }
      console.log(nangLucTiepCan);
      nameWithNumber.map((item, index) => {
        let temDem = nameWithNumber[index];
        tenDemRutGonArr += tinhRutGon(temDem.toString()).toString();
      });
      let conSoRutGon = 0;
      tenDemRutGonArr.split("").map((item) => {
        conSoRutGon += parseInt(item);
      });

      if (lodash.includes(arrNghiep, conSoRutGon)) {
        setNangLucTuNhien(conSoRutGon);
        setNangluc(tinhRutGon(conSoRutGon));
      } else {
        setNangLucTuNhien("");
        setNangluc(tinhRutGon(conSoRutGon).toString());
      }
    }
  };

  const tinhBaiHocDuongDoi = () => {
    let birthDate = birthDay;
    if (birthDate) {
      let arrBirthDate = birthDate.split("/");
      let ngaySinhRutGon = 0,
        thangSinhRutGon = 0,
        namSinhRutGon = 0;
      ngaySinhRutGon = tinhRutGon(parseInt(arrBirthDate[0]));
      thangSinhRutGon = tinhRutGon(parseInt(arrBirthDate[1]));
      namSinhRutGon = tinhRutGon(parseInt(arrBirthDate[2]));
      let tongNgaySinh = ngaySinhRutGon + thangSinhRutGon + namSinhRutGon;
      if (tongNgaySinh < 10 || tongNgaySinh === 11 || tongNgaySinh === 22) {
        setBaihoc(tongNgaySinh);
        setNoNghiepBaihocDuongDoi("");
      } else if (tongNgaySinh === 10) {
        setBaihoc(1);
      } else {
        let conSoRutGon2 = 0;
        let nonghiepDuongDoi = "";
        tongNgaySinh
          .toString()
          .split("")
          .map((item) => {
            conSoRutGon2 += parseInt(item);
          });
        nonghiepDuongDoi = tongNgaySinh.toString();
        tongNgaySinh = tinhRutGon(conSoRutGon2);
        setBaihoc(tongNgaySinh);
        setNoNghiepBaihocDuongDoi(nonghiepDuongDoi);
      }
    }
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
    let arrNguyenAm = [];
    let arrPhuAm = [];
    arrTen.split("").map((item, index) => {
      if (item === "y") {
        if (
          kiemTraYPhuAm(arrTen[index - 1] ? arrTen[index - 1] : "c") &&
          kiemTraYPhuAm(arrTen[index + 1] ? arrTen[index + 1] : "c")
        ) {
          // y la phu am
          arrPhuAm.push(item);
        } else {
          // y la nguyen am
          arrNguyenAm.push(item);
        }
      } else if (kiemTraYPhuAm(item)) {
        // day la phu am
        arrPhuAm.push(item);
      } else {
        // day la nguyen am
        arrNguyenAm.push(item);
      }
    });
    console.log("arrPhuAm", arrPhuAm);
    console.log("arrNguyenAm", arrNguyenAm);
  };

  const onClickTinhToan = () => {
    tinhNangLucTuNhien();
    tinhBaiHocDuongDoi();
    tinhNguyenAmTheoTen("yen");
  };

  const handleOnchangeBirthDay = (value) => {
    setBirthDay(value);
  };

  const handleOnchangeFullName = (value) => {
    setFullName(value);
  };

  return (
    <div>
      <div style={{ width: 250, marginLeft: 50 }}>
        <h1>xxxxxxxx</h1>
        <div style={{ marginTop: 15 }}>
          <Input
            placeholder="Nhập ngày sinh: Ngày/tháng/năm"
            onChange={(e) => handleOnchangeBirthDay(e.target.value)}
          ></Input>
        </div>
        <div style={{ marginTop: 15 }}>
          <Input
            placeholder="Nhập họ và tên"
            onChange={(e) => handleOnchangeFullName(e.target.value)}
          ></Input>
        </div>
        <Button style={{ marginTop: 15 }} onClick={() => onClickTinhToan()}>
          Tính Toán
        </Button>
        <div style={{ marginTop: 15 }}>
          <span>{`Bài học đường đời: ${
            noNghiepBaihocDuongDoi ? `${noNghiepBaihocDuongDoi} - ` : ""
          } ${baihoc}`}</span>{" "}
          <br></br>
          <span>{`Năng lực tự nhiên: ${
            nangLucTuNhien ? `${nangLucTuNhien} - ` : ""
          } ${nangluc}`}</span>
          <br></br>
          <span>{`Năng lực tiếp cận: ${nangLucTiepCan}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ThanSo;
