<template>
<div class="login_main">
    <div class='title'>
        <h1>极建</h1>
    </div>
    <div class='login'>
        <p>认证信息</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
             <!-- <div class='upload_wrap'>
                <Upload des='身份证(正面)' @changeUrl='changeUrl' name='idFront' :currentImage='formInline.idFront'></Upload>
            </div>
            <div class='upload_wrap'>
                <Upload des='身份证(反面)' @changeUrl='changeUrl' name='idSide' :currentImage='formInline.idSide'></Upload>
            </div> -->
            <FormItem prop="idNumber">
                <Input type="text" v-model="formInline.idNumber" placeholder="身份证号">
                    <Icon type="ios-phone-portrait" slot="prepend"/>
                </Input>
            </FormItem>
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
import { checkIdNumber } from '@/api/user.js'
    export default {
        components:{Upload},
        data () {
            const validateIdNumber = (rule, value, callback) => {
                if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
                    callback(new Error('请输入正确的身份证号'));
                    this.checkOk = false
                }
                else{
                    callback();
                    this.checkOk = true
                }
                
            };
            return {
                formInline: {},
                ruleInline: {
                    idNumber:[
                        { validator: validateIdNumber, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapMutations(['SET_USER_STATUS']),
            @track.loading
           async handleSubmit(name) {
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        //idNumberCK
                        await checkIdNumber(this.formInline).then( res => {
                            if(res.status == 200){
                                //login
                                // await this.login({mobile:this.formInline.mobile,verifyCode:this.formInline.verificationCode})
                                this.SET_USER_STATUS(1)
                                this.$Message.success('认证成功!');

                                this.$router.push({path:'/manager'})
                            }else{
                                this.$Message.error('认证失败!');
                            }
                        } )
                        
                    } else {
                        this.$Message.error('失败!');
                    }
                })
                
            }
        //     ,
        //     changeUrl(op){
        //     this.formInline[op.name] = op.url
        // }
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