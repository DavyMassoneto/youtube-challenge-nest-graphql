import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { MigrationUtil } from 'src/utils/migrationUtil'

export class createUsers1605896319460 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      MigrationUtil.getIDColumn(),
      MigrationUtil.getVarCharColumn({ name: 'email', isUnique: true }),
      ...MigrationUtil.getDefaultColumns(),
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
