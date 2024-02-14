const commission = [
    {
      path: '/commission/HPYearlyIncomeStatement',
      name: 'HPYearlyIncomeStatement',
      component: () => import('../views/commission/HPYearlyIncomeStatement.vue'),
      meta: {
        layout: 'content',
        requiresAuth: false
      },
    }
  ]
  
  export default commission