// Lấy các phần tử DOM
const getELE = (id) => document.getElementById(id);

// --- Lớp đối tượng Nhân viên ---
/**
 * Lớp này đại diện cho một nhân viên trong hệ thống.
 * @param {string} taiKhoan - Tài khoản nhân viên (4-6 ký số)
 * @param {string} hoTen - Họ và tên nhân viên (phải là chữ)
 * @param {string} email - Email nhân viên (định dạng email)
 * @param {string} matKhau - Mật khẩu (6-10 ký tự, có số, chữ hoa, ký tự đặc biệt)
 * @param {string} ngayLam - Ngày bắt đầu làm (định dạng mm/dd/yyyy)
 * @param {number} luongCB - Lương cơ bản (1,000,000 - 20,000,000)
 * @param {string} chucVu - Chức vụ (Giám đốc, Trưởng phòng, Nhân viên)
 * @param {number} gioLam - Số giờ làm trong tháng (80 - 200)
 */
function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;

  this.tinhTongLuong = function () {
    let tongLuong = 0;
    if (this.chucVu === "Giám đốc") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      tongLuong = this.luongCB * 2;
    } else if (this.chucVu === "Nhân viên") {
      tongLuong = this.luongCB * 1;
    }
    return tongLuong;
  };

  
  this.xepLoai = function () {
    let loai = "";
    if (this.gioLam >= 192) {
      loai = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      loai = "Giỏi";
    } else if (this.gioLam >= 160) {
      loai = "Khá";
    } else {
      loai = "Trung bình";
    }
    return loai;
  };
}


// --- Lớp quản lý danh sách nhân viên ---
function DanhSachNhanVien() {
  this.dsnv = [];

  /**
   * Thêm một nhân viên mới vào danh sách.
   * @param {NhanVien} nv
   */
  this.themNhanVien = function (nv) {
    this.dsnv.push(nv);
  };

  /**
   * Tìm vị trí của nhân viên trong danh sách dựa vào tài khoản.
   * @param {string} taiKhoan 
   * @returns {number}
   */
  this.timViTri = function (taiKhoan) {
    return this.dsnv.findIndex(nv => nv.taiKhoan === taiKhoan);
  };

  /**
   * Xóa một nhân viên khỏi danh sách.
   * @param {string} taiKhoan
   */
  this.xoaNhanVien = function (taiKhoan) {
    const viTri = this.timViTri(taiKhoan);
    if (viTri > -1) {
      this.dsnv.splice(viTri, 1);
    }
  };

  /**
   * Lấy thông tin chi tiết của một nhân viên.
   * @param {string} taiKhoan
   * @returns {NhanVien|null}
   */
  this.layThongTinNhanVien = function (taiKhoan) {
    const viTri = this.timViTri(taiKhoan);
    return viTri > -1 ? this.dsnv[viTri] : null;
  };

  /**
   * Cập nhật thông tin cho một nhân viên.
   * @param {NhanVien} nv
   */
  this.capNhatNhanVien = function (nv) {
    const viTri = this.timViTri(nv.taiKhoan);
    if (viTri > -1) {
      this.dsnv[viTri] = nv;
    }
  };

  /**
   * Tìm kiếm nhân viên dựa trên xếp loại.
   * @param {string} keyword - Xếp loại cần tìm kiếm.
   * @returns {NhanVien[]} - Mảng các nhân viên phù hợp.
   */
  this.timKiemNhanVien = function (keyword) {
    return this.dsnv.filter(nv => nv.xepLoai().toLowerCase().includes(keyword.toLowerCase()));
  };
}


// --- Lớp Validator để kiểm tra dữ liệu form ---
function Validator() {
    this.kiemTraRong = function(value, message, spanId) {
        if (!value.trim()) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };

    this.kiemTraDoDai = function(value, min, max, message, spanId) {
        if (value.length < min || value.length > max) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };

    this.kiemTraSo = function(value, message, spanId) {
        const re = /^[0-9]+$/;
        if (!re.test(value)) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };
    
    this.kiemTraChu = function(value, message, spanId) {
        const re = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
        if (!re.test(value)) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };

    this.kiemTraEmail = function(value, message, spanId) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        value = value.trim();
        if (!re.test(String(value))) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };
    
    this.kiemTraMatKhau = function(value, message, spanId) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if(!re.test(value)){
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    }

    this.kiemTraGiaTri = function(value, min, max, message, spanId) {
        const numValue = Number(value);
        if (numValue < min || numValue > max) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    };
    
    this.kiemTraChucVu = function(id, message, spanId) {
        if (getELE(id).selectedIndex === 0) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    }

    this.kiemTraNgay = function(value, message, spanId) {
        const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
         if(!re.test(value)){
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    }

    this.kiemTraTrung = function(taiKhoan, dsnv, message, spanId) {
        const isExist = dsnv.some(nv => nv.taiKhoan === taiKhoan);
        if(isExist) {
            getELE(spanId).innerHTML = message;
            getELE(spanId).style.display = 'block';
            return false;
        }
        getELE(spanId).innerHTML = '';
        getELE(spanId).style.display = 'none';
        return true;
    }
}


// --- Khởi tạo đối tượng ---
const dsnv = new DanhSachNhanVien();
const validator = new Validator();


// --- Hàm tiện ích ---

/**
 * Lưu danh sách nhân viên vào Local Storage.
 */
function luuLocalStorage() {
  const data = JSON.stringify(dsnv.dsnv);
  localStorage.setItem('DSNV', data);
}

/**
 * Lấy danh sách nhân viên từ Local Storage.
 */
function layLocalStorage() {
  const data = localStorage.getItem('DSNV');
  if (data) {
    const dataJSON = JSON.parse(data);
    // Cần chuyển đổi lại thành đối tượng NhanVien để có các phương thức
    dsnv.dsnv = dataJSON.map(item => 
      new NhanVien(
        item.taiKhoan, item.hoTen, item.email, item.matKhau, 
        item.ngayLam, item.luongCB, item.chucVu, item.gioLam
      )
    );
    hienThiTable(dsnv.dsnv);
  }
}

/**
 * Hiển thị dữ liệu nhân viên ra table.
 * @param {NhanVien[]} data - Mảng nhân viên cần hiển thị.
 */
function hienThiTable(data) {
  let content = '';
  data.forEach(nv => {
    content += `
      <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhTongLuong().toLocaleString()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
            <button class="btn btn-info" onclick="suaNhanVien('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
        </td>
      </tr>
    `;
  });
  getELE('tableDanhSach').innerHTML = content;
}

/**
 * Lấy thông tin từ form và thực hiện validation.
 * @param {boolean} isAdd - true nếu là thêm mới, false nếu là cập nhật (để bỏ qua kiểm tra trùng tài khoản).
 * @returns {NhanVien|null} - Trả về đối tượng NhanVien nếu hợp lệ, ngược lại là null.
 */
function layVaKiemTraThongTin(isAdd = true) {
    const taiKhoan = getELE('tknv').value;
    const hoTen = getELE('name').value;
    const email = getELE('email').value;
    const matKhau = getELE('password').value;
    const ngayLam = getELE('datepicker').value;
    const luongCB = Number(getELE('luongCB').value);
    const chucVu = getELE('chucvu').value;
    const gioLam = Number(getELE('gioLam').value);
    
    let isValid = true;

    // Validation
    if(isAdd) {
     isValid &= validator.kiemTraRong(taiKhoan, 'Tài khoản không được để trống', 'tbTKNV') &&
                validator.kiemTraDoDai(taiKhoan, 4, 6, 'Tài khoản phải từ 4-6 ký số', 'tbTKNV') &&
                validator.kiemTraSo(taiKhoan, 'Tài khoản phải là số', 'tbTKNV') &&
                validator.kiemTraTrung(taiKhoan, dsnv.dsnv, 'Tài khoản đã tồn tại', 'tbTKNV');
    }

    isValid &= validator.kiemTraRong(hoTen, 'Họ tên không được để trống', 'tbTen') &&
               validator.kiemTraChu(hoTen, 'Họ tên phải là chữ', 'tbTen');
               
    isValid &= validator.kiemTraRong(email, 'Email không được để trống', 'tbEmail') &&
               validator.kiemTraEmail(email, 'Email không đúng định dạng', 'tbEmail');

    isValid &= validator.kiemTraRong(matKhau, 'Mật khẩu không được để trống', 'tbMatKhau') &&
               validator.kiemTraDoDai(matKhau, 6, 10, 'Mật khẩu phải từ 6-10 ký tự', 'tbMatKhau') &&
               validator.kiemTraMatKhau(matKhau, 'Mật khẩu phải chứa số, chữ hoa, ký tự đặc biệt', 'tbMatKhau');

    isValid &= validator.kiemTraRong(ngayLam, 'Ngày làm không được để trống', 'tbNgay') &&
               validator.kiemTraNgay(ngayLam, 'Ngày làm không đúng định dạng mm/dd/yyyy', 'tbNgay');

    isValid &= validator.kiemTraRong(getELE('luongCB').value, 'Lương cơ bản không được để trống', 'tbLuongCB') &&
               validator.kiemTraGiaTri(luongCB, 1000000, 20000000, 'Lương cơ bản phải từ 1,000,000 - 20,000,000', 'tbLuongCB');

    isValid &= validator.kiemTraChucVu('chucvu', 'Vui lòng chọn chức vụ', 'tbChucVu');

    isValid &= validator.kiemTraRong(getELE('gioLam').value, 'Giờ làm không được để trống', 'tbGiolam') &&
               validator.kiemTraGiaTri(gioLam, 80, 200, 'Giờ làm phải từ 80 - 200 giờ', 'tbGiolam');

    if (!isValid) return null;

    return new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
}

/**
 * Reset form, các thông báo lỗi, và đặt ngày hiện tại cho datepicker.
 */
function resetForm() {
    // 1. Reset tất cả các trường input trong form
    getELE('myModal').querySelector('form').reset();

    // 2. Kích hoạt lại trường tài khoản (vì có thể bị vô hiệu hóa khi sửa)
    getELE('tknv').disabled = false;

    // 3. Hiển thị nút "Thêm" và ẩn nút "Cập nhật"
    getELE('btnThemNV').style.display = 'block';
    getELE('btnCapNhat').style.display = 'none';
    
    // 4. Ẩn tất cả các thông báo lỗi
    document.querySelectorAll('.sp-thongbao').forEach(span => span.style.display = 'none');
    
    // 5. Đổi lại header của modal
    getELE('header-title').innerText = "Thêm nhân viên";

    // 6. Đặt ngày hiện tại cho trường datepicker
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const output = (('' + month).length < 2 ? '0' : '') + month + '/' +
                   (('' + day).length < 2 ? '0' : '') + day + '/' +
                   d.getFullYear();
    getELE('datepicker').value = output;
}


// --- Gắn sự kiện ---

// Load dữ liệu từ Local Storage khi trang được tải
window.onload = function() {
    layLocalStorage();
};

// Sự kiện click nút "Thêm nhân viên" (mở modal)
getELE('btnThem').onclick = function() {
    resetForm();
}

// Sự kiện click nút "Thêm người dùng" (trong modal)
getELE('btnThemNV').onclick = function() {
    const nv = layVaKiemTraThongTin(true); // true = isAdd
    if(nv) {
        dsnv.themNhanVien(nv);
        luuLocalStorage();
        hienThiTable(dsnv.dsnv);
        getELE('btnDong').click(); // Đóng modal
    }
}

// Sự kiện click nút "Cập nhật" (trong modal)
getELE('btnCapNhat').onclick = function() {
    const nv = layVaKiemTraThongTin(false); // false = isUpdate
    if(nv) {
        dsnv.capNhatNhanVien(nv);
        luuLocalStorage();
        hienThiTable(dsnv.dsnv);
        getELE('btnDong').click(); // Đóng modal
    }
}

/**
 * Hàm xử lý khi click nút "Xóa".
 * @param {string} taiKhoan - Tài khoản nhân viên cần xóa.
 */
function xoaNhanVien(taiKhoan) {
    dsnv.xoaNhanVien(taiKhoan);
    luuLocalStorage();
    hienThiTable(dsnv.dsnv);
}

/**
 * Hàm xử lý khi click nút "Sửa".
 * @param {string} taiKhoan - Tài khoản nhân viên cần sửa.
 */
function suaNhanVien(taiKhoan) {
    const nv = dsnv.layThongTinNhanVien(taiKhoan);
    if(nv) {
        // Mở modal và điền thông tin
        getELE('tknv').value = nv.taiKhoan;
        getELE('tknv').disabled = true; // Không cho sửa tài khoản
        getELE('name').value = nv.hoTen;
        getELE('email').value = nv.email;
        getELE('password').value = nv.matKhau;
        getELE('datepicker').value = nv.ngayLam;
        getELE('luongCB').value = nv.luongCB;
        getELE('chucvu').value = nv.chucVu;
        getELE('gioLam').value = nv.gioLam;

        // Ẩn/hiện nút
        getELE('btnThemNV').style.display = 'none';
        getELE('btnCapNhat').style.display = 'block';

        // Đổi header
        getELE('header-title').innerText = "Cập nhật nhân viên";

        // Ẩn các thông báo lỗi cũ
        document.querySelectorAll('.sp-thongbao').forEach(span => span.style.display = 'none');
    }
}

// Sự kiện tìm kiếm nhân viên
getELE('btnTimNV').onclick = function() {
    const keyword = getELE('searchName').value;
    const dsnvTimKiem = dsnv.timKiemNhanVien(keyword);
    hienThiTable(dsnvTimKiem);
};

// Gõ và tìm kiếm luôn
getELE('searchName').onkeyup = function() {
    const keyword = getELE('searchName').value;
    const dsnvTimKiem = dsnv.timKiemNhanVien(keyword);
    hienThiTable(dsnvTimKiem);
};

// Bonus: Sắp xếp
getELE('SapXepTang').onclick = function() {
    dsnv.dsnv.sort((a,b) => a.taiKhoan.localeCompare(b.taiKhoan));
    hienThiTable(dsnv.dsnv);
}
getELE('SapXepGiam').onclick = function() {
    dsnv.dsnv.sort((a,b) => b.taiKhoan.localeCompare(a.taiKhoan));
    hienThiTable(dsnv.dsnv);
}
