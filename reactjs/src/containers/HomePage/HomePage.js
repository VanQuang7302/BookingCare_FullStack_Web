import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Seciton/Specialty';
import MedicailFacility from './Seciton/MedicailFacility';
import OutStandingDoctor from './Seciton/OutStandingDoctor';
import HandBook from './Seciton/HandBook';
import About from './Seciton/About';    
import HomeFooter from './HomeFooter';
import "./HomePage.scss";
class HomePage extends Component {

    render() {
        let settings ={
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
           
        }
        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings={settings} />
                <MedicailFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings = {settings}/>
                <About/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
