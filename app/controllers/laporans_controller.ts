import type { HttpContext } from '@adonisjs/core/http'
import Lokasi from '#models/lokasi'

export default class LaporansController {
  async index({ view }: HttpContext) {
    const lokasis = await Lokasi.query().preload('barangs')

    const laporan = lokasis.map(lokasi => {
      const totalBarang = lokasi.barangs.reduce((sum, barang) => sum + barang.jumlah, 0)
      return {
        namaLokasi: `${lokasi.namaLokasi} - ${lokasi.gedung}`,
        barangs: lokasi.barangs,
        totalBarang: totalBarang,
      }
    })

    return view.render('pages/laporan/index', { laporan })
  }
}
