import React, { Component } from 'react'
import CommentService from '../services/CommentService';

class UpdateCommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            comment: '',
            description: '',
            userId: ''
        }
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.updateComment = this.updateComment.bind(this);
    }

    componentDidMount(){
        CommentService.getCommentById(this.state.id).then( (res) =>{
            let comment = res.data;
            this.setState({comment: comment.comment,
                description: comment.description,
                userId : comment.userId
            });
        });
    }

    updateComment = (e) => {
        e.preventDefault();
        let comment = {comment: this.state.comment, description: this.state.description, userId: this.state.userId};
        console.log('comment => ' + JSON.stringify(comment));
        console.log('id => ' + JSON.stringify(this.state.id));
        CommentService.updateComment(comment, this.state.id).then( res => {
            this.props.history.push('/comments');
        });
    }
    
    changeCommentHandler= (event) => {
        this.setState({comment: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeUserHandler= (event) => {
        this.setState({userId: event.target.value});
    }

    cancel(){
        this.props.history.push('/comments');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Comment</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="comment" className="form-control" 
                                                value={this.state.comment} onChange={this.changeCommentHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description : </label>
                                            <input placeholder="Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> User Id: </label>
                                            <input placeholder="Auther Name" name="userId" className="form-control" 
                                                value={this.state.userId} onChange={this.changeUserHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateComment}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateCommentComponent
