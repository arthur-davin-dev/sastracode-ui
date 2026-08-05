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
    name: 'Chan Chhaya',
    role: 'Mentor',
    image: '/images/chan_chhaya.jpg',
    githubUrl: "https://github.com/it-chhaya",
    telegramUrl: "https://t.me/chhayadevkh",
  },
    {
    id: '2',
    name: 'Sreng Chipor',
    role: 'Mentor',
    image: '/images/sreng_chipor.jpg',
    githubUrl: "https://github.com/jiporCK",
    telegramUrl: "https://t.me/jiporsreng",
  },

];

// Simulated API Service function
export async function fetchAllMentors(): Promise<MentorType[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMentors;
}