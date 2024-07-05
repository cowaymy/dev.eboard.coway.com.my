<template>
    <span class="font-weight-semibold text-lg"> Customer information  <br> <code>font-weight-semibold text-sm</code>  <br>
        <v-divider color="#16B1FF"></v-divider>
        <div class="d-flex flex-column"  >
            <span class="text--primary text-sm font-weight-semibold">ABCD abcd  <code>text-sm</code> </span>    
            <span class="text--primary text-md font-weight-semibold">ABCD abcd  <code>text-md</code></span>  
            <span class="text--primary text-lg font-weight-semibold">ABCD abcd  <code>text-lg</code></span>  
            <span class="text--primary text-xl font-weight-semibold">ABCD abcd  <code>text-xl</code></span>  

            <span class="text--primary text-sm ">ABCD abcd  <code>text-sm</code> </span>    
            <span class="text--primary text-xm font-weight-semibold">ABCD abcd  <code>text-md</code></span>  
            <span class="text--primary text-xg font-weight-semibold">ABCD abcd  <code>text-lg</code></span>  
            <span class="text--primary text-xl font-weight-semibold">ABCD abcd  <code>text-xl</code></span>  

        </div>
        <v-divider color="#16B1FF"></v-divider>
        <div>
                <p class="text-left">
                    <code>text-left</code> aligned on all viewport sizes. 
                </p>
                <p class="text-center">
                    <code>text-center</code> aligned on all viewport sizes.
                </p>
                <p class="text-right">
                    <code>text-right</code> aligned on all viewport sizes.
                </p>

                <p class="text-sm-left">
                Left aligned on viewports SM (small) or wider.
                </p>
                <p class="text-right text-md-left">
                Left aligned on viewports MD (medium) or wider.
                </p>
                <p class="text-right text-lg-left">
                Left aligned on viewports LG (large) or wider.
                </p>
                <p class="text-right text-xl-left">
                Left aligned on viewports XL (extra-large) or wider.
                </p>
        </div>
    

    </span>
</template>

<script>
export default {
    data () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>