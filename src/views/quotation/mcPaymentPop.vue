<template>
    <v-container>

      <v-dialog   max-width="800px">
        <v-card>
          <v-card-title class="headline">
            External Content
            <v-spacer></v-spacer>
            <v-btn icon @click="isMcOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <iframe
              :src="externalUrl"
              width="100%"
              height="600px"
              frameborder="0"
            ></iframe>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="isMcOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
export default {

    props: {
        isMcOpen: {
             type: Boolean,
             required: true
        }
    },

    watch: {
        isMcOpen(newValue) {
             this.isMcOpen = newValue;
        }
    },

    data () {
        return {
            externalUrl: 'https://services.mcpayment.net:8080/newCardForm?apiKey=3fdgsTZ_COWAY_dsaAZ6E&refNo=000M883439250000000000000000000000000005341481'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>