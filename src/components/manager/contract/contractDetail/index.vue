<template>
<div class='main'>
    <div style="text-align:center">
        <Row>
            <Col span="12">
            <Button type="primary" @click='preContract'>
                <Icon type="ios-arrow-back" />
                上一份合同
            </Button>
           </Col>
            <Col span="12">
            <Button type="primary" @click='nexContract'>
                下一份合同
                <Icon type="ios-arrow-forward" />
            </Button>
            </Col>
        </Row>
    </div>
    <div class='pdf_view'>
        <Row>
            <Col span="24" style='text-align:center;margin-top:50px;'>
                <div style='position:relative;display:inline-block;width:55.5%;border:1px solid #ccc'>
                    <!-- <img :src='currentContract' width='100%'/> -->
                        <pdf :src="currentContract" :style="{width:'100%'}"></pdf>
                        <Row style='position:absolute;top:-32px;right:0'>
                            <Col span="12">
                                <Button type="primary">
                                    下载
                                </Button>
                            </Col>
                            <Col span="12" v-if='!isSigned'>
                                <Button type="primary" @click='check'>
                                    签订
                                </Button>
                            </Col>
                    </Row>
                </div>
           </Col>
        </Row>
    </div>
    <Modal
        v-model="modal1"
        title="验证您的信息"
        @on-ok='sign'
        >
        <Form ref="formInline" :model="formInline">
            <Row>
                <Col span="12">
                    <FormItem prop="verificationCode" >
                        <Input type="text" v-model="formInline.verificationCode" placeholder="验证码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12"><Button :style='{float:"right"}' type="primary" :disabled='sendingAuth' @click=" !sendingAuth && sendSignMobileCode()">{{sendingAuth ? mis :'获取验证码'}}</Button></Col>
            </Row>
        </Form>
    </Modal>
</div>
</template>
<script>
import track from '@/utils/track.js'
import pdf from 'vue-pdf'
import { getContractDetail,getNextContract,getPreviousContract } from '@/api/contract.js'
import { sendSignMobileCode } from '@/api/user.js'
import { sign } from '@/api/contract.js'
export default {
    components:{pdf},
    data() {
        return {
            pre:{},
            nex:{},
            currentContract:'',
            currentContractTime:'',
            currentContractType:'',
            modal1:false,
            formInline:{},
            sendingAuth:false,
            mis:5,
            currentId:'',
            isSigned:false,
        }
    },
    created() {
        this.init()
    },
    methods: {
        check(){
            this.modal1 = true
        },
        @track.loading
        sign(){
            let signListCode = []

                signListCode.push(this.currentId)

            sign({verificationCode:this.formInline.verificationCode,ids:signListCode}).then( res => {
                console.log(res)
                this.init()
            } )
        },
        sendSignMobileCode(data){
                sendSignMobileCode().then(res => {
                    if(res.status == '200'){
                        this.sendingAuth = true
                        let timer = setInterval(()=>{
                            this.mis --
                            if(this.mis == 0){
                                clearInterval(timer)
                                this.mis = 5
                                this.sendingAuth = false
                            }
                        },1000)
                        
                    }else{
                        this.sendingAuth = false
                        this.$Message.error('错误!');
                    }
                })
        },
        async init(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){

                }else{
                    delete query[key]
                }
            }

            let data = (await getContractDetail(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
                this.currentContractType = data.contractType
                this.currentId = data.id
                this.isSigned = data.isSigned
        },
        @track.loading
        async preContract(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){
                    if(key == 'id')delete query[key]   
                }else{
                    delete query[key]
                }
            }
            query['createDate'] = this.currentContractTime

            let data = (await getPreviousContract(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
                this.currentContractType = data.contractType
                this.currentId = data.id
                this.isSigned = data.isSigned
        },
        @track.loading
        async nexContract(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){
                    if(key == 'id')delete query[key]   
                }else{
                    delete query[key]
                }
            }
            query['createDate'] = this.currentContractTime

            let data = (await getNextContract(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
                this.currentContractType = data.contractType
                this.currentId = data.id
                this.isSigned = data.isSigned
        }
    },
} 
</script>
<style lang="scss">
    
</style>