import React, { useEffect, useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { NoData } from "components";

const BlogPosts = () => {
    
    const {category} = useParams();
    
    const router = useHistory();
    console.log(router);
    const handlePosts = (id) => {
        router.replace(`/${id}`)
    };
    const [postsData,setPostsData] = useState([]);
    useEffect(()=>{
        const requestUrl = !category ? 'http://backend.isary.ru/posts' : `http://backend.isary.ru/category/${category}`;
        (async () => {
            const response = await fetch(requestUrl);
            const posts =  await response.json();
            if(response.status === 200){
                setPostsData(posts.data);
                console.log(postsData);
            }

        })()
    },[router.location.pathname]);


  if(postsData.length < 1){
      return(
          <NoData/>
      )
  }

  return (
      <div className="post-items">
          {postsData.map((el,idx)=>(
              <a 
              key={idx}
              className="post-item__link"
              onClick={()=>handlePosts(el.id)}
                >
              <div className="post-item" >
                  <div className="post-item__img-block">
                        {/* <EditOutlined />
                        <DeleteOutlined /> */}
                      <img src={el.img} alt="Post" className="post-item__img" />
                  </div>
                  <div className="post-item__text">
                      <div className="post-item__cat">
                        <i style={{backgroundColor: el.color}}></i>
                        <a href={"category/" + el.name}>{el.name}</a>
                        </div>
                      <h2 className="post-item__title">{el.title}</h2>
                  
                      <p className="post-item__descr">{el.description}</p>
                  </div>  
              </div>
          </a>
          ))}


</div>
  );
};

export default BlogPosts;
