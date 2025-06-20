export type Category = 'Work' | 'Personal' | 'Study' | 'Other';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  createdAt: string;
  title: string;
}