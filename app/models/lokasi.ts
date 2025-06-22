import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Barang from './barang.js'

export default class Lokasi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public namaLokasi: string

  @column()
  public gedung: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Barang)
  public barangs: HasMany<typeof Barang>
}
