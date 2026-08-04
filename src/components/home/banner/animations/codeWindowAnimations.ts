import { Variants } from 'framer-motion'

export const codeLineVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut"
    }
  })
}

export const windowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const chromeVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.4 }
  }
}

export const floatingAnimation = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const progressBarVariants = {
  animate: {
    width: ["3rem", "5rem", "3rem"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const colorPulseVariants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: { duration: 2, repeat: Infinity }
  }
}

export const chartIconVariants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.2,
    rotate: 0
  }
}