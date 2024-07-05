<template>



<swiper class="swiper" :options="isMobile ?mobileOption :swiperOption " >
                 <swiper-slide v-for="(card, cardIndex) in prodctOfLists" :key="cardIndex"  >

                 <v-card  variant="outlined"  class="custom-card">
                         <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="info"
                                class="me-1"
                                :disabled="card.ITEMCODE == selectedButtonCode" @click="selectButton(cardIndex, card)"
                            >ADD</v-btn>
                         </v-card-title>
                        <v-card-text>
                            <v-row no-gutters>  
                                <v-col cols="5" sm="5">
                                    <div>
                                        <v-img  height="230px"  class="fixed-image"
                                        :src=makeImgURL(card.STK_IMG)
                                        ></v-img>
                                    </div>
                                </v-col>
                                <v-col cols="7" sm="7">
                                    <div class="text--primary text-base font-weight-bold v-list">

                                        <v-list lines="three" color='#F5F5F5' >
                                           
                                            <v-list-item > <span class="text--secondary">{{card.TITLE}}</span></v-list-item>
                                           
                                            <v-list-item >
                                                    <div class="d-flex flex-column" >
                                                        <h5 class="text--secondary ">{{card.MODEL}}</h5>
                                                        <h6 class="text--secondary ">RM {{card.RENPRICE}} Rental </h6>
                                                        <h6 class="text--secondary ">{{card.CATEGORY}}</h6>
                                                    </div>
                                            </v-list-item>
                                            
                                        </v-list>
                                    </div>
                                </v-col>
                            </v-row>
                    </v-card-text>
                    </v-card>
          
            </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
        
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from "@/store";
import bus from "@/utils/bus";

import quotationStoreModule from "./quotationStoreModule";
const  appQuotationStoreModule  = "appQuotationStoreModule";


import {
} from '@mdi/js'

export default {
    components: {
        swiper,
        swiperSlide
    },

    computed: {
        prodctOfLists(){
          return this.$store.state.appQuotationStoreModule.prodctOfLists
        },

        selectedItemInfo(){
            return this.$store.state.appQuotationStoreModule.selectedProdct
        },
        selectedButtonCode(){

            if(store.state.appQuotationStoreModule.selectedProdct != null){
                return store.state.appQuotationStoreModule.selectedProdct.ITEMCODE
            }
            return null;
        }
    },


    created () {
        this.checkIsMobile()
    },
    mounted () {
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        checkIsMobile: function () {
            this.isMobile = (window.innerWidth < this.pcStandard)
        },
        handleResize: function () {
            this.$nextTick(function () {
                this.checkIsMobile()
            })
        },

        selectButton:function(index ,item){
            store.dispatch(`${appQuotationStoreModule}/selectedItemInfo` , item );
            bus.$emit('callbackAddProduct');
        },

        makeImgURL(url){
            if(url) return `https://emall.coway.com.my/${url}`
            else return '' 
        }
    },
    data () {
        return {
            isMobile: false,
            pcStandard: 769, // PC 화면의 Viewport 기준점
            mobileOption: {  // 모바일 옵션 지정
                depth:100,
                slidesPerView: 1,
                effect :'coverflow',
                modifier:0,
                rotate:50,
                scale:0,
                slideShadows: true,
                stretch :0,
               
            },
           
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 6, // swiper-slide 사이의 간격 지정
                slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
                freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
                centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            
            

            // icons
            icons: {
            },
        }
    }
}
</script>

<style lang="scss" scoped>

.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
      min-width: auto; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
      padding: 0px 0px 0px 0px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #e1f2f6;
      border: 0;
      border-radius: 18px;
      background: #42b6f0;
      appearance: none;
      cursor: pointer;
    }
  }
}
.fixed-image {

  bottom: 20px; /* 화면 하단에서의 간격 조절 */
  right: 20px; /* 화면 오른쪽에서의 간격 조절 */
  max-width: 200px; /* 최대 너비 설정 */
  max-height: 200px; /* 최대 높이 설정 */
  /* 다른 스타일 속성들 */
}

.card-style {
  /* Add your custom card styles here */
  //background-color: #ec1e1e;
  width:250px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1px;
  margin: 30px; /* 10px의 여백 설정 */
}
.text-center {
  text-align: center;
}

.text-prod{
    text-align: left;
    font-size: 13px; /* 원하는 크기로 변경 */
    font-weight: bold;
}

text-prod2{
    text-align: left;
    font-size: 10px; /* 원하는 크기로 변경 */
}

.custom-card {
  max-width: auto; /* 원하는 최대 넓이로 변경 */
  max-height:auto;
  width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
  min-width: 56px; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
  padding: 0px 0px 0px 0px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  
  margin: 7px; /* 10px의 여백 설정 */
  border: 0;
  color: #84868c;
  background: #f3f4f7;
  appearance: none;
  cursor: pointer;
}

.custom-card .v-list {
  max-width: 92%; /* 부모 요소에 맞춰 최대 넓이 설정 */
}
</style>