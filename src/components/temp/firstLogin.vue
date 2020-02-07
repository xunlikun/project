<template>
<div class="login_main">
    <div class='title'>
        <h1>系统标题</h1>
    </div>
    <div class='login'>
        <p>认证信息</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <div class='upload_wrap'>
                <Upload des='身份证(正面)' @changeUrl='changeUrl' name='idFront' :currentImage='formInline.idFront'></Upload>
            </div>
            <div class='upload_wrap'>
                <Upload des='身份证(反面)' @changeUrl='changeUrl' name='idSide' :currentImage='formInline.idSide'></Upload>
            </div>
            <FormItem style="text-align:right">
                <!-- <router-link to="/waitingPeriod"> -->
                    <Button type="primary" @click="handleSubmit('formInline')">
                        提交
                    </Button>
                <!-- </router-link> -->
            </FormItem>
        </Form>
    </div>
</div>
</template>
<script>
import Upload from '@/components/components/upload'
import track from '@/utils/track.js'
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { localStorages } from '@/utils/cache.js'
    export default {
        components:{Upload},
        data () {
            const validateCompanyInfo = (rule, value, callback) => {
                if (value === '' || value === ' ') {
                    callback(new Error('请上传身份证照片'));
                    this.checkOk = false
                }
                else{
                    callback();
                    this.checkOk = true
                }
                
            };
            return {
                formInline: localStorages.get('verificationInformation') ? JSON.parse(localStorages.get('verificationInformation')) : {
                    idFront:'',
                    idSide:'',
                   commonPic:''
                },
                ruleInline: {
                    idFront:[
                        { validator: validateCompanyInfo, trigger: 'blur' }
                    ],
                    idSide:[
                        { validator: validateCompanyInfo, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            @track.loading
           async handleSubmit(name) {
                
                
            },
            changeUrl(op){
            this.formInline[op.name] = op.url
        }
        }
    }
</script>
<style lang="scss" scoped>
    .login{
        border-radius: 4px;
        background-color:#fff;
        padding: 10px 20px 30px 20px;
        width:400px;
        margin: 60px auto 0 auto;
        &:hover{
            box-shadow:0 0 10px 1px #eee;
        }
        >p{
            font-size:22px;
            line-height:100px;
            font-weight:700;
            color:#2d8cf0;
            opacity:.6;
        }
        >div.caculate{
            >ul{
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                >li{
                    
                }
            }
        }
        .upload_wrap{
            margin:20px 0;
        }
    }
</style>