// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   // ManyToOne,
//   // ManyToMany,
//   // JoinTable,
// } from 'typeorm';
// // import { UserEntity } from './user.entity'; // Assuming you have a UserEntity defined

// @Entity('recipes')
// export class Recipe {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column('text')
//   description: string;

//   @Column('text', { array: true })
//   ingredients: string[];

//   @Column('text')
//   instructions: string;

//   @Column({ type: 'int', default: 0 })
//   cookingTime: number;

//   @Column({ type: 'boolean', default: false })
//   isPublished: boolean;

//   // @ManyToOne(() => UserEntity, (user) => user.recipes)
//   // author: UserEntity;

//   // @ManyToMany(() => UserEntity, (user) => user.bookmarkedRecipes)
//   // @JoinTable()
//   // bookmarkedBy: UserEntity[];

//   // ... other attributes and relationships like tags, categories, ratings, etc.
// }
