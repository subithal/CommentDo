import React, { useState } from "react";
import { isEmpty } from "lodash";
import { FormControl, Button } from "react-bootstrap";
import Comment from './comment';
import './commentList.css';


const CommentList = (props) => {
    const [newCommentText, setNewCommentText] = useState("");

    const depthCalculator = (slug) => {
        if (!isEmpty(slug)) {
            return (slug.match(new RegExp("/", "g")) || []).length + 1;
        }
        return 1;
    }

    const addNewComment = () => {
        if (!isEmpty(newCommentText)) {
            const obj = {
                parentId: null,
                text: newCommentText,
            }
            props.addComment(obj);
            setNewCommentText("");
        }
    }

    return (
        <div>
            <FormControl
                type="text"
                className="textbox"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
            />
            <Button className="newComment-btn" onClick={() => addNewComment()}>Add Comment</Button>
            {
                props.comments.map((commentObj) => {
                    const depth = depthCalculator(commentObj.full_slug);
                    return (<Comment user={props.user} depth={depth} key={commentObj._id} obj={commentObj} addNewReply={props.addComment}
                        deleteComment={props.deleteComment} updateComment={props.updateComment} />);
                })
            }

        </div>
    );
}




export default CommentList;

