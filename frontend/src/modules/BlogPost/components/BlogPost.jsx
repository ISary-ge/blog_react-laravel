import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const BlogPost = () => {
    const {id} = useParams();
    const [postData, setPostData] = useState([]);



    useEffect(()=>{
        (async () => {
            const response = await fetch(`http://backend.isary.ru/post/${id}`);
            const post =  await response.json();
            if(response.status === 200){
                setPostData(post.data);
            }

        })()
    },[]);
    if(postData){
        return (
            <>
            <div className="personal-page">
                <h1 className="personal-page__title">{postData.title}</h1>
                <ul className="personal-page__meta">
                    <li className="personal-page__cat">
                        <i style={{backgroundColor: postData.color}}></i>
                        <a href={"category/" + postData.name}>{postData.name}</a>
                    </li>
                    <li className="personal-page__views">
                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0.70875 2.577 3.79725 0 7.5 0C11.2027 0 14.2913 2.577 15 6C14.2913 9.423 11.2027 12 7.5 12C3.79725 12 0.70875 9.423 0 6ZM7.5 9.75C8.49456 9.75 9.44839 9.35491 10.1517 8.65165C10.8549 7.94839 11.25 6.99456 11.25 6C11.25 5.00544 10.8549 4.05161 10.1517 3.34835C9.44839 2.64509 8.49456 2.25 7.5 2.25C6.50544 2.25 5.55161 2.64509 4.84835 3.34835C4.14509 4.05161 3.75 5.00544 3.75 6C3.75 6.99456 4.14509 7.94839 4.84835 8.65165C5.55161 9.35491 6.50544 9.75 7.5 9.75ZM7.5 8.25C8.09674 8.25 8.66903 8.01295 9.09099 7.59099C9.51295 7.16903 9.75 6.59674 9.75 6C9.75 5.40326 9.51295 4.83097 9.09099 4.40901C8.66903 3.98705 8.09674 3.75 7.5 3.75C6.90326 3.75 6.33097 3.98705 5.90901 4.40901C5.48705 4.83097 5.25 5.40326 5.25 6C5.25 6.59674 5.48705 7.16903 5.90901 7.59099C6.33097 8.01295 6.90326 8.25 7.5 8.25V8.25Z" fill="#D5D5D5"></path></svg>
                        {postData.views}
                    </li>
                    <li className="personal-page__date">{postData.date}</li>
                </ul>
                <div className="personal-page__content" dangerouslySetInnerHTML={{__html: postData.content}}></div>
            </div>
            <Comments id={id}/>
        </>
        )
    }else{
        return(
            <>
            Данной статьи не существует.
            </>
        )
    }
    
};

export default BlogPost;