
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state={
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
        
    }
    
    componentDidMount() {
        let user = this.props.currentUser
        //let {currentUser} = this.props;
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('Didmout edit modal',this.props.currentUser)
    }

    toggle =() =>{
        this.props.toogleFromParent();
    }

    handleOnChangInput=(event,id) =>{
        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // },()=> {
        //     console.log('check bad code: ',this.state)
        // })
        //good code
        let copystate = {...this.state};
        copystate[id] = event.target.value;

        this.setState({
            ...copystate
        });

    }

    checkValideInput=() =>{
        let isValid =true;
        let arrInput =['email','password','firstName','lastName','address'];
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:'+arrInput[i]);
                break; 
            }
        }
        return true;
    }

    handleSaveUser=() =>{
        let isValid = this.checkValideInput();
        if(isValid = true){
            //call api edit user
            this.props.editUser(this.state);
            
        }
        
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>this.toggle()} 
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={()=>this.toggle()}>Edit new user</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' 
                                onChange={(event)=>this.handleOnChangInput(event,'email')} 
                                value={this.state.email}
                                disabled
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password'
                                onChange={(event)=>this.handleOnChangInput(event,'password')}
                                value={this.state.password}
                                disabled
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>First name</label>
                                <input type='text'
                                onChange={(event)=>this.handleOnChangInput(event,'firstName')}
                                value={this.state.firstName}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Last name</label>
                                <input type='text'
                                onChange={(event)=>this.handleOnChangInput(event,'lastName')}
                                value={this.state.lastName}
                                ></input>
                            </div>
                            <div className='input-container max-with-input'>
                                <label>Address</label>
                                <input type='text'
                                onChange={(event)=>this.handleOnChangInput(event,'address')}
                                value={this.state.address}
                                ></input>
                            </div>
                    </div>
                                                                                         
                </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className='px-3' 
                    onClick={()=>{this.handleSaveUser()}}

                    >
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={()=>this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



