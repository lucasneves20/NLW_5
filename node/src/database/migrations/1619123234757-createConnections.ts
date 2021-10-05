import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createConnections1619123234757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "connections",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "socket_id",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timescamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timescamp",
                        default: "now()"
                    }
                ]
            })
        );
        
        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                name: "fk_Connection_User",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("connections", "fk_Connection_User")
        await queryRunner.dropTable("connections")
    }

}
