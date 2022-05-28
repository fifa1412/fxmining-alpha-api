import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

import { TableName } from '../config/table-name'

@Entity(TableName.PAIRS_SETTING)
export class PairsSettingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    symbol: String;

    @Column({ default: false })
    enableFetchData: Boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}
