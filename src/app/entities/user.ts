import { Role } from "./role";

export class User {
    maNguoiDung?: number;
    taiKhoan?: string;
    matKhau?: string;
    hoTen?: string;
    diaChi?: string;
    dienThoai?: string;
    avatar?:string;
    email?: string;
    role?: Role;
    token?: string;
}