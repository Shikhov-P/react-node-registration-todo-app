import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../actions/authActionCreators';
import PropTypes from 'prop-types';

class RegistrationModal extends React.Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        message: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { error } = this.props;

        if (error !== prevProps.error){
            if (error.id === "REGISTER_FAIL") {
                this.setState({message: error.message.message})
            } else {
                this.setState({message: null})
            }
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password, repeatPassword } = this.state;

        this.props.register({ name, email, password, repeatPassword});
    };

    render() {
        return (
            <div>
               <NavLink href={"#"} onClick={this.toggle}>
                   Register
               </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        { this.state.message ?
                            (<Alert color={"danger"}>{this.state.message}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name: </Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Your name'
                                    className={'mb-3'}
                                    onChange={this.onChange}
                                />

                                <Label for='email'>Email: </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Your email'
                                    className={'mb-3'}
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password: </Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className={'mb-3'}
                                    onChange={this.onChange}
                                />

                                <Label for='repeatPassword'>Repeat password: </Label>
                                <Input
                                    type='repeatPassword'
                                    name='repeatPassword'
                                    id='repeatPassword'
                                    placeholder='Repeat password'
                                    className={'mb-3'}
                                    onChange={this.onChange}
                                />

                                <Button
                                    color={"dark"}
                                    style={{marginBottom: '2rem'}}
                                    block
                                >
                                    Add an item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    error: state.error
});

export default connect(
    mapStateToProps,
    { register }
)(RegistrationModal);