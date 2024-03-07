import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // save to mark down
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // save to doctor info
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',


        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
        // this.props.getDoctorPrices();
        // this.props.getPayments();
        // this.props.getProvinces();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
                return result;
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
                return result;
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
                return result;
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            inputData.map((item, index) => {
                let object = {};
                let labelVi = item.valueVi;
                let labelEn = item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        // if (prevProps.allDoctorPrices !== this.props.allDoctorPrices) {
        //     let dataSelectPrice = this.buildDataInputSelect(this.props.allDoctorPrices, 'PRICE')
        //     this.setState({
        //         listPrice: dataSelectPrice
        //     })
        // }

        // if (prevProps.allProvinces !== this.props.allProvinces) {
        //     let dataSelectProvince = this.buildDataInputSelect(this.props.allProvinces)
        //     this.setState({
        //         listProvince: dataSelectProvince
        //     })
        // }

        // if (prevProps.allPayments !== this.props.allPayments) {
        //     let dataSelectPayment = this.buildDataInputSelect(this.props.allPayments)
        //     this.setState({
        //         listPayment: dataSelectPayment
        //     })
        // }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '';
            let selectedPayment = '', selectedPrice = '', selectedProvince = '';
            if (res.data.Doctor_Infor) {
                let doctor_Infor = res.data.Doctor_Infor;
                addressClinic = doctor_Infor.addressClinic;
                nameClinic = doctor_Infor.nameClinic;
                note = doctor_Infor.note;
                priceId = doctor_Infor.priceId;
                paymentId = doctor_Infor.paymentId;
                provinceId = doctor_Infor.provinceId;
                selectedPayment = listPayment.find(item => {
                    if (item.value === paymentId) return item
                })
                selectedPrice = listPrice.find(item => {
                    if (item.value === priceId) return item
                })
                selectedProvince = listProvince.find(item => {
                    if (item.value === provinceId) return item
                })
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
            });
        }
        console.log(`quang beo check 1:`, res);
    };
    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log(selectedOption, name)
    }


    render() {
        let { hasOldData } = this.state;
        console.log('Check state', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={"Choose doctor"}
                        />
                    </div>
                    <div className='content-right '>
                        <label><FormattedMessage id="admin.manage-doctor.introduction-infor" /></label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <input
                            className="form-control"
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.clinic-address" /></label>
                        <input
                            className="form-control"
                            value={this.state.addressClinic}
                            onChange={(event) => { this.handleOnChangeText(event, 'addressClinic') }}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className="form-control"
                            value={this.state.note}
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            //value={selectedSpecialty}
                            //onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-clinic" /></label>
                        <Select
                            //value={selectedClinic}
                            //onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-edit'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <spa><FormattedMessage id="admin.manage-doctor.change" /></spa>
                    }
                </button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        // allDoctorPrices: state.admin.allDoctorPrices,
        // allProvinces: state.admin.allProvinces,
        // allPayments: state.admin.allPayments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        // getDoctorPrices: () => dispatch(actions.getDoctorPrices()),
        // getProvinces: () => dispatch(actions.getProvinces()),
        // getPayments: () => dispatch(actions.getPayments()),

        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
