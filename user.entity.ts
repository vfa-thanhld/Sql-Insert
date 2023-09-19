import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'uuid can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({
    type: 'varchar',
    name: 'userName',
    length: 255,
    nullable: false,
    unique: true,
    comment: 'auto generate by BE',
  })
  userName: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'email' })
  email: string | null;
}
