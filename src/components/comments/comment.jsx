import React, {useState} from 'react';
import moment from 'moment';
import { isEmpty, isEqual, isUndefined,toLower } from 'lodash';
import { FormControl,Label, Button } from "react-bootstrap";
import './commentList.css';

 const Comment = ({obj,user,depth,addNewReply,deleteComment,updateComment}) =>{
    const [replyEnabled,enableReply] = useState(false);
    const [replyComment,setReplyComment] = useState("");
    const [editedComment,setEditedComment] = useState("");
    const [editEnabled,enableEdit] = useState(false);

    const getCommentObj = () => {
       return {
            parentId: obj.parent_id,
            text: editedComment,
            _id:obj._id,
            slug:obj.slug,
            full_slug:obj.full_slug,
            author:obj.author
       };
    }

    const saveRepliedComment = () => {
        if(!isEmpty(replyComment)){
            addNewReply({parentId:obj._id,text:replyComment});
            setReplyComment("");
            enableReply(false);
        }
    }

    const editComment = () => {
        if(!isEmpty(editedComment) && !isEqual(editedComment,obj.text)){
            updateComment(getCommentObj());
            setEditedComment("");
            enableEdit(false);
        }
    }

    const onEdit = () =>{
        setEditedComment(obj.text);
        enableEdit(true);
    }

    const shouldShowEditAndDelete = ()=>{
        return !isUndefined(user) && isEqual(toLower(user).trim(),obj.author);
    }

    const leftMargin = depth*5;
    return (
        <div classaName="comment"  id="comment" style={{ marginLeft: `calc(${leftMargin}%)`}}>
            <label className="comment-text">{obj.text}</label>
            <label className="comment-header">{ obj.author || "Anonymous"}, {moment(obj.postedAt).format('YYYY.MM.DD hh:mm')}</label>
            {
                replyEnabled ? 
                <EditComponent text={replyComment} changeCallBack={(e)=>setReplyComment(e.target.value)}  onSave={()=>saveRepliedComment()} /> : null
            }
            {
                editEnabled ? 
                <EditComponent text={editedComment} changeCallBack={(e)=>setEditedComment(e.target.value)} onSave={()=>editComment()} /> 
                : null
            }                
                <div className="actions">
                    <Label className="btn" onClick={()=>enableReply(true)}>Reply</Label>
                    { shouldShowEditAndDelete() ? <><Label className="btn" onClick={()=>onEdit()}>Edit</Label>
                        <Label className="btn" onClick={()=>deleteComment(obj)}>Delete</Label></> : null
                    } 
                </div>
                </div>
        
    );
}

const EditComponent = (props) => {
    return (<div className="edit-div">
        <FormControl
        type="text"
        className="reply-txt"
        value={props.text}
        onChange={props.changeCallBack}
        />
        <Button className="save-btn btn" onClick={props.onSave}>Save</Button></div>
    );
}

export default Comment; 