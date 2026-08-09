export type MentorType = {
  id: string;
  name: string;
  role: string;
  image: string;
  telegramUrl: string;
  githubUrl: string;
};

export const mockMentors: MentorType[] = [
  {
    id: '1',
    name: 'ចាន់ ឆៃយ៉ា',
    role: 'អ្នកណែនាំ',
    image: '/images/chan_chhaya.jpg',
    githubUrl: "https://github.com",
    telegramUrl: "https://t.me",
  },
    {
    id: '2',
    name: 'ស្រេង ជីប៉',
    role: 'អ្នកណែនាំ',
    image: '/images/sreng_chipor.jpg',
    githubUrl: "https://github.com",
    telegramUrl: "https://t.me",
  },

];

// Simulated API Service function
export async function fetchAllMentors(): Promise<MentorType[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMentors;
}