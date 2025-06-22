import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  tableName = 'barangs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.string('kode_barang').notNullable().unique()
      table.integer('jumlah').unsigned().notNullable()

      table.integer('kategori_id').unsigned().references('id').inTable('kategoris').onDelete('CASCADE')
      table.integer('lokasi_id').unsigned().references('id').inTable('lokasis').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}