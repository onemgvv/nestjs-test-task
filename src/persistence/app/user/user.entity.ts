import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable, ManyToMany, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {TokenEntity} from "@persistence/app/token/token.entity";
import {TagEntity} from "@persistence/app/tag/tag.entity";

@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    nickname: string;

    @Column('varchar')
    password: string;

    @OneToMany(
        () => TagEntity,
        (tag) => tag.user,
    )
    tag: TagEntity;

    @ManyToMany(
        () => TagEntity,
        (tag) => tag.users,
        { onDelete: "CASCADE" }
    )
    @JoinTable({
        name: 'user_tag'
    })
    tags: TagEntity[];

    @OneToOne(
        () => TokenEntity,
        (token) => token.user,
        { onDelete: "CASCADE" }
    )
    @JoinColumn()
    token: TokenEntity;

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