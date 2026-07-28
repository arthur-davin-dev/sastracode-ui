"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { NotificationTabs } from "@/components/notification/NotificationTabs";
import { NotificationItem } from "@/components/notification/NotificationItem";
import { NotificationSuggestionCard } from "@/components/notification/NotificationSuggestionCard";
import { NotificationItem as NotificationItemType, NotificationSuggestion } from "@/types/notification";

const notifications: NotificationItemType[] = [
  {
    id: "1",
    type: "course",
    category: "ថ្មីៗ",
    title: "វគ្គសិក្សាថ្មី៖ បង្រៀនអំពី React.js ត្រូវបានផ្សព្វផ្សាយ",
    description: "ចូលរួមសិក្សាវគ្គថ្មីអំពីខ្លឹមសារជាមូលដ្ឋាននៃ React.js និងបង្កើតគម្រោងជាមួយវា។ បន្ថែមទៀតអំពីរបៀបប្រើប្រាស់ Hooks ក៏ដូចជា Component ជាដើម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
  {
    id: "2",
    type: "reward",
    category: "រង្វាន់",
    title: "សូមអបអរសាទរ! អ្នកទទួលបានរង្វាន់ថ្មី \"អ្នកបៀនសាមញ្ញ\"",
    description: "អ្នកបានបញ្ចប់លំហាត់ថ្មី ១០ ដងជាប់ៗគ្នា។ ត្រូវការស្វែងរកនិងស្វែងយល់បន្ថែមអំពីរបៀបប្រើប្រាស់មុខងារនេះ និងបន្តខិតខំសិក្សាបន្ថែម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
  {
    id: "3",
    type: "streak",
    category: "ការរំលឹក",
    title: "ការរំលឹក កំពុងធ្វេស \"HTML Basics\" លិខិតបញ្ជាក់កំពុងរង់ចាំ",
    description: "ចូលរួមសិក្សាថ្នាក់ថ្មីអំពីខ្លឹមសារជាមូលដ្ឋាននៃ React.js និងបង្កើតគម្រោងជាមួយវា។ ត្រូវការស្វែងរកបន្ថែមអំពីរបៀបប្រើប្រាស់មុខងារនេះ",
    time: "២ នាទីមុន",
    isUnread: true,
    streakData: {
      progressPercent: 60,
      label: "សម្រេចបាន ៦០% រួចហើយ",
    },
  },
  {
    id: "4",
    type: "system",
    category: "ប្រព័ន្ធ",
    title: "ការធ្វើបច្ចុប្បន្នភាពប្រព័ន្ធនឹងកើតឡើងថ្ងៃស្អែក",
    description: "អ្នកគួរធ្វើការចម្លងទុកព័ត៌មានសំខាន់ៗរបស់អ្នក មុនពេលប្រព័ន្ធធ្វើការធ្វើបច្ចុប្បន្នភាព និងបន្តខិតខំសិក្សាបន្ថែម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
];

const suggestions: NotificationSuggestion[] = [
  { id: "1", icon: "flame", title: "កម្រិតថាស", subtitle: "នៅសល់អ្នកបានធ្វើកម្មវិធីរួច ១ថ្ងៃទៀត", variant: "primary" },
  { id: "2", icon: "trophy", title: "វិញ្ញាបនបត្រថ្មី", subtitle: "បញ្ចប់វគ្គបន្ថែម", variant: "secondary" },
  { id: "3", icon: "lock", title: "ដោះសោសមិទ្ធផលថ្មី", subtitle: "បញ្ចប់មេរៀនបន្ថែម ៤ ទៀត", variant: "locked" },
];

export default function Notification() {
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const filteredNotifications =
    activeTab === "unread" ? notifications.filter((n) => n.isUnread) : notifications;

  return (
    <div className="relative w-full min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
          ថ្នាំងគ្រប់គ្រង &gt; ការជូនដំណឹង
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-indigo-950 dark:text-white transition-colors duration-300">
              ការរំលឹក និងការជូនដំណឹង
            </h1>
            <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1 transition-colors duration-300">
              តាមដានសារជូនដំណឹងទាំងអស់ រួមទាំងព័ត៌មានថ្មីៗអំពីការសិក្សា
            </p>
          </div>
          <Button className="gap-2 text-white bg-indigo-950 hover:bg-indigo-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors duration-300 w-full sm:w-auto">
            <CheckCheck className="h-4 w-4" /> សម្គាល់ថាបានអានទាំងអស់
          </Button>
        </div>

        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{ all: notifications.length, unread: unreadCount }}
        />

        <div className="space-y-3">
          <AnimatePresence mode="popLayout"> 
            {filteredNotifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }} 
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <NotificationItem notification={n} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="pt-4">
          <p className="text-sm font-medium mb-3 text-slate-900 dark:text-white transition-colors duration-300">
            សមិទ្ធផលថ្មីរបស់អ្នក
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((s) => (
              <NotificationSuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}