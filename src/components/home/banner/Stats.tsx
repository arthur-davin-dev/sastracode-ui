// Stats.tsx
export default function Stats() {
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
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">101+</h3>
        <p className="text-gray-500 dark:text-gray-400">មេរៀន</p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400">
          99.9%
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          ការពេញចិត្ត
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          0$
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          គិតថ្លៃ
        </p>
      </div>

    </div>
  );
}