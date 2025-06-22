import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// ✅ Route Debug Test
router.get('/test', async ({ view }) => {
  console.log('Rendering test view...')
  return view.render('pages/home')
})

// Rute Publik (Guest)
router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('/register', '#controllers/auth_controller.showRegister').as('auth.showRegister')
    router.post('/register', '#controllers/auth_controller.register').as('auth.register')
    router.get('/login', '#controllers/auth_controller.showLogin').as('auth.showLogin')
    router.post('/login', '#controllers/auth_controller.login').as('auth.login')
  })
  .use(middleware.guest())

// Rute yang butuh Login
router
  .group(() => {
    router.delete('/logout', '#controllers/auth_controller.logout').as('auth.logout')

    // CRUD Routes
    router.resource('barang', '#controllers/barangs_controller')
    router.resource('kategori', '#controllers/kategoris_controller')
    router.resource('lokasi', '#controllers/lokasis_controller')

    // Fitur Khusus
    router.get('/mutasi/:id', '#controllers/mutasis_controller.show').as('mutasi.show')
    router.post('/mutasi/:id', '#controllers/mutasis_controller.store').as('mutasi.store')
    router.get('/penghapusan/:id', '#controllers/penghapusans_controller.show').as('penghapusan.show')
    router.post('/penghapusan/:id', '#controllers/penghapusans_controller.store').as('penghapusan.store')
    
    // Laporan
    router.get('/laporan', '#controllers/laporans_controller.index').as('laporan.index')
  })
  .use(middleware.auth())
