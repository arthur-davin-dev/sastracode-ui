"use client";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  color?: "blue" | "cyan" | "violet";
}

export default function FeatureCard({
  icon,
  title,
  description,
  link,
  color = "blue",
}: FeatureCardProps) {

  const colors = {
    blue: {
      box: "border-blue-600/15 bg-blue-100 dark:border-blue-400/20 dark:bg-blue-950/30",
      text: "text-blue-600 dark:text-blue-400",
      hover: "hover:text-blue-800 dark:hover:text-blue-300",
      arrow: "/home/svg/arrow-blue.svg",
    },

    cyan: {
      box: "border-cyan-500/15 bg-[#e0f7fd] dark:border-cyan-400/20 dark:bg-cyan-950/30",
      text: "text-blue-600 dark:text-blue-400",
      hover: "hover:text-blue-800 dark:hover:text-blue-300",
      arrow: "/home/svg/arrow-blue.svg",
    },

    violet: {
      box: "border-violet-600/15 bg-violet-100 dark:border-violet-400/20 dark:bg-violet-950/30",
      text: "text-violet-600 dark:text-violet-400",
      hover: "hover:text-violet-800 dark:hover:text-violet-300",
      arrow: "/home/svg/arrow-purple.svg",
    },
  };


  return (
    <article
      className="
      rounded-[22px]
      border border-[rgba(13,27,62,0.09)]
      dark:border-gray-700
      bg-white
      dark:bg-gray-800
      p-8
      shadow-[0_4px_10px_rgba(13,27,62,0.07)]
      dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-lg
      dark:hover:shadow-gray-900/50
      "
    >

      <div
        className={`
          flex size-[52px]
          items-center justify-center
          rounded-[14px]
          border
          ${colors[color].box}
        `}
      >
        <img
          src={icon}
          alt=""
          className="size-[22px] dark:brightness-200"
        />
      </div>


      <h3
        className="
        mt-5
        text-2xl
        font-extrabold
        text-navy
        dark:text-white
        transition-colors
        "
      >
        {title}
      </h3>


      <p
        className="
        mt-3
        font-khmer
        text-base
        leading-6
        text-slate-body
        dark:text-gray-400
        "
      >
        {description}
      </p>


      <a
        href="#"
        className={`
          mt-5
          inline-flex
          items-center
          gap-1.5
          text-xs
          font-bold
          ${colors[color].text}
          ${colors[color].hover}
          transition-colors
        `}
      >
        {link}

        <img
          src={colors[color].arrow}
          alt=""
          className="size-[13px] dark:brightness-200"
        />
      </a>


    </article>
  );
}