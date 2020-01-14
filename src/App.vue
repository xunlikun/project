<template>
  <div id="app">
    <template v-if="$route.meta.keepAlive">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </template>
    <template v-else>
        <router-view/>
    </template>
    <Spin fix v-if="spinShow">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['spinShow'])
  },
}
</script>

<style>
body{
    background-color: #f8f8f9;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li{
  list-style: none;
}
*{
  font-size: 12px;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
