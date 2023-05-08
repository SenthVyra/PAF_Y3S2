import React, { Component } from 'react'
import CommentService from '../services/CommentService'

class ListCommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: []
        }
        this.addComment = this.addComment.bind(this);
        this.editComment = this.editComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment(id){
        CommentService.deleteComment(id).then( res => {
            this.setState({Comments: this.state.comments.filter(comment => comment.id !== id)});
        });
    }
    viewComment(id){
        this.props.history.push(`/view-comment/${id}`);
    }
    editComment(id){
        this.props.history.push(`/add-comment/${id}`);
    }

    componentDidMount(){
        CommentService.getComments().then((res) => {
            this.setState({ comments: res.data});
        });
    }

    addComment(){
        this.props.history.push('/add-comment/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Comments & Descriptions </h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addComment}> Add Comment</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Comment </th>
                                    <th> Description </th>
                                    <th> Author </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.comments.map(
                                        comment => 
                                        <tr key = {comment.id}>
                                             <td> {comment.comment} </td>   
                                             <td> {comment.description}</td>
                                             <td> {comment.userId}</td>
                                             <td>
                                                 <button onClick={ () => this.editComment(comment.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteComment(comment.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewComment(comment.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListCommentComponent
