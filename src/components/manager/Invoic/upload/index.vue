<template>
    <div>
        <template v-if='uploadTrue'>
            <p>合计金额: {{totalAmount}}</p>
            <Button type="primary" @click="handleSubmit">提交</Button>
        </template>
        <div style="text-align:right;line-height:66px;padding: 0 200px 0 0">
            <Button type="primary" @click='downLoad("/api/project/invoice/download")'>下载模板</Button>
        </div>
        <div style="padding:26px 200px">
            <Upload
                :headers={authorization:token}
                name='invoice'
                type="drag"
                action="api/project/invoice/upload"
                show-upload-list
                accept='xlsx,xls'
                :format="['xlsx','xls']"
                :on-success='success'
                :on-error='error'
                :on-format-error='formatError'
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>请确保您的开票数据准确(若您上传的上一份文件未提交,新文件将会替换它)</p>
                </div>
            </Upload>
        </div>
         
        <template v-if='uploadTrue'>
            <div>
                <Table :data="invoicData" :columns="tableColumns" :style='{minHeight:"500px"}' stripe></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="current" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import track from '@/utils/track.js'
import { getInvoicAmount,submitInvoic } from '@/api/invoic.js'
import { localStorages } from '@/utils/cache.js'
import { downLoad } from '@/utils/sma.js'
export default {
    data() {
        return {
            downLoad:downLoad,
            uploadTrue:false,
            totalAmount:0.00,
            uploadIdLis:[],
            uploadCurrentId:localStorages.get('uploadCurrentId') ? JSON.parse(localStorages.get('uploadCurrentId')) : '',
            op:{},
            invoicData:[],
                total:100,
                current:1,
                tableColumns: [
                    {
                        title: '合同编号',
                        key: 'contractCode'
                    },
                    {
                        title: '合同标题',
                        key: 'contractTitle'
                    },
                    {
                        title: '时间',
                        key: 'invoiceTime'
                    },
                    {
                        title: '开票金额',
                        key: 'amount'
                    },
                    {
                        title: '开票进度',
                        key: 'invoiceStatus',
                        render: (h, params) => {
                            return h('span', {},!params.row.invoiceStatus ? '未提交' : params.row.invoiceStatus == 1 ? '开票中' : params.row.invoiceStatus == 2 ? '已开票' : '');
                        }
                    }
                ],
        }
    },
    created() {
        this.init()
    },
    computed: {
        ...mapGetters(['token'])
    },
    methods: {
        ...mapActions(['getInvoicList']),
        handleSubmit(){
            submitInvoic().then( res => {
                if(res.status == 200){
                    this.$Message.success('成功!');
                    this.uploadCurrentId = ''
                    localStorages.remove('uploadCurrentId')
                    this.$router.back()
                }else{
                    this.$Message.error('失败!');
                }
            } )
        },
        success(response, file, fileList){
            localStorages.set('uploadCurrentId',response.data.uploadId,1000*60*30)
            this.uploadCurrentId = response.data.uploadId
            this.uploadIdLis.push(response.data.uploadId)
            this.uploadTrue = true
            this.init()
        },
        error(error, file, fileList){
            
        },
        formatError(file, fileList){

        },
        @track.loading
        async init(){
            if(!this.uploadCurrentId) return
            this.uploadTrue = true
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in query) {
                if(query[key]){
                    if(key == 'currentDate' && query[key].length > 0){
                        query['year'] =  query[key][0]
                        query['month'] =  query[key][1]
                    }
                }else{
                    delete query[key]
                }
            }
            delete query['currentDate']
            query['uploadId'] = this.uploadCurrentId
          let data = (await this.getInvoicList(query)).data
          this.invoicData = data.records
          this.total = data.total
          this.current = data.page
          this.getInvoicAmount(query)
        },
        getInvoicAmount(query){
            getInvoicAmount(query).then(res => {
                this.totalAmount = res.data
            })
        },
        changePage (page) {
            this.op.current = page
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.init();
        },
    }
}
</script>
<style lang="scss" scoped>
    
</style>