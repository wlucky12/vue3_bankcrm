<script setup>
import { ref } from 'vue'
import  axios  from 'axios'
getTodos()
const todos = ref([
])
const newTodo = ref('')
const isCompleted = ref(true)

async function getTodos (){
  const res = await axios({
    url: 'https://gyiuq58mqp.hzh.sealos.run/gettodo',
    method: 'GET',
  })
  todos.value = res.data.todo
}

const addtodo =async() => {
  // if(newTodo.value.trim()!==''){
  //   todos.value.push({value:newTodo.value,
  //     isCompleted:false,
  //   }
  //   )
  //   newTodo.value = ''
  // }
  await axios({
    url: 'https://gyiuq58mqp.hzh.sealos.run/add_todo',
    method: 'POST',
    data: {
      value:newTodo.value,
      isCompleted:false,
    }
  })
  newTodo.value = ''
  getTodos()

}

const update=async(id) => {
  await axios({
    url: 'https://gyiuq58mqp.hzh.sealos.run/update_todo',
    method: 'POST',
    data: {
      id:id,
    }
  })

}


const del =async(id) => {
  // todos.value.splice(index,1)
  await axios({
    url: 'https://gyiuq58mqp.hzh.sealos.run/del_todo',
    method: 'POST',
    data: {
      id:id,
    }
  })
  getTodos()
}




</script>


<template>
  <div class="todo-app">
    <div class="title">To do list</div>

    <div class="todo-form">
        <input v-model="newTodo"class="todo-input" type="text" placeholder="add to do">
        <div class="add-todo">
          <button @click="addtodo" class="todo-button">todo</button> </div>
    </div>

    <div v-for=" (todo,index) in todos" :class="[todo.isCompleted? 'completed':'item']">
        <div>
            <input @click="update(todo._id)" type="checkbox" v-model="todo.isCompleted">
            <span class="name">{{ (index+1)+'、'+todo.value }}</span>
        </div>
        <div @click="del(todo._id)" class="del">
          <button>del</button></div>
    </div>
    </div>
</template>

<style>
body {
  background: linear-gradient(
    to right,
    rgb(113, 65, 168),
    rgba(44, 114, 251, 1)
  );
}
.todo-app {
  box-sizing: border-box;
  margin-top: 40px;
  margin-left: 1%;
  padding-top: 30px;
  width: 98%;
  height: 500px;
  background: #ffffff;
  border-radius: 5px;
}

.title {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}

.todo-form {
  display: flex;
  margin: 20px 0 30px 20px;
}

.todo-button {
  width: 100px;
  height: 52px;
  border-radius: 0 20px 20px 0;

  text-align: center;
  background: linear-gradient(
    to right,
    rgb(113, 65, 168),
    rgba(44, 114, 251, 1)
  );
  color: #fff;
  line-height: 52px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.todo-input {
  padding: 0px 15px 0px 15px;
  border-radius: 20px 0 0 20px;
  border: 1px solid #dfe1e5;
  outline: none;
  width: 60%;
  height: 50px;
}

.item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 50px;
  margin: 8px auto;
  padding: 16px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
}

.del {
  color: red;
}

.completed {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 50px;
  margin: 8px auto;
  padding: 16px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
  text-decoration: line-through;
  opacity: 0.4;
}
</style>
