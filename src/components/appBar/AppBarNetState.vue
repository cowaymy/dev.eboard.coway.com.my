<template>
        <v-icon v-if = "isConnectServer ==false" color="error">{{ mdiLanDisconnect }}</v-icon>
        
</template>

<script>

import { mdiLanDisconnect } from "@mdi/js";

export default {
    
    data () {
        return {
            mdiLanDisconnect
        }
    },
    computed: {
        isConnectServer(){
            return this.$store.state.isConnectServer
        }
    }
}
</script>

<style lang="scss" scoped>

</style>