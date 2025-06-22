import type { HttpContext } from '@adonisjs/core/http'
import Barang from '#models/barang'
import Kategori from '#models/kategori'
import Lokasi from '#models/lokasi'
import vine from '@vinejs/vine'

const barangValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3),
    kodeBarang: vine.string().trim(),
    jumlah: vine.number().min(0),
    kategoriId: vine.number(),
    lokasiId: vine.number(),
  })
)

export default class BarangsController {
  // Menampilkan semua barang
  async index({ view }: HttpContext) {
    const barangs = await Barang.query().preload('kategori').preload('lokasi')
    return view.render('pages/barang/index', { barangs })
  }

  // Menampilkan form tambah barang
  async create({ view }: HttpContext) {
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('pages/barang/create', { kategoris, lokasis })
  }

  // Menyimpan barang baru
  async store({ request, response, session }: HttpContext) {
    // --- PERUBAHAN DI SINI ---
    // Kita memvalidasi data menggunakan vine secara langsung
    // untuk mengatasi error TypeScript.
    const data = await vine.validate({
        schema: barangValidator,
        data: request.all(),
    })
    // --- AKHIR PERUBAHAN ---

    await Barang.create(data)
    session.flash('success', 'Barang berhasil ditambahkan.')
    return response.redirect().toRoute('barang.index')
  }

  // Menampilkan form edit barang
  async edit({ params, view }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)
    const kategoris = await Kategori.all()
    const lokasis = await Lokasi.all()
    return view.render('pages/barang/edit', { barang, kategoris, lokasis })
  }

  // Memperbarui data barang
  async update({ params, request, response, session }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)

    // --- PERUBAHAN DI SINI ---
    const data = await vine.validate({
        schema: barangValidator,
        data: request.all(),
    })
    // --- AKHIR PERUBAHAN ---
    
    barang.merge(data)
    await barang.save()
    session.flash('success', 'Barang berhasil diperbarui.')
    return response.redirect().toRoute('barang.index')
  }

  // Menghapus barang
  async destroy({ params, response, session }: HttpContext) {
    const barang = await Barang.findOrFail(params.id)

    // Validasi: Cek riwayat mutasi
    await barang.load('riwayatMutasis')
    if (barang.riwayatMutasis.length > 0) {
       session.flash('error', 'Tidak bisa menghapus barang yang memiliki riwayat mutasi.')
       return response.redirect().back()
    }

    await barang.delete()
    session.flash('success', 'Barang berhasil dihapus.')
    return response.redirect().toRoute('barang.index')
  }
}