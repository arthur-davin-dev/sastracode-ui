export interface NotificationItem {
  id: string;
  type: "course" | "reward" | "streak" | "system"; // កំណត់ពណ៌ icon
  category: string;      // "ថ្មីៗ", "រង្វាន់", "ការរំលឹក", "ប្រព័ន្ធ"
  title: string;
  description: string;
  time: string;          // "២ នាទីមុន"
  isUnread: boolean;
  streakData?: {
    progressPercent: number;
    label: string;
  };
}

export interface NotificationSuggestion {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  variant: "primary" | "secondary" | "locked";
}