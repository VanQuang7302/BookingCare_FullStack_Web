import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss'
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils'
import moment from 'moment';
import { getExtrainforDoctorService } from '../../../services/userService';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import NumberFormat from 'react-number-format';

class DoctorExtrainfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailPrice: false,
            extraInfor: {},

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            console.log('check res:', res)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    handleShowDetailPrice = (status) => {
        this.setState({
            isShowDetailPrice: status
        })
    }

    render() {
        let { isShowDetailPrice, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="doctor-detail.extrainfor.clinic-address-title" /></div>
                    <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className="detail-address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className="content-down">
                    {isShowDetailPrice === false &&
                        <div className='short-infor'>
                            <span className="title-price"><FormattedMessage id="doctor-detail.extrainfor.price" /></span>
                            {extraInfor && extraInfor.priceData && this.props.language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            {extraInfor && extraInfor.priceData && this.props.language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'USD'}
                                />
                            }
                            <span className="span-show-hide" onClick={() => this.handleShowDetailPrice(true)}>
                                <FormattedMessage id="doctor-detail.extrainfor.show-detail" />
                            </span>
                        </div>
                    }
                    {isShowDetailPrice === true &&
                        <>
                            <div className="title-price"><FormattedMessage id="doctor-detail.extrainfor.price" /></div>
                            <div className="detail-price">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="doctor-detail.extrainfor.price" />
                                    </span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceData && this.props.language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor && extraInfor.priceData && this.props.language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'USD'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="doctor-detail.extrainfor.payment" />
                                {this.props.language === LANGUAGES.VI ? extraInfor.paymentData.valueVi : extraInfor.paymentData.valueEn}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.handleShowDetailPrice(false)}>
                                    <FormattedMessage id="doctor-detail.extrainfor.hide-detail" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        extrainforDoctor: state.admin.extrainforDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
