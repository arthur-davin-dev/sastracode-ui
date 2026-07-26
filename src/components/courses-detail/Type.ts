export interface Lesson {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  lessonCount: number;
  totalDuration: string;
  lessons: Lesson[];
}