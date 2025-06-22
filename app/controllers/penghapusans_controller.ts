import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Penghapusan from '#models/penghapusan'
import { DateTime } from 'luxon'

export default class PenghapusansController {
  // Menampilkan form
  async show({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    return view.render('pages/penghapusan/show', { barang })
  }

  // Proses penghapusan
  async store({ request, response, session, params }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const jumlahDihapus = request.input('jumlah')
    const alasan = request.input('alasan')

    if (jumlahDihapus > barang.jumlah) {
      session.flash('error', 'Jumlah yang dihapus melebihi stok.')
      return response.redirect().back()
    }

    // Simpan riwayat
    await Penghapusan.create({
      barangId: barang.id,
      alasan: `${alasan} (sebanyak ${jumlahDihapus} unit)`,
      tanggal: DateTime.now(),
    })

    // Kurangi jumlah barang
    barang.jumlah -= jumlahDihapus
    await barang.save()

    session.flash('success', 'Data penghapusan barang berhasil dicatat.')
    return response.redirect().toRoute('barang.index')
  }
}
