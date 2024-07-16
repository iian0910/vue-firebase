import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collection
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBeUsgw4zNP5E2mvDr82i6QL5CL6-Lj8ps',
  authDomain: 'vue-firebase-e7230.firebaseapp.com',
  projectId: 'vue-firebase-e7230',
  storageBucket: 'vue-firebase-e7230.appspot.com',
  messagingSenderId: '540493425209',
  appId: '1:540493425209:web:89660b35fec6443ef7fbe8'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const todosCollectionRef = collection(db, 'todos')

const fbAddTodo = async (newTodoContent) => {
  await addDoc(todosCollectionRef, {
    content: newTodoContent,
    done: false,
    date: Date.now()
  })
}

const fbDeleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id))
}

const fbToggleDone = async (todos, id) => {
  const index = todos.value.findIndex(todo => todo.id === id)
  await updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
}

export {
  db,
  fbAddTodo,
  fbDeleteTodo,
  fbToggleDone
}
