const stateDefault = {
    mangSinhVien: [],
};

export const QuanLySinhVienReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN': {
            const mangSinhVienUpdate = [...state.mangSinhVien, action.sinhVien];
            state.mangSinhVien = mangSinhVienUpdate;
            return { ...state };
        }

        case 'XOA_SINH_VIEN': {
            const mangSinhVienUpdate = [...state.mangSinhVien];
            const index = mangSinhVienUpdate.findIndex(sv => sv.maSV === action.maSV);
            if (index !== -1) {
                mangSinhVienUpdate.splice(index, 1);
            }
            state.mangSinhVien = mangSinhVienUpdate;
            return { ...state };
        }

        case 'SUA_SINH_VIEN': {
            console.log(action.sinhVien);
            state.sinhVienDangSua = action.sinhVien;
            return { ...state };
        }

        case 'CAP_NHAT_SINH_VIEN': {
            console.log('Updating student in reducer', action.sinhVien);
            const mangSinhVienUpdate = [...state.mangSinhVien];
            const index = mangSinhVienUpdate.findIndex(sv => sv.maSV === action.sinhVien.maSV);
            if (index !== -1) {
                mangSinhVienUpdate[index] = action.sinhVien;
            }
            state.sinhVienDangSua = null;
            state.mangSinhVien = mangSinhVienUpdate;
            return { ...state };
        }

        case 'RESET_SINH_VIEN_DANG_SUA': {
            console.log('reset sinhVienDangSua');
            state.sinhVienDangSua = null;
            return { ...state };
        }

        default: {
            return { ...state };
        }
    }
};
