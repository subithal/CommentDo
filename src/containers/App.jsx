import React from 'react';
import { getRequest, postRequest } from '../utils/';
import { cloneDeep, pullAllWith,startsWith } from 'lodash';
import CommentList from '../components/comments';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    }
    this.setComments = this.setComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.getAllComments = this.getAllComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  componentDidMount() {
    this.getAllComments()
  }

  setComments(data) {
    this.setState({
      commentList: data
    });
  }

  getAllComments() {
    return getRequest("/api/comment/getAll").then((res) => this.setComments(res.data));
  }

  

  addComment(data) {
    const obj = {
      parentId: data.parentId,
      text: data.text,
      author: this.props.params.userId || ""
    };
    postRequest("/api/comment/add", obj).then((res) => {
      if (res.data) {
       this.getAllComments();
      }
    })
    .catch((err) => { throw err });
  }

  deleteComment(obj) {
    postRequest("/api/comment/delete", obj).then((res) => {
      if (res.data.deletedCount >= 1) {
        this.getAllComments();
      }
    })
    .catch((err) => { throw err });
  }

  updateComment(obj) {
    postRequest("/api/comment/edit", obj).then((res) => { 
      if(res.data){
        this.getAllComments();
      }
     })
     .catch((err) => { throw err });
  }

  render() {
    const state = this.state;
    const user = this.props.params.userId || "Anonymous";
    return (
      <div id="app">
        <CommentList user={user} comments={state.commentList || []} addComment={this.addComment}
          deleteComment={this.deleteComment} updateComment={this.updateComment} />
      </div>
    )
  }

};

export default App;