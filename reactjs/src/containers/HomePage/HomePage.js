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

    componentDidMount() {
        // Load the Dialogflow messenger script
        // const script = document.createElement("script");
        // script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
        // script.async = true;
        // document.body.appendChild(script);
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicailFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <About />
                <HomeFooter />

                {/* Add Dialogflow Messenger */}
                {/* <df-messenger
                    intent="WELCOME"
                    chat-title="BookingCare_ChatBox"
                    agent-id="35a9454e-7af2-4630-a14e-aa68ba4cf9e3"
                    language-code="vi"
                ></df-messenger> */}
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
