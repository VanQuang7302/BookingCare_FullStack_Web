import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Bệnh nhân và bác sĩ nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%"
                            height="400px"

                            src="https://youtu.be/FeO8I6WDIRo"
                            title="Startup360 - Bệnh nhân và bác sĩ nói về BookingCare"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe> */}
                        <iframe
                            width="80%"
                            height="350px"
                            src="https://www.youtube.com/embed/FeO8I6WDIRo"
                            title="Cách điều trị đái tháo đường theo phương pháp kiềng ba chân"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Thông qua BookingCare, bệnh nhân có thể tìm hiểu các thông tin về bác sĩ từ chuyên khoa, quá trình đào tạo, kinh nghiệm công tác, khám và chữa các bệnh phù hợp với vấn đề của người bệnh.
                            Ngoài ra, các thông tin về bác sĩ trên BookingCare đã được xác thực rõ ràng, chính xác và cập nhật. Điều này là rất quan trọng với bệnh nhân,
                            vì các thông tin về bác sĩ, cơ sở y tế trên internet thường có sai sót do bị copy và thiếu cập nhật.Với mạng lưới các bác sĩ chuyên khoa giỏi, người bệnh dễ dàng lựa chọn đúng bác sĩ chuyên khoa phù hợp,
                            với thông tin đã xác thực và đặt lịch nhanh chóng, thuận tiện.</p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
