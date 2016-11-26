/**
 * Created by wangyun on 16/11/26.
 */
    //console.log(test);
    //发送ajax获取数据
var vm = new Vue({
        el:"#app",
        data:{
            list:[],
            message:'',
            editingById:'',
            commentingById:'',
            isCancel:false
        },
        created(){
            $.ajax({
                url:"/api/getMessage",
                success:(data) => {
                    this.list = data;
                },
                error:function(error){
                    console.log(error);
                }
            })
        },
        methods:{
            //提交评论
            sendComment(id,index){
                $.ajax({
                    url:"/api/comment",
                    method:"post",
                    data:{
                        id:id,
                        content:this.$refs.commentMessage[index].value
                    },
                    success:(data) => {
                        if(data.status === 0){
                            this.list[index].commentNum++;
                            this.list[index].comments.unshift(data.comment);
                        }else{
                            console.log(data);
                        }
                    },
                    error:function(err){
                        console.log(arr);
                    }
                })
            },
            //展开收缩获取评论
            commenting(id,index,showComment){
                //请求评论
                Vue.set(this.list[index],'showComment',!showComment)
                if(this.list[index].comments){
                    return;
                }
                $.ajax({
                    url:"/api/getComment",
                    method:"post",
                    data:{
                        id:id
                    },
                    success:(data) => {
                        if(data.status === 0){
                            this.$set(this.list[index],"comments",data.comments);

                        }else{
                            console.log(data);
                        }
                    },
                    error:function(err){
                        console.log(arr);
                    }
                })



            },
            //编辑留点
            editing(id){
                this.editingById = id;
            },
            //删除点子
            deleteMessage:function(id,index){
                $.ajax({
                    url:"/api/deleteMessageById",
                    method:"get",
                    data:{
                        id:id
                    },
                    success:(data) => {
                        if(data.status === 0){
                            this.list.splice(index,1);
                        }else{
                            console.log(data);
                        }
                    },
                    error:function(err){
                        console.log(arr);
                    }
                })
            },
            //发送点子
            sendMessage:function(){
                $.ajax({
                    url:"/api/message",
                    method:"post",
                    data:{
                        content:this.message
                    },
                    success:(data) => {
                        console.log(data)
                        if(data.status === 0){
                            this.list.unshift(data.content);
                        }else{
                            console.log(data);
                        }
                    },
                    error:function(err){
                        console.log(arr);
                    }
                })
            }
        }
    });