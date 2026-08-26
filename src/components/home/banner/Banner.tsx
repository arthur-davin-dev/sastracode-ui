"use client"
import { useEffect, useState } from 'react'
import Stats from './Stats'
import CodeWindow from './CodeWindow'
import { useTranslation } from '@/hooks/useTranslations'
import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'

type BannerTitle = {
  title1: string
  title2: string
  title3: string
  title4: string
  title5: string
}

function TypingTitle({ title1, title2, title3, title4, title5 }: BannerTitle) {
  const firstLine = `${title1}${title2}`
  const secondLine = `${title3}${title4}${title5}`
  const fullTitle = `${firstLine}\n${secondLine}`
  const [visibleTitle, setVisibleTitle] = useState("")

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      const motionTimer = window.setTimeout(() => setVisibleTitle(fullTitle), 0)
      return () => window.clearTimeout(motionTimer)
    }

    const characters = Array.from(fullTitle)
    let index = 0
    let deleting = false
    let timer: number | undefined

    const type = () => {
      index += deleting ? -1 : 1
      setVisibleTitle(characters.slice(0, index).join(""))

      if (!deleting && index === characters.length) {
        deleting = true
        timer = window.setTimeout(type, 3000)
        return
      }

      if (deleting && index === 0) {
        deleting = false
        timer = window.setTimeout(type, 700)
        return
      }

      timer = window.setTimeout(type, deleting ? 30 : 65)
    }

    timer = window.setTimeout(type, 400)
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [fullTitle])

  const visibleCharacters = Array.from(visibleTitle)
  const firstLineLength = Array.from(firstLine).length
  const title1Length = Array.from(title1).length
  const title3Length = Array.from(title3).length
  const visibleFirstLine = visibleCharacters.slice(0, firstLineLength).join("")
  const visibleSecondLine = visibleCharacters.slice(firstLineLength + 1).join("")
  const isOnSecondLine = visibleTitle.includes("\n")

  return (
    <h1
      aria-label={`${firstLine} ${secondLine}`}
      className="relative mt-6 text-4xl font-bold leading-tight sm:mt-8 sm:text-5xl lg:text-6xl font-(family-name:--font-sans)"
    >
      <span aria-hidden="true" className="invisible">
        {firstLine}<span className="block">{secondLine}</span>
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        <span className="text-[#0B2B66] dark:text-white">
          {visibleFirstLine.slice(0, title1Length)}
          {visibleFirstLine.slice(title1Length)}
        </span>
        {!isOnSecondLine && <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-[#0B2B66] align-[-0.06em] dark:bg-blue-400" />}
        <span className="block">
          <span className="text-[#0B2B66] dark:text-white">{visibleSecondLine.slice(0, title3Length)}</span>
          <span className="text-red-600 dark:text-red-400">{visibleSecondLine.slice(title3Length)}</span>
          {isOnSecondLine && <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-red-600 align-[-0.06em] dark:bg-red-400" />}
        </span>
      </span>
    </h1>
  )
}

export default function Banner() {

  const currentT = useTranslation();

  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* LEFT */}

          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <GlowButton onClick={() => {}}>
              {/* <div className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border bg-gradient-to-r from-primary-color/50 to-secondary-color/80 text-white border-blue-600/15 bg-blue-100 px-5 py-3 text-lg  dark:bg-gradient-to-r dark:from-primary-color dark:to-secondary-color dark:bg-clip-text dark:text-transparent font-bold shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:px-6 "> */}
              {/* <span className="mr-2 h-3 w-3 rounded-full bg-init-color "></span> */}
              {currentT.banner.freeLearning}
            </GlowButton>
            {/* <div className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border bg-gradient-to-r from-primary-color/50 to-secondary-color/80 text-white border-blue-600/15 bg-blue-100 px-5 py-3 text-lg  dark:bg-gradient-to-r dark:from-primary-color dark:to-secondary-color dark:bg-clip-text dark:text-transparent font-bold shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:px-6 ">
              <span className="mr-2 h-3 w-3 rounded-full bg-init-color "></span>
              {currentT.banner.freeLearning}
            </div> */}
              <Stats />
            </div>

            <TypingTitle
              key={`${currentT.banner.title1}-${currentT.banner.title2}`}
              title1={currentT.banner.title1}
              title2={currentT.banner.title2}
              title3={currentT.banner.title3}
              title4={currentT.banner.title4}
              title5={currentT.banner.title5}
            />

            <p className="mt-6 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 dark:text-gray-400">
              {currentT.banner.description}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">

              {/* Primary CTA Button */}
              <Link
                href="/courses"
                className="min-w-[12rem] lg:min-w-[16rem] rounded-full bg-[#0B2B66]  dark:text-white-800  px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-base font-semibold text-white hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors text-center"
              >
                {currentT.banner.start}
              </Link>

              {/* <button
                className="min-w-[8rem] lg:min-w-[10rem] rounded-[16px] border border-gray-300 dark:border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
              >
                {"</>"} {currentT.banner.explore}
              </button> */}
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end mt-5 lg:mt-0">
            <CodeWindow />
          </div>
        </div>

      </div>
    </section>

  )
}