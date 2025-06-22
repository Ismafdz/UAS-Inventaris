import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  tableName = 'lokasis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_lokasi').notNullable()
      table.string('gedung').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}