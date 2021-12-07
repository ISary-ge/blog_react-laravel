import react, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import ToggleButton from "react-bootstrap/ToggleButton";
import {Typography} from "antd";
import { Button } from 'antd';
const { Title } = Typography;

const Todos = () => {
  
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/todos", {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await response.json();
      if (response.status === 200) {
        setTodoData(result.data);
      }
    })()
  },[]);

  const currentUserName = "iSary";
  const [showInputCreate, setShowInputCreate] = useState(false);
  const [formData, setFormData] = useState("");
  const [idEdit, setIdEdit] = useState(false);

  const createTodo = async () => {

    const urlEdit = idEdit ? `/${idEdit}` : '';
    const response = await fetch(`http://localhost:8000/todos${urlEdit}`, {
      method: "POST",
      body: JSON.stringify({
        title: formData,
        done: false,
        user_id: 1,
        important: false,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    if (response.status === 200) {
      setTodoData(result.data);
      setShowInputCreate(false);
      setFormData("");
      setIdEdit(false);
    }
  };

  const deleteToDo = (id) => {
    let newData = [];
    todoData.forEach((el, idx) => {
      if (el.id !== id) newData.push(el);
    });
    setTodoData(newData);
  };

  const editTodo = (id, title) => {
    setIdEdit(id);
    setFormData(title);
    setShowInputCreate(true);
  };

  const checkedChange = async (id) => {

    const urlEdit = id ? `/${id}` : '';
    const response = await fetch(`http://localhost:8000/todos${urlEdit}`, {
      method: "POST",
      body: JSON.stringify({
        done: !todoData.find((item)=>item.id == id).done,
        important: false
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 200) {
        setTodoData(result.data);
    }

  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
      <Title>{currentUserName} Todos</Title>
      <Button 
        type="primary"
        onClick={() => setShowInputCreate(true)}
      >Create TODO</Button>
      </div>
      {showInputCreate && (
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Create Todo"
              aria-label="Create Todo"
              aria-describedby="basic-addon2"
              value={formData}
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => {
                createTodo();
              }}
            >
              Create
            </Button>
          </InputGroup>
        </div>
      )}
      <ListGroup>
        {todoData &&
          todoData.map((el, idx) => (
            <ListGroup.Item
              key={`todo${idx}`}
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {el.title}
              <ButtonGroup
                aria-label="Basic example"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button variant="secondary" onClick={() => editTodo(el.id,el.title)}>
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => deleteToDo(el.id)}
                  style={{ marginRight: "5px" }}
                >
                  Delete
                </Button>
                <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={el.done}
                  onClick={() => checkedChange(el.id)}
                >
                  Done
                </ToggleButton>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Todos;
