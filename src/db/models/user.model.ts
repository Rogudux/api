import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName: 'homework',
    timestamps: false
})

export class Homework extends Model{

    @Column({
        type: DataType.INTEGER,
        allowNull:true,
        autoIncrement:true, 
        primaryKey:true
    })
    id!: number;

    @Column({
        type: DataType.STRING, allowNull:true
    })
    tittle!: string;

    @Column({
        type: DataType.STRING, allowNull:true
    })
    descripcion!: string;

    @Column({
        type: DataType.BOOLEAN, allowNull:true
    })
    completed!: boolean;



}