import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  tableName = 'riwayat_mutasis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('barang_id').unsigned().references('id').inTable('barangs').onDelete('CASCADE')
      table.string('asal').notNullable()
      table.string('tujuan').notNullable()
      table.date('tanggal').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}