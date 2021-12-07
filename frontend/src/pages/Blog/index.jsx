import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BlogPosts, BlogPost } from "modules";
import "./Blog.scss";
import { Logo } from "components";
import { Link, useParams } from "react-router-dom";
import { Drawer, List } from "antd";
const Blog = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://backend.isary.ru/categories");
      const categoryArray = await response.json();
      if (response.status === 200) {
        setCategories(categoryArray.data);
      }
    })();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="blog">
      <header className="blog__header">
        <div className="blog__logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="blog__nav">
          <li>
            <Link to="/auth" style={{ color: "black" }}>
              Войти
            </Link>
          </li>
        </ul>
      </header>
      <section className="blog__content">
        <div class="drawer-handle" onClick={showDrawer}>
          <i class="drawer-handle-icon"></i>
        </div>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <List
            size="large"
            dataSource={categories}
            className="drawer_list"
            renderItem={(item) => (
              <List.Item style={{ border: "none" }}>
                <Link
                  to={`/category/${item.name}`}
                  onClick={() => setVisible(false)}
                >
                  {item.category_title}
                </Link>
              </List.Item>
            )}
          />
        </Drawer>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <BlogPosts />
            </>
          )}
        />
        <Route exact path="/:id" component={BlogPost} />
        <Route path="/category/:category" render={() => <BlogPosts/>} />
      </section>
    </div>
  );
};

export default Blog;
