import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import { deleteHelper, getHelper, patchHelper, postHelper } from "../helpers/client";
import Modal from "react-modal";

import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Home = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = useState("");
  const [cred, setCred] = useState({
    title: "",
    description: "",
  });
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
  });
  const [reRender, setRerender] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({})

  const handleLogOut = () => {};

  const handleChange = (e) => {
    setCred((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateChange = (e) => {
    setUpdateTask((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  function openModal(task) {
    setIsOpen(true);
    setCurrentTask(task)
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addTaskHandler = async () => {
    try {
      if (cred.description === "" || cred.title === "") {
        toast.error("Title or Description must be provided");
        return;
      }

      const res = await postHelper("task", cred, null, token);

      if (res.status === 200) {
        toast.success("Task successfully created");
        setRerender((pre) => pre + 1);
      }
    } catch (err) {}
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      const res = await deleteHelper(
        "task",
        null,
        {
          taskId,
        },
        token
      );

      if (res.status === 200) {
        toast.error("Task deleted successfully");
        setRerender((pre) => pre + 1);
      }
    } catch (err) {}
  };
  const updateTaskHandler = async (taskId) => {
    try {
      const res = await patchHelper(
        "task",
        updateTask,
        {
          taskId: currentTask?._id,
        },
        token
      );

      if (res.status === 200) {
        toast.success("Task updated successfully");
        setIsOpen(false);
        setRerender((pre) => pre + 1);
      }
    } catch (err) {}
  };

  const fetchAllTask = async () => {
    try {
      const res = await getHelper("task/all", null, token);
      setTasks(res?.data?.payload?.tasks);
      console.log(res, "alltask");
    } catch (err) {}
  };
  useEffect(() => {
    let token = localStorage.getItem("token");

    setToken(token);
  }, []);

  useEffect(() => {
    fetchAllTask();
  }, [reRender]);

  console.log(token, "weeeeed", currentTask);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontFamily: "sans-serif" }}>Vertex Task Manager</h1>
          <img
            style={{ width: 50, height: 50, marginLeft: 10 }}
            src={require("../assets/task.png")}
          />
        </div>
        <Button variant="danger">Log out</Button>
      </div>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>What is your Task ?</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Morning Routing"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Buy some bread 🍞">
          <Form.Label>Describe your task!</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="description"
            placeholder="Buy some bread 🍞"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button onClick={addTaskHandler} variant="outline-success">
          Add Task
        </Button>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
      {tasks.map((task) => {
        return (
          <div
            className="border rounded p-2 pt-3 m-3"
            style={{ width: "18rem" }}
          >
            <h3>{task?.title}</h3> <p>{task?.description}</p>
            <div style={{ display: "flex" }}>
              <MdOutlineModeEdit onClick={() => openModal(task)} size={20} />
              <div style={{ marginLeft: 20 }} />
              <MdDeleteOutline
                onClick={() => deleteTaskHandler(task?._id)}
                size={20}
                color="red"
              />
            </div>
          </div>
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Your Task!</h2>
       
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
          value={updateTask?.title}
            onChange={handleUpdateChange}
            name="title"
            type="text"
            placeholder="Morning Routing"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Buy some bread 🍞">
          <Form.Label>Describe your task!</Form.Label>
          <Form.Control
          value={updateTask?.description}
            onChange={handleUpdateChange}
            name="description"
            placeholder="Buy some bread 🍞"
            as="textarea"
            rows={3}
          />
        </Form.Group>
       
       <div style={{display: 'flex'}}>
       <Button variant="secondary" style={{ marginRight: 10}} onClick={closeModal}>Close</Button>
       <Button onClick={updateTaskHandler} variant="outline-success">
          Update Task
        </Button>
       </div>
      
      </Form>
     
      </Modal>
    </div>
  );
};

export default Home;
