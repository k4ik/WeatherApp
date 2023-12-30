<script>
  import Card from "./components/Card/Card.vue"
  import Title from "./components/Title/Title.vue"
  import Message from "./components/Message/Message.vue"

  export default {
    name: 'App',
    components: {
      Title,
      Card,
      Message
    }
  }
</script>

<template>
  <main class="main">
    <Title />
    <Card />
  </main>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

  body {
    background: url("../public/images/bg.jpg");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>