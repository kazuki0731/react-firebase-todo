import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "@firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  console.log("render");
  const getAllTodos = async () => {
    const data = [];
    try {
      const q = query(collection(db, "todos"), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          isComplete: doc.data().isComplete,
          text: doc.data().text,
        });
      });
      setTodos(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const add = async (text) => {
    await addDoc(collection(db, "todos"), {
      text: text,
      isComplete: false,
      createdAt: new Date(),
    });
    getAllTodos();
  };

  const update = async (id, isComplete) => {
    const updateRef = doc(db, "todos", id);
    await updateDoc(updateRef, {
      isComplete: !isComplete,
    });
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !isComplete;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const remove = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, add, update, remove }}>
      {children}
    </TodosContext.Provider>
  );
};
