import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { MigrationUtil } from 'src/utils/migrationUtil'

export class createMessages1605897740655 implements MigrationInterface {
  private table = new Table({
    name: 'messages',
    columns: [
      MigrationUtil.getIDColumn(),
      MigrationUtil.getUuidColumn({ name: 'user_id' }),
      MigrationUtil.getVarCharColumn({ name: 'content' }),
      ...MigrationUtil.getDefaultColumns(),
    ],
    foreignKeys: [MigrationUtil.getForeignKey({ referencedTableName: 'users', columnName: 'user_id' })],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
