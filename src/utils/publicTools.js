import { MessageBox,Message } from 'element-ui'
// 根据children递归tree数据改变
export const recursiveTreeData = function (arr){
   
}
// 操作确认提示框（不带取消按钮）
export const handleSuccess = function(str,tit,btnText,type){
    MessageBox.alert(str, tit, {
        confirmButtonText: btnText,
        type
      });
    }
// 确认操作（带取消按钮）
export const handleSure = function(str,tit,type,fn=function(){}){
    MessageBox.confirm(str, tit, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type
      }).then(() => {
        fn()
      }).catch(() => {
        Message.info('已取消操作');          
      });
}


