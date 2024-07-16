<template>
  <div class="todo-list">
    <div class="title has-text-centered">Todo List</div>
    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo"
          >
        </p>
        <p class="control">
          <button
            class="button is-info"
            :disabled="!newTodoContent"
          >
            Add
          </button>
        </p>
      </div>
    </form>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card"
      :class="{ 'has-background-success-light' : todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through' : todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)"
              >
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import {
  db,
  fbAddTodo,
  fbDeleteTodo,
  fbToggleDone
} from '@/firebase/firebase.config'

const todos = ref([])
const newTodoContent = ref('')
const todosCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy('date'))

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})

const addTodo = () => {
  fbAddTodo(newTodoContent.value)
  newTodoContent.value = ''
}

const deleteTodo = (id) => {
  fbDeleteTodo(id)
}

const toggleDone = async (id) => {
  fbToggleDone(todos, id)
}
</script>

<style lang="scss" scoped>
@import 'bulma/css/bulma.min.css';

.todo-list {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
