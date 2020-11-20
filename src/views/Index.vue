<template>
    <div id="index">
        <div class="indexHeader">
           <div class="left">
               <img :src="logoSrc">
               <span>{{name}}</span>
           </div>
           <div class="middle">
              <span>{{unitName}}</span>
              <span>智慧消防 [ <img :src="systemPositionSrc"> {{systemPosition}} ] </span>
           </div>
           <div class="right">
              <img src="@/assets/images/u647.png" alt="">
              <img src="@/assets/images/u647.png" alt="">
              <img src="@/assets/images/u647.png" alt="">
              <img src="@/assets/images/u647.png" alt="">
              <img src="@/assets/images/u647.png" alt="">
           </div>
        </div>
        <div class="indexContainer">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:'智慧消防管理平台',
            logoSrc:require('@/assets/images/u643.png'),
            unitName:'西南融创',
            systemPosition:'配置中心',
            systemPositionSrc:require('@/assets/images/u642.png'),

        }
    }
};
</script>

<style lang="less" scoped>
#index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .indexHeader{
        flex: 0 0 70px;
        color: #fff;
        // height: 70px;
        background-color: #072D48;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        .left{
           display: flex;
           align-items: center;
           img{
               width: 58px;
               height: 61px;
           }
           span{
               margin-left: 20px;
               font-size: 30px;
               font-weight: 200;
           }
        }
        .middle{
            font-size: 24px;
            line-height: 70px;
            img{
                width: 32px;
                height: 38px;
            }
        }
        .right{
            img{
                width: 35px;
            height: 32px;
            }
            img:not(first-child){
                margin-left: 26px;
            }
            
        }
    }
    .indexContainer{
        flex:1
    }
}
</style>