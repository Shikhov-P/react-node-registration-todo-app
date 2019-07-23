import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../actions/itemActionCreators';

class MainList extends React.Component {
    componentDidMount() {
        this.props.getItems();
    };

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.func.isRequired,
    };

    onClickDeleteItem = (id) => {
        this.props.deleteItem(id);
    };

    render() {
        let { items } = this.props.item;
        console.log(items);
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className={"main-list"}>
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={400} classNames={"fade"}>
                                <ListGroupItem>
                                    <Button
                                        className={"remove-btn"}
                                        color={"danger"}
                                        size={"sm"}
                                        onClick={() => {this.onClickDeleteItem(_id)}}
                                     >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }

}

const mapStateToProps = state => ({
    item: state.item
});


export default connect(mapStateToProps, { getItems, deleteItem })(MainList);