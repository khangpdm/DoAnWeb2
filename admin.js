let DanhSachSanPham = JSON.parse(localStorage.getItem("product"));
function showArrayProduct() {
    let HTML = `<div class="card__items">
                <button id="addP" onclick="showInputAddProduct()">Thêm sản phẩm</button>`;
    let nodeContainerRightCard = document.querySelector(".container__right--card");
    for (let i = 0; i < DanhSachSanPham.length; i++) {
        let htmlSanPham = showProduct(DanhSachSanPham[i]);
        HTML = HTML + htmlSanPham;
    }
    HTML = HTML + '</div>'
    nodeContainerRightCard.innerHTML = HTML;
}
function showProduct(sanPham) {
    let id = sanPham.id;
    html = ''
    html += `<div class="card__item">
     <div class="card__item--left">
     <img src="` + sanPham.image1 + `" alt="">
     </div>
     <div class="card__item--middle">
     <p class="card__name">` + sanPham.name + `</p>
     <p class="card__introduce">`+ sanPham.introduce + `</p>
     </div>
     <div class="card__item--right">
     <p><span>` + (sanPham.price * 1000).toLocaleString() + ` <sup>VNĐ</sup></span></p>
     <button onclick="showInputChangeProduct(` + id + `)"><i class="fa fa-pencil-square" aria-hidden="true"></i></button>
     <button onclick="deleteP(` + id + `)"><i class="fa fa-trash" aria-hidden="true"></i></button>
     </div>
     </div>`
    return html;
}


//show trang chủ
function showpageMain() {
    document.querySelector(".container__right--card").style.display = "none";
    document.querySelector("#formBill").style.display = "none";
    document.querySelector(".container__right--main").style.display = "block";
}

//show trang sản phẩm
function showPageProduct() {
    document.querySelector(".container__right--card").style.display = "block";
    document.querySelector(".container__right--main").style.display = "none";
    document.querySelector("#formBill").style.display = "none";
    showArrayProduct();
}




//-----------------------------------------------THÊM SẢN PHẨM----------------------------------------------

//Load file ảnh 1 thêm sản phẩm
let recentImg1;
function chooseFileimg1(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview1__addP').attr('src', e.target.result);
            recentImg1 = reader.result;
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
}
//Load file ảnh 2 thêm sản phẩm 
let recentImg2;
function chooseFileimg2(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview2__addP').attr('src', e.target.result);
            recentImg2 = reader.result;
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
}


//Đóng khung input THÊM SẢN PHẨM
let nodeTemp = document.querySelector(".contain__addP--products");
let nodeClose = nodeTemp.querySelector(".fa-window-close");
nodeClose.addEventListener("click", function () {
    document.querySelector(".container__addP--products").style.display = "none";
})


//Mở khung input THÊM SẢN PHẨM
function showInputAddProduct() {
    document.querySelector(".container__addP--products").style.display = "block";
}



//đẩy sản phẩm vào localStorage và thêm vào trang bán hàng, trang admin
function addProduct() {
    alert(recentImg1);
    alert(recentImg2);
    let idtemp = DanhSachSanPham[0].id + 1;
    let textDetail1 = document.querySelector("#detail1__addP");
    let textDetail2 = document.querySelector("#detail2__addP");
    let textDetail3 = document.querySelector("#detail3__addP");
    let textDetail4 = document.querySelector("#detail4__addP");
    let textName = document.querySelector("#name__addP");
    let textIntroduce = document.querySelector("#introduce__addP");
    let textPrice = document.querySelector("#price__addP");
    if ((document.querySelector("#imgPreview1__addP").src).includes("html") || (document.querySelector("#imgPreview2__addP").src).includes("html")) {
        customAlert("Không có hình ảnh", "warning");
        return false;
    }
    if (textName.value == "" || textIntroduce.value == "" || textDetail1.value == "" || textDetail2.value == "" || textDetail3.value == "" || textDetail4.value == "") {
        customAlert("Bạn chưa nhập nội dụng", "warning");
        return false;
    }
    if (isNaN(Number(textPrice.value))) {
        customAlert("Giá không hợp lệ", "warning");
        return false;
    }
    let productTemp = {
        id: idtemp,
        image1: recentImg1,
        image2: recentImg2,
        detail1: textDetail1.value,
        detail2: textDetail2.value,
        detail3: textDetail3.value,
        detail4: textDetail4.value,
        name: textName.value,
        introduce: textIntroduce.value,
        price: textPrice.value,
    }
    DanhSachSanPham.unshift(productTemp);
    localStorage.setItem("product", JSON.stringify(DanhSachSanPham));
    showArrayProduct();
    customAlert("Thêm sản phẩm thành công ", "success")
}

//Hiện khung thông báo thêm sản phẩm thành công hay thất bại
function customAlert(message, type) {
    if (type == "success")
        document.querySelector(".containAlert").style.backgroundColor = '#D2B48C';
    if (type == "warning")
        document.querySelector(".containAlert").style.backgroundColor = '#D2B48C';
    document.querySelector(".containAlert").innerHTML = message;
    document.querySelector(".customAlert").style.display = "block";
    setTimeout(function () {
        document.querySelector(".customAlert").style.display = "none";
    }, 2500)
}

//khi click vào button sẽ đóng khung thông báo Alert 
function closeContainAlert() {
    document.querySelector(".customAlert").style.display = "none";
}






//--------------------------------------------------------------XÓA SẢN PHẨM--------------------------------------------------------------------
//Xóa sản phẩm
function deleteP(id) {
    for (var i = 0; i < DanhSachSanPham.length; i++) {
        if (DanhSachSanPham[i].id == id) {
            if (confirm('Bạn có muốn xóa sản phẩm này?')) {
                DanhSachSanPham.splice(i, 1);
                break;
            }
        }
    }
    localStorage.setItem("product", JSON.stringify(DanhSachSanPham));
    showArrayProduct();
}




//-----------------------------------------------------------------SỬA THÔNG TIN SẢN PHẨM ----------------------------------------------------

//load file ảnh 1 sửa sản phẩm
function chooseFile1(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview1__changeP').attr('src', e.target.result);
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
}

//load file ảnh 2 sửa sản phẩm
function chooseFile2(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreview2__changeP').attr('src', e.target.result);
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
}

//Đóng khung input sửa sản phẩm
function closeshowInputChangeProduct() {
    document.querySelector(".container__changeP--products").style.display = "none";
}

//Mở khung input sửa sản phẩm có chứa thông tin cũ sản phẩm
function showInputChangeProduct(id) {
    document.querySelector(".container__changeP--products").style.display = "block";
    for (let i = 0; i < DanhSachSanPham.length; i++) {
        if (DanhSachSanPham[i].id == id) {
            document.querySelector("#imgPreview1__changeP").src = DanhSachSanPham[i].image1;
            document.querySelector("#imgPreview2__changeP").src = DanhSachSanPham[i].image2;
            document.querySelector(".input__changeP--name input").value = DanhSachSanPham[i].name;
            document.querySelector(".input__changeP--introduce input").value = DanhSachSanPham[i].introduce;
            document.querySelector(".input__changeP--price input").value = DanhSachSanPham[i].price;
            document.querySelector("#detail1__changeP").value = DanhSachSanPham[i].detail1;
            document.querySelector("#detail2__changeP").value = DanhSachSanPham[i].detail2;
            document.querySelector("#detail3__changeP").value = DanhSachSanPham[i].detail3;
            document.querySelector("#detail4__changeP").value = DanhSachSanPham[i].detail4;
            //nếu click vào button BỎ ẢNH sẽ loại bỏ ảnh 1 cũ
            document.querySelector(".button__changeIMG1").addEventListener("click", function () {
                setIMG1();
            })
            //nếu click vào sẽ loại bỏ ảnh 2 cũ
            document.querySelector(".button__changeIMG2").addEventListener("click", function () {
                setIMG2();
            })
            //xóa sự kiện click cũ trước khi thực hiện sự kiện click mới
            document.querySelector(".button__changeP").replaceWith(document.querySelector(".button__changeP").cloneNode(true));
            //thêm sự kiện click vào button LƯU sẽ cập nhật lại thông tin sản phẩm
            document.querySelector(".button__changeP").addEventListener("click", function () {
                saveChangeProduct(DanhSachSanPham[i]);
            })
            return;
        }
    }
}



//Loại bỏ ảnh 1
function setIMG1() {
    document.querySelector("#imgPreview1__changeP").src = " ";
}



//loại bỏ ảnh 2
function setIMG2() {
    document.querySelector("#imgPreview2__changeP").src = " ";
}


//Lưu thông tin sau khi sửa
function saveChangeProduct(sanPham) {
    sanPham.image1 = document.querySelector("#imgPreview1__changeP").src;
    sanPham.image2= document.querySelector("#imgPreview2__changeP").src;
    sanPham.name = document.querySelector(".input__changeP--name input").value;
    sanPham.introduce = document.querySelector(".input__changeP--introduce input").value;
    sanPham.price = document.querySelector(".input__changeP--price input").value;
    sanPham.detail1 = document.querySelector("#detail1__changeP").value;
    sanPham.detail2 = document.querySelector("#detail2__changeP").value;
    sanPham.detail3 = document.querySelector("#detail3__changeP").value;
    sanPham.detail4 = document.querySelector("#detail4__changeP").value;
    localStorage.setItem("product", JSON.stringify(DanhSachSanPham));
    showArrayProduct();
    document.querySelector(".container__changeP--products").style.display = "none";
}

//click vào đơn hàng mở ra trang đơn hàng
function showPageBill() {
    document.querySelector(".container__right--main").style.display = "none";
    document.querySelector(".container__right--card").style.display = "none";
    document.querySelector("#formBill").style.display = "block";
    let DanhSachBill = JSON.parse(localStorage.getItem("ArrayBill"));
    showArrayBill(DanhSachBill);
}

//Đóng phần xem chi tiết giỏ hàng
function closeViewDonHang() {
    document.querySelector(".modal__viewDonHang").style.display = "none";
}

function showArrayBill(arr) {
    let html = `<thead id="theadBill">
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Chi tiết giỏ hàng</th>
            </thead>
            <tbody id="tbodyBill">`;
    for (let i = 0; i < arr.length; i++) {
        let HTMLbill = showBill(arr[i], i);
        html = html + HTMLbill;
    }
    html = html + `</tbody>`;
    document.querySelector("#tableBill").innerHTML = html;
}

//Show ra tất cả đơn hàng
function showBill(bill, soThuTu) {
    let html = '';
    html += `<tr>
        <td>`+ soThuTu + `</td>
        <td>`+ bill.username + `</td>
        <td>`+ bill.date + `</td>   
        <td>`+ bill.status + `</td>
        <td style="text-align:center;"><button type="button" style="cursor:pointer;height:30px;" onclick="showDonHang(`+ soThuTu + `)">Xem chi tiết đơn hàng</button></td>
            </tr>`
    return html;
}





//Show lại chi tiết đơn hàng mà khách đã đặt
function showDonHang(vitri) {
    document.querySelector(".modal__viewDonHang").style.display = "block";
    let html = '';
    let DanhSachBill = JSON.parse(localStorage.getItem("ArrayBill"));
    for (let i = 0; i < DanhSachBill.length; i++) {
        if (vitri == i) {
            let j = 0, sum = 0;
            while (j < DanhSachBill[i].cart.length) {
                sum += (parseInt(DanhSachBill[i].cart[j][3])) * (parseInt(DanhSachBill[i].cart[j][4])) * 1000;
                html += `<tr>
                <td id="info" style="display: flex;align-items: center;"><img style="width:80px;height:80px;" src="`+ DanhSachBill[i].cart[j][0] + `" alt="">` + DanhSachBill[i].cart[j][1] + `</td>
                <td id="info">`+ DanhSachBill[i].cart[j][2] + `</td>
                <td id="info">`+ DanhSachBill[i].cart[j][4] + `</td>
                <td id="info">`+ ((DanhSachBill[i].cart[j][3] * DanhSachBill[i].cart[j][4]) * 1000).toLocaleString() + `</td>
                </tr>`; j++;
                if (j == DanhSachBill[i].cart.length)
                    html += `<tr id="twoChoose">
                           <input type="hidden" value="`+ i + `">
                            <td id="close" onclick="closeViewDonHang()" colspan="1">CLOSE</td>
                            <td id="savestt" onclick="saveStatus(this)" colspan="2">LƯU TRẠNG THÁI</td>
                            <td id="sumbill" colspan="1">TỔNG TIỀN : <span>` + sum.toLocaleString() + `</span><sup>VNĐ</sup></td>
                        </tr>`
            }
        }
    }
    document.querySelector("#tbody__viewDonHang").innerHTML = html;
}


//Lấy giá trị thay đổi trạng thái
function changeStatus() {
    let changestt = document.querySelector("#changeStt").value;
    return changestt;
}



//Thay đổi trạng thái đơn hàng
function saveStatus(x) {
    let vitriItem = x.parentNode.children[0].value;
    let DanhSachBill = JSON.parse(localStorage.getItem("ArrayBill"));
    for (let i = 0; i < DanhSachBill.length; i++) {
        if (parseInt(vitriItem) == i) {
            DanhSachBill[i].status = changeStatus();
            alert("Lưu trạng thái thành công ! ");
            break;
        }
    }
    localStorage.setItem("ArrayBill", JSON.stringify(DanhSachBill));
    showArrayBill(DanhSachBill);
}

//lọc đơn hàng theo trạng thái bill
function filterStatus() {
    let filterStt = document.querySelector("#filter__status--bill").value;
    let arrayBillOfSTT = [];
    let DanhSachBill = JSON.parse(localStorage.getItem("ArrayBill"));
    for (let i = 0; i < DanhSachBill.length; i++) {
        if (filterStt === DanhSachBill[i].status)
            arrayBillOfSTT.push(DanhSachBill[i]);
    }
    showArrayBill(arrayBillOfSTT);
    if (filterStt == "ALL")
        showArrayBill(DanhSachBill);
}

//Lọc đơn hàng trong một khoảng thời gian nhất định
function filterDay() {
    let filterD = document.querySelector("#filter__time--bill").value;
    let arayBillTime = [];
    let DanhSachBill = JSON.parse(localStorage.getItem("ArrayBill"));
    let past = new Date();
    past.setDate(past.getDate() - parseInt(filterD));
    let now = new Date();
    for (let i = 0; i < DanhSachBill.length; i++) {
        let dayOfBill = new Date(DanhSachBill[i].date);
        if (dayOfBill >= past && dayOfBill <= now) {
            arayBillTime.push(DanhSachBill[i]);
        }
    }
    showArrayBill(arayBillTime);
    if (filterD == "ALL")
        showArrayBill(DanhSachBill);
}


let DanhSachKhachHang = JSON.parse(localStorage.getItem("users")) || [];

// Hiển thị danh sách khách hàng
function showArrayCustomer() {
    let HTML = `<table id="tableCustomer">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;
    
    for (let i = 0; i < DanhSachKhachHang.length; i++) {
        HTML += `<tr>
                    <td>${DanhSachKhachHang[i].username}</td>
                    <td>${DanhSachKhachHang[i].password}</td>
                    <td>
                        <button onclick="showInputChangeCustomer(${i})">Chỉnh sửa</button>
                        <button onclick="deleteCustomer(${i})">Xóa</button>
                    </td>
                 </tr>`;
    }
    
    HTML += `</tbody></table>`;
    
    document.querySelector(".container__right--card").innerHTML = HTML;
}

//Xóa người dùng
function deleteCustomer(index) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        DanhSachKhachHang.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(DanhSachKhachHang));
        showArrayCustomer(); // Cập nhật lại danh sách
    }
}

//Chỉnh sửa người dùng
function showInputChangeCustomer(index) {
    const customer = DanhSachKhachHang[index];
    document.querySelector("#usernameEdit").value = customer.username;
    document.querySelector("#passwordEdit").value = customer.password;
    document.querySelector("#editIndex").value = index; // Lưu index để cập nhật
    document.getElementById("editModal").style.display = "block"; // Hiện modal
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none"; // Đóng modal
}

//Cập nhật người dùng
function updateCustomer() {
    const index = document.querySelector("#editIndex").value;
    const username = document.querySelector("#usernameEdit").value;
    const password = document.querySelector("#passwordEdit").value;

    if (username === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    DanhSachKhachHang[index] = { username, password };
    localStorage.setItem("users", JSON.stringify(DanhSachKhachHang));
    showArrayCustomer(); // Cập nhật lại danh sách
    document.querySelector(".container__edit--customer").style.display = "none"; // Đóng form
}

// Hiển thị trang khách hàng
function showPageCustomer() {
    document.querySelector(".container__right--card").style.display = "block";
    document.querySelector(".container__right--main").style.display = "none";
    document.querySelector("#formBill").style.display = "none";
    showArrayCustomer(); // Gọi hàm hiển thị danh sách khách hàng
}