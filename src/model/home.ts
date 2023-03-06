import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Home {
    @PrimaryGeneratedColumn()
    idHome: number;
    @Column()
    address: string;
    @Column()
    nameHome: string;
    @Column()
    description: string
    @Column()
    bedrooms: number;
    @Column()
    bathrooms: number;
    @Column()
    idCategory: number;
    @Column()
    image: string;
    @Column({ default: 0 })
    count: number;
    @Column()
    idUser: number;
    @Column({default: "drum"})
    status: string;

}