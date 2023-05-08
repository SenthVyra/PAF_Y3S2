import React, { Component } from 'react'
import CommentService from '../services/CommentService'

class ViewCommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            comment: {}
        }
    }

    componentDidMount(){
        CommentService.getCommentById(this.state.id).then( res => {
            this.setState({comment: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Comment Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Comment : </label>
                            <div> { this.state.comment.comment }</div>
                        </div>
                        <div className = "row">
                            <label> Description : </label>
                            <div> { this.state.comment.description }</div>
                        </div>
                        <div className = "row">
                            <label> Author : </label>
                            <div> { this.state.comment.userId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCommentComponent
