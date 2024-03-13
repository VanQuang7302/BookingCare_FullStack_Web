import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { LANGUAGES } from '../../../utils';
import { getClinicByIdService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getClinicByIdService({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }



    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getClinicByIdService({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }

    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let language = this.props.language;
        return (
            <>
                <div className="detail-specialty-container">
                    <HomeHeader />

                    <div className="detail-specialty-body">
                        <div className="specialty-description">
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                &&
                                <>
                                    <div>{dataDetailClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                </>
                            }
                        </div>
                        {/* <div className="search-sp-doctor">
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div> */}
                        {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor">
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                // dataTime = {dataTime}
                                                isShowLink={true}
                                            //isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                                key={index}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
