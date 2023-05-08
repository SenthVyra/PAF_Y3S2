import axios from 'axios';

const COMMENT_API_BASE_URL = "http://localhost:8080/api/v1/comments";

class CommentService {

    getComments(){
        return axios.get(COMMENT_API_BASE_URL);
    }

    createComment(comment){
        return axios.post(COMMENT_API_BASE_URL, comment);
    }

    getCommentById(commentId){
        return axios.get(COMMENT_API_BASE_URL + '/' + commentId);
    }

    updateComment(comment, commentId){
        return axios.put(COMMENT_API_BASE_URL + '/' + commentId, comment);
    }

    deleteComment(commentId){
        return axios.delete(COMMENT_API_BASE_URL + '/' + commentId);
    }
}

export default new CommentService()