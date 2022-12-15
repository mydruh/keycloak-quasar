<template>
  <div id="q-app" style="min-height: 100vh;">
  <div class="q-pa-md">
    <q-layout view="lhh LpR lff" container style="height: 80vh" class="shadow-2 rounded-borders" id="documentSpace">
      <!--<q-header reveal class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu"></q-btn>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu"></q-btn>
        </q-toolbar>
      </q-header>-->

      <q-drawer
        v-model="drawerLeft"
        :width="200"
        :breakpoint="700"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <div id="documentSpace">
      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="$q.screen.width * 0.3"
        :breakpoint="500"
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="close"></q-btn>
            <!--<iframe v-bind:src="`http://localhost:8080/#/requestPage?pageParams={'id':` + dialog_data.id + '}'" height="500px" width="100%"/>-->
            <iframe v-if="this.$keycloak.authenticated == true" id="docFrame" src="http://localhost:8080/test" height="500px" width="100%"/>
          </div>
        </q-scroll-area>
      </q-drawer>
    </div>

      <q-page-container>
        <q-table
title="Список документов"
:rows="rows"
:columns="columns"
row-key="name"
binary-state-sort
>
<template v-slot:body="props">
<q-tr :props="props" @click="setPropsFrame(props.row)"> <!--v-on:click="returning(props.row)"-->
<q-td key="name" :props="props" >
{{ props.row.id }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.applicantId }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.number }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.createDate }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestType.nameRu }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestType.requestGroup.nameRu }}
</q-td>
<q-td key="name" :props="props" >
{{ props.row.requestState.nameRu }}
</q-td>
</q-tr>
</template>
</q-table>
        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="red"></q-btn>
        </q-page-scroller>
      </q-page-container>
    </q-layout>
  </div>
</div>
</template>
<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import axios from 'axios'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'id',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true

  },
  { name: 'applicantId', align: 'center', label: 'applicantId', field: 'applicantId', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'number', align: 'center', label: 'number', field: 'number', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'createDate', label: 'createDate', field: 'createDate' },
  { name: 'requestType', label: 'requestType', field: 'requestType' },
  { name: 'requestGroup', label: 'requestGroup', field: 'requestGroup' },
  { name: 'requestState', label: 'requestState', field: 'requestState.nameRu' }
]

export default defineComponent({
  
  name: 'TestPage',
  data() {
    return {
      username: this.$keycloak.idToken,
      rows: [],
      columns
    }
  },
  setup () {
    return {
      drawerLeft: ref(false),
      drawerRight: ref(true)
    }
  },
  mounted () {
    window.authRedirection()
    
    axios
      .get('http://10.8.27.97:2929/employee-interaction/v1/request/?applicantEmployeeId=2202',
        { headers: { Authorization: 'Bearer ' + this.$keycloak.token } })
      .then((response) => {
        this.rows = response.data
        //alert('DATA')
        console.log(response.data)
      })
  },
  methods: {
    logout() {
      window.location.href = this.$keycloak.createLogoutUrl()
    },
    setPropsFrame(props) {
      this.drawerRight = true
      //console.log(props.number)

      var iframeWin = document.getElementById("docFrame").contentWindow
      
      iframeWin.postMessage(props.interaction.title, "http://localhost:8080")
      //form = document.getElementById("the-form"),
      //myMessage = document.getElementById("my-message");
      
      //myMessage.select();
      
      //form.onsubmit = function () {
      //iframeWin.postMessage(myMessage.value, "https://robertnyman.com");
      //return false
      //};
    }
  }
})
</script>
