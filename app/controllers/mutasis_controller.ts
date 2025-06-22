import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Lokasi from '#models/lokasi'
import RiwayatMutasi from '#models/riwayat_mutasi'
import { DateTime } from 'luxon'

export default class MutasisController {
  // Menampilkan form mutasi
  async show({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const lokasis = await Lokasi.query().whereNot('id', barang.lokasiId)
    await barang.load('lokasi')
    return view.render('pages/mutasi/show', { barang, lokasis })
  }

  // Proses mutasi barang
  async store({ request, response, session, params }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    await barang.load('lokasi')

    const tujuanLokasiId = request.input('tujuan_lokasi_id')
    const tujuanLokasi = await Lokasi.findOrFail(tujuanLokasiId)

    // Simpan riwayat
    await RiwayatMutasi.create({
      barangId: barang.id,
      asal: `${barang.lokasi.namaLokasi} - ${barang.lokasi.gedung}`,
      tujuan: `${tujuanLokasi.namaLokasi} - ${tujuanLokasi.gedung}`,
      tanggal: DateTime.now(),
    })

    // Update lokasi barang
    barang.lokasiId = tujuanLokasiId
    await barang.save()

    session.flash('success', `Barang ${barang.nama} berhasil dimutasi.`)
    return response.redirect().toRoute('barang.index')
  }
}