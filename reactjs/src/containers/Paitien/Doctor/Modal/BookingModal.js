import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }



    }



    render() {
        let { isOpenModal, closeBookingClose, dateTime } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id="book-appointment.infor-booking" /></span>
                        <span className="right" onClick={closeBookingClose}><i className="fas fa-times"></i></span>
                    </div>

                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            {/* <ProfileDoctor 
                                doctorId = {dataTime.doctorId}
                                isShowDescription = {false}
                                dataTime = {dataTime}
                                isShowLink={false}
                                isShowPrice={true}
                            /> */}
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.fullname" /></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.phoneNumber" /></label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.email" /></label>
                                <input
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.address" /></label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className="form-group col-12">
                                <label><FormattedMessage id="book-appointment.reason" /></label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.birthday" /></label>
                                {/* <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}

                                /> */}
                            </div>
                            <div className="form-group col-6">
                                <label><FormattedMessage id="book-appointment.gender" /></label>
                                {/* <Select
                                    value={this.state.seletedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    placeholder={<FormattedMessage id="book-appointment.gender" />}
                                    name="selectedGender"
                                /> */}

                            </div>
                            {/* {JSON.stringify(dataTime)} */}
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id="book-appointment.confirm" /></button>
                        <button className="btn-booking-cancel" onClick={closeBookingClose}><FormattedMessage id="book-appointment.cancel" /></button>
                    </div>
                </div>
            </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
