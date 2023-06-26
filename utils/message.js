const messages = {
    validation: {
        auth: {
            email: {
                required: "Email không được để trống.",
                invalid: "Email không hợp lệ.",
            },
            password: {
                required: "Mật khẩu không được để trống.",
                invalid: "Mật khẩu không hợp lệ.",
            },
            firstName: {
                required: "Họ không được để trống.",
                isString: "Họ phải là chuỗi.",
            },
            lastName: {
                required: "Tên không được để trống.",
                isString: "Tên phải là chuỗi.",
            },
            username: {
                required: "Username không được để trống.",
                isString: "Username là chuỗi.",
            }
        }
    },
    login: {
        success: "Đăng nhập thành công.",
        error: "Tài khoản hoặc mật khẩu không đúng.",
        notExist: "Tài khoản không tồn tại.",
    },
    signup: {
        success: "Đăng ký thành công.",
        error: "Đã có lỗi xảy ra.",
    },
    refreshToken: {
        success: "Lấy token thành công.",
        error: "Đã có lỗi xảy ra.",
    },
}

module.exports = {
    messages
}