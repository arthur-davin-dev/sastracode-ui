import {
  Code2,
  FileCode2,
  Paintbrush,
  Terminal,
  Puzzle,
  Type,
  LucideIcon,
} from "lucide-react";
import type { ChallengeType } from "@/redux/service/coding-task-player-api";

export interface ChallengeUIConfig {
  icon: LucideIcon;
  title: string;
  tagColorClass: string;
  headerColorClass: string;
}

export function getChallengeUIConfig(
  challengeType: ChallengeType | undefined | string,
): ChallengeUIConfig {
  switch (challengeType) {
    case "HTML_BUILDER":
      return {
        icon: FileCode2,
        title: "HTML Builder",
        tagColorClass:
          "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
        headerColorClass: "text-orange-600 dark:text-orange-400",
      };
    case "CSS_STYLING":
      return {
        icon: Paintbrush,
        title: "CSS Styling",
        tagColorClass:
          "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
        headerColorClass: "text-blue-600 dark:text-blue-400",
      };
    case "JS_DOM":
    case "COMPLETE_FUNCTION":
    case "FIX_BUG":
      return {
        icon: Terminal,
        title: "JavaScript Code",
        tagColorClass:
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
        headerColorClass: "text-yellow-600 dark:text-yellow-400",
      };
    case "ARRANGE_BLOCKS":
      return {
        icon: Puzzle,
        title: "Arrange Blocks",
        tagColorClass:
          "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
        headerColorClass: "text-purple-600 dark:text-purple-400",
      };
    case "FILL_IN_BLANK":
    case "MULTIPLE_BLANKS":
    case "REPLACE_LINE":
      return {
        icon: Type,
        title: "Fill in the Blanks",
        tagColorClass:
          "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",
        headerColorClass: "text-pink-600 dark:text-pink-400",
      };
    default:
      return {
        icon: Code2,
        title: "Code Editor",
        tagColorClass:
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        headerColorClass: "text-[#04AA6D] dark:text-emerald-400",
      };
  }
}
