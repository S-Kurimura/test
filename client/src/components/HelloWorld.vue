<template>
  <div>

    <div class="base">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="URI for AWS serverApp:"
          label-for="input-1"
          description=""
        >
          <b-form-input
            id="input-1"
            v-model="form.awsApp"
            type="url"
            required
            placeholder="Enter URI"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group id="input-group-2" label="URI for IBM Cloud serverApp:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.ibmCloudApp"
            type="url"
            required
            placeholder="Enter URI"
          ></b-form-input>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="AWS Result">
        <div>
          リクエスト送信(クライアント): {{ awsResult.requestTimeFromClient }} <br>
          リクエスト受信(サーバ): {{ awsResult.serverData.requestTime }} <br>
          <font color=red>リクエスト時間: {{ awsResult.reqCalc }} <br></font>
          レスポンス送信(サーバ):  {{ awsResult.serverData.responseTime }} <br>
          レスポンス受信(クライアント): {{ awsResult.responseTimeFromClient }} <br>
          <font color=red>レスポンス時間: {{ awsResult.resCalc }} <br></font>
        </div>
      </b-card>
      <b-card class="mt-3" header="IBM Cloud Result">
        <div>
          リクエスト送信(クライアント): {{ ibmCloudResult.requestTimeFromClient }} <br>
          リクエスト受信(サーバ): {{ ibmCloudResult.serverData.requestTime }} <br>
          <font color=red>リクエスト時間: {{ ibmCloudResult.reqCalc }} <br></font>
          レスポンス送信(サーバ):  {{ ibmCloudResult.serverData.responseTime }} <br>
          レスポンス受信(クライアント): {{ ibmCloudResult.responseTimeFromClient }} <br>
          <font color=red>レスポンス時間: {{ ibmCloudResult.resCalc }} <br></font>
        </div>
      </b-card>
    </div>

  </div>
</template>

<script>
  var moment = require('moment');
  export default {
    data() {
      return {
        form: {
          awsApp: '',
          ibmCloudApp: ''
        },
        show: true,
        awsResult: {
          serverData:'',
          requestTimeFromClient:'',
          responseTimeFromClient:'',
          reqCalc:'',
          resCalc:''
        },
        ibmCloudResult: {
          serverData:'',
          requestTimeFromClient:'',
          responseTimeFromClient:'',
          reqCalc:'',
          resCalc:''
        },
      }
    },
    methods: {
      resetResult() {
        this.awsResult.serverData = ''
        this.awsResult.requestTimeFromClient = ''
        this.awsResult.responseTimeFromClient = ''
        this.awsResult.reqCalc = ''
        this.awsResult.resCalc = ''
        this.ibmCloudResult.serverData = ''
        this.ibmCloudResult.requestTimeFromClient = ''
        this.ibmCloudResult.responseTimeFromClient = ''
        this.ibmCloudResult.reqCalc = ''
        this.ibmCloudResult.resCalc = ''
      },
      onSubmit(evt) {
        this.resetResult()
        // evt.preventDefault()
        // alert(JSON.stringify(this.form))
        // AWSのAPへ
        this.awsResult.requestTimeFromClient = moment().format('x');
        this.axios.get(this.form.awsApp)
          .then((response) => {
            this.awsResult.responseTimeFromClient = moment().format('x');
            // alert(JSON.stringify(response));
            this.awsResult.serverData = response.data
            this.awsResult.reqCalc = this.awsResult.serverData.requestTime - this.awsResult.requestTimeFromClient
            this.awsResult.resCalc = this.awsResult.responseTimeFromClient - this.awsResult.serverData.responseTime
          })
          .catch((e) => {
            alert(e);
          });
          
        // IBM CloudのAPへ
        this.ibmCloudResult.requestTimeFromClient = moment().format('x');
        this.axios.get(this.form.ibmCloudApp)
          .then((response) => {
            this.ibmCloudResult.responseTimeFromClient = moment().format('x');
            // alert(JSON.stringify(response));
            this.ibmCloudResult.serverData = response.data
            this.ibmCloudResult.reqCalc = this.ibmCloudResult.serverData.requestTime - this.ibmCloudResult.requestTimeFromClient
            this.ibmCloudResult.resCalc = this.ibmCloudResult.responseTimeFromClient - this.ibmCloudResult.serverData.responseTime
          })
          .catch((e) => {
            alert(e);
          });
        
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.ibmCloudApp = ''
        this.form.awsApp = ''
        this.resetResult()
        Object.assign(app.$data, app.$options.data());
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.base {
    width: 60%;
    margin: auto;
  }
</style>
