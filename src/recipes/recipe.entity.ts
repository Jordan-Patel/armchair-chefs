import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';
// import { UserEntity } from './user.entity'; // Assuming you have a UserEntity defined

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  ingredients: string[];

  @Column('text')
  steps: string[];

  @Column({ type: 'int', default: 0 })
  cookingTime: number;

  @Column({ type: 'int' })
  difficulty: number;

  @Column({ type: 'boolean', default: false })
  cooked: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @ManyToOne(() => UserEntity, (user) => user.recipes)
  // author: UserEntity;

  // @ManyToMany(() => UserEntity, (user) => user.bookmarkedRecipes)
  // @JoinTable()
  // bookmarkedBy: UserEntity[];

  // ... other attributes and relationships like tags, categories, ratings, etc.
}
