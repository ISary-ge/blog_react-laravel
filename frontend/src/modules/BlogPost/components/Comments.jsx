import React, { useEffect, useState, useRef } from "react";
import { List, Avatar, Input } from "antd";
import {Button} from 'components';
const { TextArea } = Input;


const Comments = ({id}) => {
    const [commentsData, setCommentsData] = useState([]);
    const [inputData, setInputData] = useState({userName: "", commentText: ""});
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [count,setCount] = useState();

    let commentSkip = useRef(3);

    useEffect(()=>{
        (async () => {
            let response = await fetch(`http://backend.isary.ru/comments/${id}/0`);
            let comments =  await response.json();
            
            if(response.status === 200){
                setCommentsData(comments.data);
                setCount(comments.count);
                if(commentSkip.current > count){
                    setInitLoading(true);
                }else if(comments.count == undefined || comments.count >= commentSkip.current){
                  setInitLoading(false);
                }

            }
            

        })()
    },[]);

    const loadMoreComments = async () => {
        // hide button
        let response = await fetch(`http://backend.isary.ru/comments/${id}/${commentSkip.current}`);

        let comments = await response.json();

        if(response.status === 200){
            let newList = [...commentsData, ...comments.data];
            setCommentsData(newList);
            commentSkip.current +=3;
            setCount(comments.count);
                if(commentSkip.current > count){
                    setInitLoading(true);
                }

        }

    }

    const sendComment = async () => {



        const response = await fetch(`http://backend.isary.ru/comments/${id}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(inputData)
        });
            const comments =  await response.json();
            if(response.status === 200){
                setInputData({userName: "", commentText: ""});
                commentSkip.current = count;
                let newList = [...commentsData, comments.data];
                setCommentsData(newList);
                loadMoreComments();
                setCount(comments.count);
            }

    }

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button
            className="button--comments"
            style={{
                borderRadius: "20px",
                marginBottom: "7px"
            }}
            onClick={loadMoreComments}
        >ещё</Button>
      </div>
    ) : null;

  return (
    <div className="personal-page__comments">
      {/* получить кол-во комментов */}
      <p className="personal-page__comments_count">Комментарии ({count})</p>
      <div className="personal-page__comments-list">
        <List
            itemLayout="horizontal"
            dataSource={commentsData}
            loadMore={loadMore}
            renderItem={(item) => (
            <List.Item style={{
                borderBottom: '0px'
            }}>
                <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.user_name}</a>}
                description={item.text}
                />
            </List.Item>
            )}
        />
      </div>
      <Input
        placeholder="Твоя кличка"
        allowClear
        style={{
            borderRadius: "20px",
            marginBottom: "7px"
        }}
        value={inputData.userName}
        onChange={(e) => {
            setInputData({userName: e.target.value, commentText: inputData.commentText});
        }}
      />
      <br />
      <TextArea
        placeholder="Твой, ничего не значащий, текст"
        allowClear
        style={{
            borderRadius: "20px",
            marginBottom: "5px"
        }}
        value={inputData.commentText}
        onChange={(e) => {
            setInputData({userName: inputData.userName, commentText: e.target.value});
        }}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button
            className="button--comments"
            style={{
                borderRadius: "20px",
                marginBottom: "7px"
            }}
            onClick={sendComment}
        >Ебашь</Button>
      </div>
    </div>
  );
};

export default Comments;
