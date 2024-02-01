import { combineReducers } from 'redux';
import { QuanLySinhVienReducer } from './QuanLySinhVienReducer';

// store tổng ứng dụng

export const rootReducer = combineReducers({
    // nơi sẽ chứa các reducer cho nghiệp vụ (store con)
    QuanLySinhVienReducer,
});
