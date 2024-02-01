import React, { Component } from 'react';
import { connect } from 'react-redux';

export class FormSinhVien extends Component {
    state = {
        values: { maSV: '', hoTen: '', soDienThoai: '', email: '' },
        errors: { maSV: '', hoTen: '', soDienThoai: '', email: '' },
        valid: false,
    };

    handleChange = e => {
        let { name, value } = e.target;

        let errorMessage = '';

        if (value.trim() === '') {
            // Kiểm tra bất kì  input nào bị rỗng thì gán lỗi
            errorMessage = name + ' không được bỏ trống !';
        }

        if (name === 'maSV') {
            // Kiểm tra mã sinh viên
            const regexMaSV = /^[0-9]+$/;
            if (!regexMaSV.test(value)) {
                errorMessage = name + ' không đúng định dạng !';
            }
        }

        if (name === 'hoTen') {
            // Kiểm tra họ tên
            const regexHoTen = /^[a-z A-Z]+$/;
            if (!regexHoTen.test(value)) {
                errorMessage = name + ' không đúng định dạng !';
            }
        }

        // Kiểm tra email
        if (name === 'email') {
            // Nếu là email thì kiểm tra định dạng email
            const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexEmail.test(value)) {
                errorMessage = name + ' không đúng định dạng !';
            }
            // Kiểm tra email đã tồn tại
            const { mangSinhVien } = this.props;
            const emailExists = mangSinhVien.some(sinhVien => sinhVien.email === value);
            if (emailExists && !this.props.sinhVienDangSua) {
                errorMessage = 'Email đã tồn tại !';
            }
        }

        // Kiểm tra số điện thoại
        if (name === 'soDienThoai') {
            const regexNumber = /^[0-9]+$/;
            if (!regexNumber.test(value)) {
                errorMessage = name + ' không đúng định dạng !';
            }
        }

        let values = { ...this.state.values, [name]: value }; // Cập nhật giá trị values cho state
        let errors = { ...this.state.errors, [name]: errorMessage }; // Cập nhật giá trị errors cho state

        this.setState({ ...this.state, values: values, errors: errors }, () => {
            console.log(this.state);
            this.checkValid();
        });
    };

    checkValid = () => {
        let valid = true;
        // Duyệt thuộc tính trong object
        for (let key in this.state.errors) {
            if (this.state.errors[key] !== '' || this.state.values[key] === '') {
                valid = false;
            }
        }
        this.setState({ ...this.state, valid: valid }, () => {
            console.log(this.state);
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { maSV } = this.state.values;
        const { mangSinhVien } = this.props;

        // Check if maSV already exists
        const sinhVienExists = mangSinhVien.some(sinhVien => sinhVien.maSV === maSV);

        if (sinhVienExists && !this.props.sinhVienDangSua) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    maSV: 'Mã SV đã tồn tại',
                },
            });
            return;
        }
        if (this.props.sinhVienDangSua) {
            this.props.capNhatSinhVien(this.state.values);
        } else {
            this.props.themSinhVien(this.state.values);
        }
        this.setState({ ...this.state, valid: false }, () => {
            console.log(this.state);
        });
        this.resetForm();
    };

    resetForm = () => {
        // Reset form
        this.setState({
            values: { maSV: '', hoTen: '', soDienThoai: '', email: '' },
            errors: { maSV: '', hoTen: '', soDienThoai: '', email: '' },
        });
    };

    handleCancel = () => {
        this.props.resetSinhVienDangSua();
        this.resetForm();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.sinhVienDangSua !== this.props.sinhVienDangSua) {
            if (this.props.sinhVienDangSua) {
                this.setState({
                    values: this.props.sinhVienDangSua,
                    errors: { maSV: '', hoTen: '', soDienThoai: '', email: '' },
                });
            } else {
                this.resetForm();
            }
        }
    }
    render() {
        return (
            <div className='container'>
                <div className='card text-left'>
                    <div className='card-header bg-dark text-white'>
                        <h3>Thông tin sinh viên</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='row'>
                                <div className='form-group col-6'>
                                    <span>Mã SV</span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='maSV'
                                        disabled={this.props.sinhVienDangSua ? true : false}
                                        value={this.state.values.maSV}
                                        onChange={this.handleChange}
                                    />
                                    <p className='text-danger'>{this.state.errors.maSV}</p>
                                </div>
                                <div className='form-group col-6'>
                                    <span>Họ tên</span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='hoTen'
                                        value={this.state.values.hoTen}
                                        onChange={this.handleChange}
                                    />
                                    <p className='text-danger'>{this.state.errors.hoTen}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='form-group col-6'>
                                    <span>Số điện thoại</span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='soDienThoai'
                                        value={this.state.values.soDienThoai}
                                        onChange={this.handleChange}
                                    />
                                    <p className='text-danger'>{this.state.errors.soDienThoai}</p>
                                </div>
                                <div className='form-group col-6'>
                                    <span>Email</span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='email'
                                        value={this.state.values.email}
                                        onChange={this.handleChange}
                                    />
                                    <p className='text-danger'>{this.state.errors.email}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-12 text-right'>
                                    {this.state.valid ? (
                                        this.props.sinhVienDangSua ? (
                                            <>
                                                <button
                                                    type='button'
                                                    className='btn btn-primary'
                                                    onClick={this.handleCancel}>
                                                    Cancel
                                                </button>
                                                <button type='submit' className='btn btn-success ml-2'>
                                                    Cập nhật sinh viên
                                                </button>
                                            </>
                                        ) : (
                                            <button type='submit' className='btn btn-success'>
                                                Thêm sinh viên
                                            </button>
                                        )
                                    ) : this.props.sinhVienDangSua ? (
                                        <>
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={this.handleCancel}>
                                                Cancel
                                            </button>
                                            <button disabled className='btn btn-danger ml-2'>
                                                Cập nhật sinh viên
                                            </button>
                                        </>
                                    ) : (
                                        <button disabled className='btn btn-danger'>
                                            Thêm sinh viên
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        mangSinhVien: state.QuanLySinhVienReducer.mangSinhVien,
        sinhVienDangSua: state.QuanLySinhVienReducer.sinhVienDangSua,
    };
};
const matchDispatchToProps = dispatch => {
    return {
        themSinhVien: sinhVien => {
            const action = {
                type: 'THEM_SINH_VIEN',
                sinhVien,
            };
            dispatch(action);
        },

        capNhatSinhVien: sinhVien => {
            const action = {
                type: 'CAP_NHAT_SINH_VIEN',
                sinhVien,
            };
            dispatch(action);
        },

        resetSinhVienDangSua: () => {
            const action = {
                type: 'RESET_SINH_VIEN_DANG_SUA',
            };
            dispatch(action);
        },
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(FormSinhVien);
