import React, { useState } from "react";
import { Button, Input, DatePicker } from "antd";
import lodash from "lodash";
import moment from "moment";
import { number } from "prop-types";

const ThanSo = () => {
  const dateFormat = "DD/MM/YYYY";
  const [baihoc, setBaihoc] = useState(null);
  const [nangluc, setNangluc] = useState(null);
  const [noNghiepBaihocDuongDoi, setNoNghiepBaihocDuongDoi] = useState(null);
  const [nangLucTuNhien, setNangLucTuNhien] = useState(null);
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState(
    moment(new Date()).format(dateFormat)
  );
  const [nangLucTiepCan, setNangLucTiepCan] = useState(null);
  const [dongLucThoaMan, setDongLucThoaMan] = useState(null);
  const [thaiDoBenNgoai, setThaiDoBenNgoai] = useState(null);
  const [dongLucTiepCan, setDongLucTiepCan] = useState(null);
  const arrNghiep = [13, 14, 16, 19];
  const [namThanSoHienTai, setNamThanSoHienTai] = useState(null);
  const [namThanSoTiepTheo, setNamThanSoTiepTheo] = useState(null);
  const arrConSo = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [noBaiHoc, setNoBaiHoc] = useState([]);
  const [chiSoCanBang, setChiSoCanBang] = useState(null);
  const [chiSoPhatTrien, setChiSoPhatTrien] = useState(null);
  const [thanhPhanNoiTroi, setThanhPhanNoiTroi] = useState([]);
  const [baGiaiDoan, setBaGiaiDoan] = useState({});
  const [bonGiaiDoan, setBonGiaiDoan] = useState({});

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

  const tinhNangLucTuNhien = () => {
    if (fullName) {
      let name = convertUnicode(fullName);
      let nameWithNumber = convertNameToNumber(name).split(" ");
      let tenDemRutGonArr = "";
      let tenRieng = lodash.last(nameWithNumber);
      let nangLucTiepCan = 0;
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
    }
  };

  const tinhThongTinNgaySinh = () => {
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
      let baiHoc = 0;
      let noNghiepDuongDoi = "";
      if (tongNgaySinh < 10 || tongNgaySinh === 11 || tongNgaySinh === 22) {
        baiHoc = tongNgaySinh;
      } else if (tongNgaySinh === 10) {
        baiHoc = 1;
      } else {
        let conSoRutGon2 = 0;
        // let nonghiepDuongDoi = "";
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
    let arrBirthDay = birthDay.split("/");
    let ngaySinhRutGon = tinhRutGon(parseInt(arrBirthDay[0]));
    let thangSinhRutGon = tinhRutGon(parseInt(arrBirthDay[1]));
    let namSinhRutGon = tinhRutGon(parseInt(arrBirthDay[2]));
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
    let birthDate = birthDay;
    if (birthDate) {
      let arrBirthDay = birthDay.split("/");
      let giaiDoan1 = tinhRutGon(parseInt(arrBirthDay[1]));
      let giaiDoan2 = tinhRutGon(parseInt(arrBirthDay[0]));
      let giaiDoan3 = tinhRutGon(parseInt(arrBirthDay[2]));
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
    if (fullName) {
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
    }
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

  const onClickTinhToan = () => {
    tinhChiSoTheoTen(fullName);
    tinhChiSoNgaySinh(birthDay);
  };

  const handleOnchangeBirthDay = (value) => {
    let valueFormat = moment(value).format(dateFormat);
    setBirthDay(valueFormat);
  };

  const handleOnchangeFullName = (value) => {
    setFullName(value);
  };

  return (
    <div>
      <div style={{ width: 250, margin: "auto" }}>
        <h1>xxxxxxxx</h1>
        <div style={{ marginTop: 15 }}>
          <DatePicker
            defaultValue={moment(new Date(), dateFormat)}
            onChange={(e) => handleOnchangeBirthDay(e)}
            style={{ width: 250 }}
            format={dateFormat}
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <Input
            placeholder="Nhập họ và tên"
            onChange={(e) => handleOnchangeFullName(e.target.value)}
          ></Input>
        </div>
        <Button
          type="primary"
          style={{ marginTop: 15 }}
          onClick={() => onClickTinhToan()}
        >
          Tính Toán
        </Button>
        <div style={{ marginTop: 15 }}>
          <span>{`Bài học đường đời: ${
            noNghiepBaihocDuongDoi ? `${noNghiepBaihocDuongDoi} - ` : ""
          } ${baihoc ? baihoc : ""}`}</span>{" "}
          <br></br>
          <span>{`Năng lực tự nhiên: ${
            nangLucTuNhien ? nangLucTuNhien : ""
          }`}</span>
          <br></br>
          <span>{`Năng lực tiếp cận: ${
            nangLucTiepCan ? nangLucTiepCan : ""
          }`}</span>
          <br></br>
          <span>{`Thái độ bên ngoài: ${
            thaiDoBenNgoai ? thaiDoBenNgoai : ""
          }`}</span>
          <br></br>
          <span>{`Động lực tiếp cận: ${
            dongLucTiepCan ? dongLucTiepCan : ""
          }`}</span>
          <br></br>
          <span>{`Động lực thoả mãn: ${
            dongLucThoaMan ? dongLucThoaMan : ""
          }`}</span>
          <br></br>
          <span>{`Chỉ số cân bằng: ${chiSoCanBang ? chiSoCanBang : ""}`}</span>
          <br></br>
          <span>{`Chỉ số phát triển: ${
            chiSoPhatTrien ? chiSoPhatTrien : ""
          }`}</span>
          <br></br>
          <span>{`Năm thần số ${moment().year()}: ${
            namThanSoHienTai ? namThanSoHienTai : ""
          }`}</span>
          <br></br>
          <span>{`Năm thần số ${moment().year() + 1}: ${
            namThanSoTiepTheo ? namThanSoTiepTheo : ""
          }`}</span>
          <br></br>
          {thanhPhanNoiTroi.length
            ? thanhPhanNoiTroi.map((item) => {
                return (
                  <div key={item}>
                    <span key={item}>{`Thành phần nổi trội: ${item}`}</span>
                  </div>
                );
              })
            : null}
          {/* <br></br> */}
          {noBaiHoc.length
            ? noBaiHoc.map((item) => {
                return (
                  <div key={item}>
                    {" "}
                    <span key={item}>{`Nợ bài học: ${item}`}</span>
                  </div>
                );
              })
            : null}
          <br></br>
          <span>{`Bài học nhân cách từ 0 - ${lodash.get(
            baGiaiDoan,
            "moc3GiaiDoan.giaiDoan1"
          )} tuổi: ${lodash.get(
            baGiaiDoan,
            "baiHocNhanCach3GiaiGoan.giaiDoan1"
          )}`}</span>
          <br></br>
          <span>{`Bài học nhân cách từ ${
            lodash.get(baGiaiDoan, "moc3GiaiDoan.giaiDoan1") + 1
          } - ${lodash.get(
            baGiaiDoan,
            "moc3GiaiDoan.giaiDoan2"
          )} tuổi: ${lodash.get(
            baGiaiDoan,
            "baiHocNhanCach3GiaiGoan.giaiDoan2"
          )}`}</span>
          <br></br>
          <span>{`Bài học nhân cách từ ${
            lodash.get(baGiaiDoan, "moc3GiaiDoan.giaiDoan2") + 1
          } - hết tuổi: ${lodash.get(
            baGiaiDoan,
            "baiHocNhanCach3GiaiGoan.giaiDoan3"
          )}`}</span>
          <br></br>
          <br></br>
          <span>{`Bài học kỹ năng từ 1 - ${lodash.get(
            bonGiaiDoan,
            "mocThoiGian.giaiDoan1"
          )} tuổi: ${lodash.get(
            bonGiaiDoan,
            "baiHoc4GiaiDoan.giaiDoan1"
          )}`}</span>
          <br></br>
          <span>{`Bài học kỹ năng từ ${
            lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan1") + 1
          } - ${lodash.get(
            bonGiaiDoan,
            "mocThoiGian.giaiDoan2"
          )} tuổi: ${lodash.get(
            bonGiaiDoan,
            "baiHoc4GiaiDoan.giaiDoan2"
          )}`}</span>
          <br></br>
          <span>{`Bài học kỹ năng từ ${
            lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan2") + 1
          } - ${lodash.get(
            bonGiaiDoan,
            "mocThoiGian.giaiDoan3"
          )} tuổi: ${lodash.get(
            bonGiaiDoan,
            "baiHoc4GiaiDoan.giaiDoan3"
          )}`}</span>
          <br></br>
          <span>{`Bài học kỹ năng từ ${
            lodash.get(bonGiaiDoan, "mocThoiGian.giaiDoan3") + 1
          } - hết tuổi: ${lodash.get(
            bonGiaiDoan,
            "baiHoc4GiaiDoan.giaiDoan4"
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ThanSo;
