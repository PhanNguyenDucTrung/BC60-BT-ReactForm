import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableSinhVien extends Component {
    state = {
        searchTerm: '',
    };

    handleSearch = e => {
        this.setState({ searchTerm: e.target.value });
    };

    renderSinhVien = () => {
        const { mangSinhVien } = this.props;
        return mangSinhVien.map((sinhVien, index) => {
            return (
                <tr key={index}>
                    <td>{sinhVien.maSV}</td>
                    <td>{sinhVien.hoTen}</td>
                    <td>{sinhVien.soDienThoai}</td>
                    <td>{sinhVien.email}</td>
                    <td>
                        <button
                            className='btn btn-success'
                            onClick={() => {
                                this.props.suaSinhVien(sinhVien);
                            }}>
                            <i className='fa fa-edit'></i>
                        </button>
                        <button
                            className='btn btn-danger ml-2'
                            onClick={() => {
                                this.props.xoaSinhVien(sinhVien.maSV);
                                this.props.resetSinhVienDangSua();
                            }}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };
    render() {
        console.log(this.props.mangSinhVien);
        const filteredSinhVien = this.props.mangSinhVien.filter(sinhVien =>
            sinhVien.hoTen.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );

        return (
            <div className='container'>
                <div className='row'>
                    <input
                        type='text'
                        onChange={this.handleSearch}
                        placeholder='Search...'
                        className='form-control col-6 my-3 mx-3'
                    />
                </div>
                <table className='table'>
                    <thead>
                        <tr className='bg-dark text-white'>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSinhVien.length > 0 ? (
                            this.renderSinhVien()
                        ) : (
                            <tr>
                                <td colSpan='4'>Không có sinh viên nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { mangSinhVien: state.QuanLySinhVienReducer.mangSinhVien };
};

const mapDispatchToProps = dispatch => {
    return {
        xoaSinhVien: maSV => {
            const action = {
                type: 'XOA_SINH_VIEN',
                maSV,
            };
            dispatch(action);
        },
        suaSinhVien: sinhVien => {
            const action = {
                type: 'SUA_SINH_VIEN',
                sinhVien,
            };
            dispatch(action);
        },
        resetSinhVienDangSua: () => {
            console.log('reset sinhVienDangSua');
            const action = {
                type: 'RESET_SINH_VIEN_DANG_SUA',
            };
            dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableSinhVien);
