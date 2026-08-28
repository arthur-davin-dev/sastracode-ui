"use client"

import { useEffect, useState } from "react"
import Stats from "./Stats"
import CodeWindow from "./CodeWindow"
import { useTranslation } from "@/hooks/useTranslations"
import Link from "next/link"
import GlowButton from "@/components/ui/GlowButton"

type BannerTitle = {
  title1: string
  title2: string
  title3: string
  title4: string
  title5: string
}

function TypingTitle({
  title1,
  title2,
  title3,
  title4,
  title5,
}: BannerTitle) {
  const firstLine = `${title1}${title2}`
  const secondLine = `${title3}${title4}${title5}`

  const [visibleSecondLine, setVisibleSecondLine] = useState("")

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reduceMotion) {
      const motionTimer = window.setTimeout(
        () => setVisibleSecondLine(secondLine),
        0
      )

      return () => window.clearTimeout(motionTimer)
    }

    const characters = Array.from(secondLine)
    let index = 0
    let deleting = false
    let timer: number | undefined

    const type = () => {
      index += deleting ? -1 : 1

      setVisibleSecondLine(
        characters.slice(0, index).join("")
      )

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

      timer = window.setTimeout(
        type,
        deleting ? 30 : 65
      )
    }

    timer = window.setTimeout(type, 400)

    return () => {
      if (timer) {
        window.clearTimeout(timer)
      }
    }
  }, [secondLine])

  const title3Length = Array.from(title3).length

  return (
    <h1
      aria-label={`${firstLine} ${secondLine}`}
      className="
        relative
        mt-6
        sm:mt-8
        text-[48px]
        font-bold
        leading-tight
        font-(family-name:--font-sans)
      "
    >
      {/* Invisible text keeps the layout height stable */}
      <span aria-hidden="true" className="invisible">
        {firstLine}
        <span className="block">
          {secondLine}
        </span>
      </span>

      {/* Visible animated text */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
      >
        {/* First line - Static */}
        <span className="text-primary-color">
          {firstLine}
        </span>

        {/* Second line - Typing animation */}
        <span className="block">
          {/* Normal color */}
          <span className="text-primary-color">
            {visibleSecondLine.slice(
              0,
              title3Length
            )}
          </span>

          {/* Red color */}
          <span className="text-secondary-color">
            {visibleSecondLine.slice(title3Length)}
          </span>

          {/* Typing cursor */}
          <span
            className="
              ml-1
              inline-block
              h-[0.9em]
              w-[3px]
              animate-pulse
              bg-red-600
              align-[-0.06em]
              dark:bg-red-400
            "
          />
        </span>
      </span>
    </h1>
  )
}

export default function Banner() {
  const currentT = useTranslation()

  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-20 lg:px-8 lg:pb-10 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <div className="text-center lg:text-left">

            {/* Badge + Stats */}
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <GlowButton onClick={() => {}}>
                {currentT.banner.freeLearning}
              </GlowButton>

              <Stats />
            </div>

            {/* TITLE */}
            <TypingTitle
              key={`${currentT.banner.title1}-${currentT.banner.title2}`}
              title1={currentT.banner.title1}
              title2={currentT.banner.title2}
              title3={currentT.banner.title3}
              title4={currentT.banner.title4}
              title5={currentT.banner.title5}
            />

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                mx-auto
                max-w-xl
                !text-[20px]
                sm:!text-[24px]
                leading-7
                text-gray-500
                dark:text-gray-400
                sm:mt-8
                sm:leading-8
                lg:mx-0
              "
            >
              {currentT.banner.description}
            </p>

            {/* CTA */}
            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-4
                sm:mt-10
                sm:flex-row
                lg:justify-start
              "
            >
              <Link
                href="/courses"
                className="
                  min-w-[12rem]
                  rounded-full
                  bg-[#0B2B66]
                  px-6
                  py-3
                  text-center
                  text-xs
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-blue-900
                  dark:hover:bg-blue-700
                  sm:min-w-[16rem]
                  sm:px-10
                  sm:py-4
                  sm:text-base
                "
              >
                {currentT.banner.start}
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-5 flex justify-center lg:mt-0 lg:justify-end">
            <CodeWindow />
          </div>

        </div>
      </div>
    </section>
  )
}