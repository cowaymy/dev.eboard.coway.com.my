<template>


<swiper class="swiper" :options="isMobile ?mobileOption :swiperOption " >
                 <swiper-slide v-for="(card, cardIndex) in prodctOfLists" :key="cardIndex"  >

                 <v-card  variant="outlined"  class="custom-card">
                         <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="info"
                                class="me-1"
                                :disabled="cardIndex === selectedButtonIndex" @click="selectButton(cardIndex)"
                            >ADD</v-btn>
                         </v-card-title>
                        <v-card-text>
                            <v-row no-gutters>  
                                <v-col cols="5" sm="5">
                                    <div>
                                        <v-img  height="200px"  class="fixed-image"
                                        :src="card.imgurl" 
                                        ></v-img>
                                    </div>
                                </v-col>
                                <v-col cols="7" sm="7">
                                    <div class="text--primary text-base font-weight-bold v-list">

                                        <v-list lines="three" color='#F5F5F5' >
                                           
                                            <v-list-item > <span class="text--secondary">{{card.title}}</span></v-list-item>
                                           
                                            <v-list-item >
                                                <v-list-item-content>
                                                    <v-list-item-title>   <span class="text-prod">{{card.model}}</span>  </v-list-item-title>
                                                    <v-list-item-subtitle>
                                                       <span class="text-prod">{{card.color}}</span> 
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle>
                                                        <span class="text-prod2">{{card.size}}</span> 
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle>
                                                        <span class="text-prod2">{{card.kg}}</span> 
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
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

import {
} from '@mdi/js'

export default {
    components: {
        swiper,
        swiperSlide
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

        selectButton:function(index){
            this.selectedButtonIndex = index;
        }


    },
    data () {
        return {
            selectedButtonIndex: null,
            isMobile: false,
            pcStandard: 769, // PC 화면의 Viewport 기준점
            mobileOption: {  // 모바일 옵션 지정
                slidesPerView: 2,
                effect: 'cards',
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
            },
           
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 6, // swiper-slide 사이의 간격 지정
                slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
                effect: 'cards',
                freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
                centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            
            prodctOfLists: [
                { title: 'AIS WHITE', imgurl: 'https://emall.coway.com.my/ProductImages/cd349c96-7052-4f9a-a75d-7eb696eedaa3/1/std/ais-white.png', model: 'CHPI-7520L' , color:'Porcelain White' ,size:'270 x 546 x 515',kg:'23.9 kg'},
                { title: 'AIS Gray ', imgurl: 'https://emall.coway.com.my/ProductImages/19f9ad9e-d9a0-4aeb-b633-f34bd0672416/1/std/ais-gray.png', model: 'CHPI-7520L' , color:'Pebble Gray' ,size:'270 x 546 x 515',kg:'23.9 kg'},
                { title: 'NEO PLUS', imgurl: 'https://emall.coway.com.my/ProductImages/4fc588de-8d1f-423d-9551-b88a032b2c6f/1/std/neo-plus.png', model: 'CHP-264L' , color:'White' ,size:'260 x 483 x 500',kg:'18.0 kg'},
                { title: 'LUCY PLUS', imgurl: 'https://emall.coway.com.my/ProductImages/9fcfd382-55b4-49c4-995e-ae578771bc1e/1/std/lucy-plus.png', model: 'CHPI-620L' , color:'Oatmeal Beige' ,size:'300 x 500 x 1291',kg:'35.2 kg'},

                { title: 'DAZZIE WHITE', imgurl: 'https://emall.coway.com.my/ProductImages/43f5bc04-fd8e-45af-9143-4658cb504b50/1/std/dazzie-white.png', model: 'CHP-1201N' , color:'White' ,size:'180 x 340 x 385',kg:'7.6 kg'},
                { title: 'DAZZIE GARY', imgurl: 'https://emall.coway.com.my/ProductImages/43f5bc04-fd8e-45af-9143-4658cb504b50/1/std/dazzie-gary.png', model: 'CHP-1201N' , color:'Gray' ,size:'180 x 340 x 385',kg:'7.6 kg'},

                { title: 'OMBAK', imgurl: 'https://emall.coway.com.my/ProductImages/20da1967-55e5-4fa9-b5be-0c6cc3b5a13e/1/std/ombak.png', model: 'CHP-7310R' , color:'White' ,size:'340 x 523 x 518',kg:'21.9 kg'},
                { title: 'HARRY', imgurl: 'https://emall.coway.com.my/ProductImages/82f0bb99-8856-4e08-9d67-f3e35d24a63c/1/std/harry.png', model: 'CHP-590N' , color:'White' ,size:'260 x 448 x 1150',kg:'27.0 kg'},
                
                { title: 'INCEPTION', imgurl: 'https://emall.coway.com.my/ProductImages/da4f8b89-3136-4712-a0c2-8d978c7b637a/1/std/inception.png', model: 'CHPE-250NF' , color:'White' ,size:'281 x 523 x 511',kg:'24.0kg'},
                { title: 'VILLAEM 2', imgurl: 'https://emall.coway.com.my/ProductImages/dcb69e95-d9e9-413c-8cff-d893a2c0367b/1/std/villaem-2.png', model: 'CHP-18AR' , color:'White' ,size:'340 x 523 x 518',kg:'20.2 kg'},

                { title: 'CINNAMON', imgurl: 'https://emall.coway.com.my/ProductImages/b79c1af2-60c6-46e3-a902-babade97ea48/1/std/cinnamon.png', model: 'P-6320R' , color:'Beige' ,size:'200 x 400 x 405',kg:'6.5kg'},
                { title: 'CORE PLUS', imgurl: 'https://emall.coway.com.my/ProductImages/ec48948e-5e2f-4edd-8531-58dd0edad5e3/1/std/core-plus.png', model: 'CHP-5721L' , color:'Oatmeal Beige' ,size:'320 x 488 x 1260',kg:'33kg'},
                { title: 'GLAZE', imgurl: 'https://emall.coway.com.my/ProductImages/e8f08c00-752f-4a72-844d-a54e37daf462/1/std/glaze.png', model: 'CHP-6310L' , color:'White' ,size:'260 x 483 x 510',kg:'17.3 kg'},
                { title: 'KECIL', imgurl: '	https://emall.coway.com.my/ProductImages/008aa64a-fe32-46fa-86cf-3ea381fa32bb/1/std/kecil.png', model: 'CHP-6200N' , color:'Sago Beige' ,size:'180 x 440 x 422',kg:'10.0 kg'},
            ],

            // icons
            icons: {
            },
        }
    }
}
</script>

<style lang="scss" scoped>

// .swiper-container {
//   .swiper-wrapper {
//     .swiper-slide {
//       width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
//       min-width: 56px; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
//       padding: 0px 14px;
//       font-size: 14px;
//       line-height: 36px;
//       text-align: center;
//       color: #84868c;
//       border: 0;
//       border-radius: 18px;
//       background: #f3f4f7;
//       appearance: none;
//       cursor: pointer;
//     }
//   }
// }
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
  max-width: 350px; /* 원하는 최대 넓이로 변경 */
  max-height:auto;
  width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
  min-width: 56px; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
  padding: 0px 14px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  
  margin: 10px; /* 10px의 여백 설정 */
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