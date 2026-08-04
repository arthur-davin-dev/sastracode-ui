import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";

// Animation variants for the title
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.5,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Subtle floating animation for cards (only when not hovering)
const cardFloatVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [0, -4, 0, 4, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.15,
    },
  }),
};

// Icon animation variants
const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Arrow button animation variants
const arrowVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
};

// Container animation for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// CourseCard component with animations
function CourseCard({ image, title, description, badge, buttonText, onView, index }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-xl transition-all duration-300"
    >
      {/* Image with subtle zoom on hover */}
      <motion.div
        className="relative overflow-hidden"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {badge}
          </motion.span>
        )}
      </motion.div>

      <div className="p-5">
        <motion.h3
          className="text-lg font-semibold text-slate-800 dark:text-white mb-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>

        <motion.button
          onClick={onView}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonText || "View Course"}
        </motion.button>
      </div>

      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />
    </motion.div>
  );
}

export function HomePopularDoc() {
  const currentT = useTranslation();

  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background decorative element */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Title with animation */}
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight"
      >
        {currentT.popularDoc.title}
      </motion.h2>

      {/* Carousel with animated container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 pb-6 sm:pb-10 lg:pb-10"
      >
        <div
          id="hs-carousel"
          className="relative w-full min-h-110 overflow-hidden"
          data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
        >
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {docCourses.map((course, index) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <CourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.badge}
                  buttonText={course.buttonText}
                  onView={() => handleViewCourse(course.id)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Animated Arrows */}
        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </motion.button>

        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}