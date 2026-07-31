"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck, Bell, Sparkles } from "lucide-react";
import { NotificationTabs } from "@/components/notification/NotificationTabs";
import { NotificationItem } from "@/components/notification/NotificationItem";
import { NotificationSuggestionCard } from "@/components/notification/NotificationSuggestionCard";
import {
  NotificationItem as NotificationItemType,
  NotificationSuggestion,
} from "@/types/notification";

const initialNotifications: NotificationItemType[] = [
  {
    id: "1",
    type: "course",
    category: "ថ្មីៗ",
    title: "វគ្គសិក្សាថ្មី៖ បង្រៀនអំពី React.js ត្រូវបានផ្សព្វផ្សាយ",
    description:
      "ចូលរួមសិក្សាវគ្គថ្មីអំពីខ្លឹមសារជាមូលដ្ឋាននៃ React.js និងបង្កើតគម្រោងជាមួយវា។ បន្ថែមទៀតអំពីរបៀបប្រើប្រាស់ Hooks ក៏ដូចជា Component ជាដើម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
  {
    id: "2",
    type: "reward",
    category: "រង្វាន់",
    title: "សូមអបអរសាទរ! អ្នកទទួលបានរង្វាន់ថ្មី \"អ្នករៀនសាមញ្ញ\"",
    description:
      "អ្នកបានបញ្ចប់លំហាត់ថ្មី ១០ ដងជាប់ៗគ្នា។ ត្រូវការស្វែងរកនិងស្វែងយល់បន្ថែមអំពីរបៀបប្រើប្រាស់មុខងារនេះ និងបន្តខិតខំសិក្សាបន្ថែម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
  {
    id: "3",
    type: "streak",
    category: "ការរំលឹក",
    title: "ការរំលឹក កំពុងធ្វេស \"HTML Basics\" លិខិតបញ្ជាក់កំពុងរង់ចាំ",
    description:
      "ចូលរួមសិក្សាថ្នាក់ថ្មីអំពីខ្លឹមសារជាមូលដ្ឋាននៃ React.js និងបង្កើតគម្រោងជាមួយវា។ ត្រូវការស្វែងរកបន្ថែមអំពីរបៀបប្រើប្រាស់មុខងារនេះ",
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
    description:
      "អ្នកគួរធ្វើការចម្លងទុកព័ត៌មានសំខាន់ៗរបស់អ្នក មុនពេលប្រព័ន្ធធ្វើការធ្វើបច្ចុប្បន្នភាព និងបន្តខិតខំសិក្សាបន្ថែម",
    time: "២ នាទីមុន",
    isUnread: true,
  },
];

const suggestions: NotificationSuggestion[] = [
  {
    id: "1",
    icon: "flame",
    title: "កម្រិតថាស",
    subtitle: "នៅសល់អ្នកបានធ្វើកម្មវិធីរួច ១ថ្ងៃទៀត",
    variant: "primary",
  },
  {
    id: "2",
    icon: "trophy",
    title: "វិញ្ញាបនបត្រថ្មី",
    subtitle: "បញ្ចប់វគ្គបន្ថែម",
    variant: "secondary",
  },
  {
    id: "3",
    icon: "lock",
    title: "ដោះសោសមិទ្ធផលថ្មី",
    subtitle: "បញ្ចប់មេរៀនបន្ថែម ៤ ទៀត",
    variant: "locked",
  },
];

export default function Notification() {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationsList, setNotificationsList] =
    useState<NotificationItemType[]>(initialNotifications);

  const unreadCount = notificationsList.filter((n) => n.isUnread).length;

  const filteredNotifications =
    activeTab === "unread"
      ? notificationsList.filter((n) => n.isUnread)
      : notificationsList;

  const markAllAsRead = () => {
    setNotificationsList((prev) =>
      prev.map((item) => ({ ...item, isUnread: false }))
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-12 md:py-16 overflow-hidden transition-colors duration-300">
      
      {/* Decorative Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full  pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Breadcrumb Navigation (text-lg) */}
        <nav className="text-lg font-medium text-primary-color opacity-70">
          ផ្ទាំងគ្រប់គ្រង &gt; <span className="font-bold opacity-100">ការជូនដំណឹង</span>
        </nav>

        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
          
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-2 " />

          <div className="space-y-2">
            {/* Main Title (text-2xl) */}
            <h1 className="text-2xl font-extrabold text-primary-color flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center">
                <Bell className="h-7 w-7 text-secondary-color" />
              </div>
              ការរំលឹក និងការជូនដំណឹង
            </h1>

            {/* Subtitle / Description (text-lg) */}
            <p className="text-lg text-primary-color opacity-80 pl-1">
              តាមដានសារជូនដំណឹងទាំងអស់ រួមទាំងព័ត៌មានថ្មីៗអំពីការសិក្សា
            </p>
          </div>

          {/* Mark All As Read Button (Red Secondary with Yellow Hover) */}
          <Button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="h-14 px-6 rounded-2xl text-lg font-bold text-white bg-secondary-color hover:bg-secondary-color/50 shadow-md transition-all duration-300 gap-2.5 shrink-0 flex items-center justify-center border border-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="h-6 w-6" />
            <span>សម្គាល់ថាបានអានទាំងអស់</span>
          </Button>
        </div>

        {/* Filter Navigation Tabs */}
        <section>
          <NotificationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{ all: notificationsList.length, unread: unreadCount }}
          />
        </section>

        {/* Notifications List Container */}
        <section className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <Bell className="h-12 w-12 text-slate-400 mx-auto" />
                <p className="text-2xl font-bold text-primary-color">
                  គ្មានការជូនដំណឹងនៅឡើយទេ
                </p>
                <p className="text-lg text-primary-color opacity-70">
                  សារជូនដំណឹងថ្មីៗរបស់អ្នកនឹងបង្ហាញនៅទីនេះ
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <NotificationItem notification={n} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </section>

        {/* Achievements / Suggestions Section */}
        <section className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-init-color" />
            <h2 className="text-2xl font-extrabold text-primary-color">
              សមិទ្ធផលថ្មីរបស់អ្នក
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {suggestions.map((s) => (
              <NotificationSuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}