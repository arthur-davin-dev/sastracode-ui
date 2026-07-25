export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  image: string;
  href?: string;
}