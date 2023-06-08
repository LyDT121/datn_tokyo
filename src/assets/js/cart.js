function addToCart(item) {
    // debugger;
    item.quantity = 1;
    var list;
    if (localStorage.getItem('cart') == null) {
        list = [item];
    } else {
        list = JSON.parse(localStorage.getItem('cart')) || [];
        let ok = true;
        for (let x of list) {
            if (x.id == item.id) {
                x.quantity += 1;
                ok = false;
                break;
            }
        }
        if (ok) {
            list.push(item);
        }
    }
    localStorage.setItem('cart', JSON.stringify(list));
    alert("Đã thêm giỏ hàng thành công!");
}
var list = JSON.parse(localStorage.getItem('cart'));
function LoadData() {
    var str = "";
    var t = 0;
    for (x of list) {
        t += x.price ;
        str += `<tr>
                        <td><i onclick="Xoa(`+ x.id + `)" class="fa fa-times-circle" style="font-size:30px;color:red;cursor: pointer;" title="Xóa"></i></td>
                        <td><img style="width: 50px; height: 50px;" src="`+ x.image + `"> </td>
                        <td>`+ x.name + `</td>
                        <td>`+ x.price + `đ</td>
                       
                        <td>`+ (x.price ) + `đ</td>
                    </tr>
                 `;
    }
    document.getElementById("listCart").innerHTML = str;
    $("#spTong").text(t);
    $("#tTong").text(t);
}
function XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart', null);
        location.reload();
    }
}
function Xoa(id) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
        var index = list.findIndex(x => x.id == id);
        if (index >= 0) {
            list.splice(index, 1);
        }
        LoadData();
    }
}
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(list));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
}

function ThanhToan() {
    window.location.href = "ThanhToan.html";
}
LoadData();