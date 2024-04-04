// HomePage.js

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
        const script = document.createElement("script");
        script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
        script.async = true;
        document.body.appendChild(script);

        // Add scroll event listener
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        // Remove scroll event listener when component unmounts
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const scrolled = window.scrollY > 100; // Change this value as needed
        const buttons = document.querySelectorAll('.zalo-button, .facebook-button, .hotline-button');

        buttons.forEach(button => {
            if (scrolled) {
                button.classList.add('scrolled');
            } else {
                button.classList.remove('scrolled');
            }
        });
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
                <df-messenger
                    intent="WELCOME"
                    chat-title="BookingCare_ChatBox"
                    agent-id="35a9454e-7af2-4630-a14e-aa68ba4cf9e3"
                    language-code="vi"
                ></df-messenger>

                <div className='connect-button'>
                    <a href="https://zalo.me/your_zalo_id" >

                        <div className="zalo-button" >
                            <img />
                        </div>
                    </a>
                    <a href="https://www.facebook.com/your_facebook_page" >
                        <div className="facebook-button">
                            <img />
                        </div>
                    </a>


                    {/* <a href="tel:your_hotline_number" >
                        <div className="hotline-button">
                            <img />
                        </div>
                    </a> */}


                </div>

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
