
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Index.vue') },
      { path: 'auth', component: () => import('pages/PinSignInPage.vue') },
      { path: 'myqr', component: () => import('pages/MyQRPage.vue') },
      { path: 'transactionslip', component: () => import('pages/SlipPage.vue') },
      { path: 'billslip', component: () => import('pages/BillSlipPage.vue') },


    ]
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/MainPage.vue') },
      { path: 'wallet', component: () => import('pages/WalletPage.vue') },
      { path: 'qrscan', component: () => import('pages/QRScanPage.vue') },
      { path: 'qrtransfer', component: () => import('pages/QRTransferPage.vue') },
      { path: 'transfer', component: () => import('pages/TransferPage.vue') },
      { path: 'services', component: () => import('pages/ServicesPage.vue') },
      { path: 'setting', component: () => import('pages/SettingPage.vue') },
      { path: 'paybill', component: () => import('pages/BillPaymentPage.vue') },
      { path: 'conpaybill', component: () => import('pages/ConfirmPaymentPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
