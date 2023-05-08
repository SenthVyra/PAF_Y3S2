import React, { Component } from 'react'
import CommentService from '../services/CommentService';

class CreateCommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            comment: '',
            description: '',
            userId: ''
        }
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateComment = this.saveOrUpdateComment.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CommentService.getCommentById(this.state.id).then( (res) =>{
                let comment = res.data;
                this.setState({comment: comment.comment,
                    description: comment.description,
                    userId : comment.userId
                });
            });
        }        
    }
    saveOrUpdateComment = (e) => {
        e.preventDefault();
        let comment = {comment: this.state.comment, description: this.state.description, userId: this.state.userId};
        console.log('comment => ' + JSON.stringify(comment));

        // step 5
        if(this.state.id === '_add'){
            CommentService.createComment(comment).then(res =>{
                this.props.history.push('/comments');
            });
        }else{
            CommentService.updateComment(comment, this.state.id).then( res => {
                this.props.history.push('/comments');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Comment</h3>
        }else{
            return <h3 className="text-center">Update Comment</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Comment: </label>
                                            <input placeholder="Comment" name="comment" className="form-control" 
                                                value={this.state.comment} onChange={this.changeCommentHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author Name" name="userId" className="form-control" 
                                                value={this.state.userId} onChange={this.changeUserHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateComment}>Save</button>
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

export default CreateCommentComponent
