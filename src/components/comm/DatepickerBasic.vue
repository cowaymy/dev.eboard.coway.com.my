<template>
    <v-container>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label=title
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker elevation="24" no-title v-model="date" @input="onDateSelected"></v-date-picker>
      </v-menu>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
        title: {
            type: String,
            default: 'Select Date'
        }
    },

    data() {

      return {
        menu: false,
        date: null
      };
    },
    methods: {
        onDateSelected() {
            this.menu = false;
            this.$emit('date-selected', this.date);
        }
    }
  };
  </script>
  
  <style>
  /* 필요한 경우 추가 스타일을 여기에 작성하세요. */
  </style>
  