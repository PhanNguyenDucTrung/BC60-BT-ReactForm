import React, { Component } from 'react';
import FormSinhVien from './FormSinhVien.js';
import TableSinhVien from './TableSinhVien.js';

export default class BaiTapForm extends Component {
    render() {
        return (
            <div className='container'>
                <FormSinhVien />
                <TableSinhVien />
            </div>
        );
    }
}
