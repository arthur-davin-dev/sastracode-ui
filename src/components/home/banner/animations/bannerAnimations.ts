import { Variants } from 'framer-motion'

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100
    }
  }
}

export const badgeVariants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  }
}

export const pulseVariants = {
  animate: {
    scale: [1, 1.5, 1],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
}

export const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -3,
    transition: { type: "spring", stiffness: 300 }
  },
  tap: {
    scale: 0.95
  }
}