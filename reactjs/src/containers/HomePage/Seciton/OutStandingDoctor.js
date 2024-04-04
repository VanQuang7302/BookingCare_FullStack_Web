import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import './MedicailFacility.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        console.log(doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        console.log('qb check props: ', this.props.topDoctorsRedux);
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.language;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section"><FormattedMessage id="homepage.out-standing-doctor" /></span>
                        {/* <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button> */}
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {/* <div className='section-customize'>
                            <div className='customize-border'>
                                <div className='outer-gb'>
                                    <div className='bg-image section-outstanding-doctor' ></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư tiến sĩ Quang Béo</div>
                                    <div>Cơ xuong khớp 1</div>
                                </div>       
                            </div>                                                
                        </div> */}
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-gb'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xuong khớp 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
