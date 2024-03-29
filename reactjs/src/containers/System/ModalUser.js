
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

  constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        address:'',
    }
    this.listenToEmitter();
  }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
            })
        })
    }
    componentDidMount() {
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

    handleAddNewUser=() =>{
        let isValid = this.checkValideInput();
        if(isValid = true){
            //call api
            this.props.createNewUser(this.state);
            
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
                <ModalHeader toggle={()=>this.toggle()}>Create new user</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' 
                                onChange={(event)=>this.handleOnChangInput(event,'email')} 
                                value={this.state.email}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password'
                                onChange={(event)=>this.handleOnChangInput(event,'password')}
                                value={this.state.password}
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
                    onClick={()=>{this.handleAddNewUser()}}

                    >
                        Add new user
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



