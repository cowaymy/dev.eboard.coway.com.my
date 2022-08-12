<template>
    <div style="position: relative">
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <StatisticsCardVertical v-bind="eKeyInData"> </StatisticsCardVertical>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <StatisticsCardVertical v-bind="NetSalesData"></StatisticsCardVertical>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <StatisticsCardVertical v-bind="ActiveHpData"></StatisticsCardVertical>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <StatisticsCardVertical v-bind="SHIData"></StatisticsCardVertical>
            </v-col>
            <template v-if="true">
                    <v-dialog
                        v-model="isDialogVisible"
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                    >
                        <template #activator="{ on, attrs }">
                            <v-fab-transition>
                                <v-btn
                                    color="error"
                                    v-bind="attrs"
                                    v-on="on"
                                    dark
                                    absolute
                                    bottom
                                    right
                                    fab
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-fab-transition>
                        </template>
                        <v-card tile>
                            <v-toolbar dark color="primary">
                                <v-btn icon dark @click="isDialogVisible = false">
                                    <v-icon>{{ icons.mdiClose }}</v-icon>
                                </v-btn>
                                <v-toolbar-title>Find out More</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn dark text class="my-auto" @click="isDialogVisible = false">
                                        Close
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar>

                            <v-row>
                                <v-col cols="12"><p></p></v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <StatisticsCardVerticalForSales
                                        :change="KeyInOptions.change"
                                        :color="KeyInOptions.color"
                                        :icon="KeyInOptions.icon"
                                        :statistics="KeyInOptions.statistics"
                                        :stat-title="KeyInOptions.statTitle"
                                        :subtitle="KeyInOptions.subtitle"
                                    ></StatisticsCardVerticalForSales>
                                </v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <StatisticsCardVerticalForSales
                                        :change="NetSalesOptions.change"
                                        :color="NetSalesOptions.color"
                                        :icon="NetSalesOptions.icon"
                                        :statistics="NetSalesOptions.statistics"
                                        :stat-title="NetSalesOptions.statTitle"
                                        :subtitle="NetSalesOptions.subtitle"
                                    ></StatisticsCardVerticalForSales>
                                </v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <StatisticsCardVerticalForSales
                                        :change="ActiveHpOptions.change"
                                        :color="ActiveHpOptions.color"
                                        :icon="ActiveHpOptions.icon"
                                        :statistics="ActiveHpOptions.statistics"
                                        :stat-title="ActiveHpOptions.statTitle"
                                        :subtitle="ActiveHpOptions.subtitle"
                                    ></StatisticsCardVerticalForSales>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-dialog>
            </template>

            <template v-else> </template>
        </v-row>
    </div>
</template>

<script>
import StatisticsCardVertical from '../../../components/statistics-card/StatisticsCardVerticalForCody.vue';
import StatisticsCardVerticalForSales from '../../../components/statistics-card/StatisticsCardVerticalForSales.vue';
import {
	mdiClipboardEditOutline,
	mdiCheckboxMultipleMarkedOutline,
	mdiAccountCheckOutline,
	mdiClose,
} from '@mdi/js';

export default {
    components: {
        StatisticsCardVertical,
        StatisticsCardVerticalForSales,
    },
    props: {
        eKeyInData: {type: Object},
        NetSalesData: {type: Object},
        ActiveHpData: {type: Object},
        SHIData: {type: Object},
        KeyInOptions: {type: Object},
        NetSalesOptions: {type: Object},
        ActiveHpOptions: {type: Object}
    },
    data() {
        const isDialogVisible = false;

        

        return {
            isDialogVisible,
            icons: {
				mdiClose,
			},
        };
    }
};
</script>