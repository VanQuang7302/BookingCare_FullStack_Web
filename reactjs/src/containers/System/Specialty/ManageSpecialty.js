import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { createSpecialtyService, editSpecialty } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedOption: "",
            listOptions: [],
            isOpenModal: false,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {

        }

    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }

    }

    handleSaveSpecialty = async () => {
        console.log('check state', this.state)
        let res = await createSpecialtyService({
            name: this.state.name,
            image: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })

        if (res && res.errCode === 0) {
            toast.success('Create specialty success');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Somethings error...')
            console.log('check error', res.errMessage)
        }
    }

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lí chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            className="form-control"
                            type="text"
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input
                            //value={this.state.imageBase64}
                            className="form-control-file"
                            type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                        <label>Markdown</label>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-new-specialty"
                            onClick={() => this.handleSaveSpecialty()}
                        >Save
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
