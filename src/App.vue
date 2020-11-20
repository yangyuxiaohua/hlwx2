<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default{
  mounted(){
    //屏蔽选中
   document.onselectstart= function(){ return false; }
}
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
