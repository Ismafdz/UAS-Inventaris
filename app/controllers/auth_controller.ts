import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {

  // Menampilkan halaman register
  showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  // Proses registrasi user baru
  async register({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    await auth.use('web').login(user)
    return response.redirect().toRoute('/')
  }

  // Menampilkan halaman login
  showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Proses login
  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('/')
    } catch (error) {
      session.flash('error', 'Email atau password salah.')
      return response.redirect().back()
    }
  }

  // Proses logout
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.showLogin')
  }
}
