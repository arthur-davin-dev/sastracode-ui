// Stats.tsx

import { useLanguage } from "@/app/Context";
import { percent } from "framer-motion";

const en ={
  stats: {
    lessons:"Lessons",
    like:"Likes",
    price:"price",
  }
}

const km ={
   stats: {
    lessons:"មេរៀន",
    like:"ការពេញចិត្ត",
    price:"គិតថ្លៃ",
  }
}

const setValue ={
  lesson: "101+" ,
  percent: "99.9%",
  price: "0$",
}

export default function Stats() {
    const { lang } = useLanguage();
  
    const t = {en,km}
  
    const currentT = t[lang];

  return (
    <div className="mt-10
      sm:mt-12
      lg:mt-16
      flex
      flex-wrap
      justify-center
      lg:justify-start
      gap-8
      sm:gap-12
      lg:gap-16"
    >

      <div className="text-center lg:text-left min-w-[80px]">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{setValue.lesson}+</h3>
        <p className="text-gray-500 dark:text-gray-400">{currentT.stats.lessons}</p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400">
           {setValue.percent}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {currentT.stats.like}
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {setValue.price}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {currentT.stats.price}
        </p>
      </div>

    </div>
  );
}