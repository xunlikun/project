<template>
<div>
    <Row style="height:120px;overflow:hidden">
                <Col span="17" style="height:100%;position:relative">
                    <img :src="url" alt="" v-if="url" width="100%" height="120px" style="display:block"><span style="opacity:0">1</span>
                    <div class="bg" v-if="show">
                        {{des}}
                    </div>
                </Col>
                <Col span="7">
                    <Upload 
                    :show-upload-list='false'
                    name='imageFile' 
                    action="/api/project/user/sendToOss"
                    :style='{float:"right"}'
                    :on-success='handleSuccess'>
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </Col>
            </Row>
   
    
</div>
    
</template>
<script>
    export default {
        props:['des','changeUrl','name','currentImage'],
        data() {
            return {
                url:'',
                show:true       
            }
        },
        created(){
            if(this.currentImage){
                this.url = this.currentImage
                this.show = false
            }
        },
        methods: {
            handleSuccess (res, file) {
                console.log(res, file)
                this.url = res.data
                this.show = false
                let that = this
                this.$emit('changeUrl',{name:that.name,url:this.url})
            },
        },
    }
</script>
<style lang="scss" scoped>
    .bg{
        width: 100%;
        height: 100%;
        background:#fff;
        border:1px solid #dcdee2;
        border-radius: 6px;
        position:absolute;
        top: 0;
        left: 0;
        line-height: 120px;

    }
</style>