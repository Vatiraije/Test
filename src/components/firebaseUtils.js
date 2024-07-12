import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const todosCollectionRef = collection(db, 'todos');

export const addTodo = async (text, userId) => {
  console.log('addTodo called with:', text, userId); // Debug log
  try {
    const docRef = await addDoc(todosCollectionRef, {
      text,
      userId,
    });
    console.log('Todo added with ID:', docRef.id); // Debug log
    return docRef.id;
  } catch (error) {
    console.error('Error adding todo: ', error);
    throw error;
  }
};

export const getTodos = async (userId) => {
  console.log('getTodos called with userId:', userId); // Debug log
  try {
    const q = query(todosCollectionRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,  // Ensure the text is included
        userId: data.userId,
      };
    });
    console.log('Fetched todos: ', todos); // Debug log
    return todos;
  } catch (error) {
    console.error('Error getting todos: ', error);
    throw error;
  }
};

export const updateTodo = async (id, text) => {
  console.log('updateTodo called with:', id, text); // Debug log
  try {
    const todoDocRef = doc(db, 'todos', id);
    await updateDoc(todoDocRef, {
      text,
    });
  } catch (error) {
    console.error('Error updating todo: ', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  console.log('deleteTodo called with:', id); // Debug log
  try {
    const todoDocRef = doc(db, 'todos', id);
    await deleteDoc(todoDocRef);
  } catch (error) {
    console.error('Error deleting todo: ', error);
    throw error;
  }
};