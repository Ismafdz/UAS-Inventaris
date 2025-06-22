import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  tableName = 'penghapusans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('barang_id').unsigned().references('id').inTable('barangs').onDelete('CASCADE')
      table.string('alasan').notNullable()
      table.date('tanggal').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}