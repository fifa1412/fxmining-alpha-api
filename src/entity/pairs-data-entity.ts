import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    PrimaryColumn,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.PAIRS_DATA)
export class PairsDataEntity extends BaseEntity {
    @PrimaryColumn()
    symbol: String;

    @Column({ nullable: true })
    priceBid: number

    @Column({ nullable: true })
    priceAsk: number

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}
