import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Barang from './barang.js'

export default class Penghapusan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public barangId: number

  @column()
  public alasan: string

  @column.date()
  public tanggal: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Barang)
  public barang: BelongsTo<typeof Barang>
}