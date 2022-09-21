import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToMany, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import UserEntity from "@persistence/app/user/user.entity";

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 40,
    })
    name: string;

    @Column('uuid')
    creator: string;

    @Column('integer', {
        default: 0
    })
    sortOrder: number;

    @ManyToOne(
        () => UserEntity,
        (user) => user.tag
    )
    @JoinColumn({
        name: "creator",
        referencedColumnName: "id"
    })
    user: UserEntity;

    @ManyToMany(
        () => UserEntity,
        (user) => user.tags
    )
    users: UserEntity[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;
}