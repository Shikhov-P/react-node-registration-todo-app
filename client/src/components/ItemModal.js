import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActionCreators';
import PropTypes from 'prop-types';

class ItemModal extends React.Component {
    state = {
        modal: false,
        name: ''
    };

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

        const newItem = {
            name: this.state.name
        };

        this.props.addItem(newItem);

        this.toggle();
    };

    render() {
        return (
            <div>
                <Button
                    color={"dark"}
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Add an item
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to the list
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>Item</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='Add item'
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
    item: state.item
});

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal);