import { User } from '../auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  // ManyToOne,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.recipes, { eager: false })
  author: User;

  // @ManyToMany(() => UserEntity, (user) => user.bookmarkedRecipes)
  // @JoinTable()
  // bookmarkedBy: UserEntity[];

  // ... other attributes and relationships like tags, categories, ratings, etc.
}
