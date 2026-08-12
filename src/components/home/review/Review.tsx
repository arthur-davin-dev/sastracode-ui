"use client"

import * as React from "react"
import { Star } from 'lucide-react';

export default function Review() {
    return (

        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10">
            <div className="mx-auto max-w-7xl text-center mb-12">
                <span className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-navy dark:text-blue-300 transition-colors duration-300">
                    មតិយោបល់ពីសិស្ស
                </span>
                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                    <span className="text-[#0d1b3e] dark:text-white">សិស្សរបស់យើង </span>
                    <span className="gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
                        និយាយអ្វីខ្លះ
                    </span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-khmer text-base leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300">
                    មតិយោបល់ពិតពីសិស្សដែលបានផ្លាស់ប្តូរអាជីពរបស់ពួកគេ
                </p>
            </div>

            {/* Carousel */}
            <div
                id="hs-carousel"
                className="relative px-8 sm:px-12"
                data-hs-carousel='{
      "loadingClasses": "opacity-0", 
      "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", 
      "isAutoPlay": true,
      "slidesQty": {"xs": 1, "sm": 2, "lg": 3}
    }'
            >
                <div className="hs-carousel relative w-full min-h-96 overflow-hidden">
                    {/* Carousel Body */}
                    <div className="hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 opacity-0">

                        {/* Review 1 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «វេទិកានេះបានផ្លាស់ប្តូរដំណើរសិក្សាកូដរបស់ខ្ញុំទាំងស្រុង។ វគ្គសិក្សាត្រូវបានរៀបចំយ៉ាងល្អ ហើយគ្រូបង្រៀនពិតជាអស្ចារ្យ។ ពីមុនខ្ញុំមិនចេះអ្វីសោះ ប៉ុន្តែក្នុងរយៈពេលត្រឹមតែ ៦ ខែ ខ្ញុំទទួលបានការងារក្នុងក្តីស្រមៃរបស់ខ្ញុំ!»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                            JD
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">ចន ដូ</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">វិស្វករកម្មវិធីនៅ Google</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «គម្រោងអនុវត្តផ្ទាល់ និងឧទាហរណ៍ជាក់ស្តែងបានធ្វើឱ្យការសិក្សាមានភាពខុសប្លែក។ ទីបំផុត ខ្ញុំអាចយល់ពីគោលគំនិតដែលធ្លាប់ពិបាកអស់ជាច្រើនឆ្នាំ។ ខ្ញុំសូមណែនាំវេទិកានេះដល់អ្នកដែលចង់រៀនកូដយ៉ាងពិតប្រាកដ។»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                                            SM
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">សារ៉ា មីឆែល</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">អ្នកអភិវឌ្ឍន៍ Full Stack</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «ដំបូងខ្ញុំមានការស្ទាក់ស្ទើរ ប៉ុន្តែបន្ទាប់ពីរៀនបានតែមួយវគ្គ ខ្ញុំចាប់អារម្មណ៍យ៉ាងខ្លាំង។ ការគាំទ្រពីសហគមន៍ និងការណែនាំពីអ្នកជំនាញពិតជាល្អឥតខ្ចោះ។ នេះជាការវិនិយោគដ៏ល្អបំផុតសម្រាប់អាជីពរបស់ខ្ញុំ។»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            AK
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">អាឡិច គូម៉ារ</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">អ្នកវិទ្យាសាស្ត្រទិន្នន័យនៅ Amazon</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review 4 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «វគ្គ DSA បានផ្លាស់ប្តូរការត្រៀមសម្ភាសន៍របស់ខ្ញុំទាំងស្រុង។ ពីការធ្លាក់សម្ភាសន៍សរសេរកូដ ខ្ញុំអាចឆ្លងកាត់បានយ៉ាងល្អ។ គ្រូបង្រៀនបានបំបែកប្រធានបទស្មុគស្មាញទៅជាមេរៀនសាមញ្ញ និងងាយយល់។»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                                            MR
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">ម៉ារីយ៉ា រ៉ូឌ្រីហ្គេស</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">អ្នកអភិវឌ្ឍន៍ជាន់ខ្ពស់នៅ Microsoft</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review 5 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «ខ្ញុំចូលចិត្តវិធីសាស្ត្របង្រៀនដែលផ្តោតលើការអនុវត្ត។ គ្រប់គោលគំនិតត្រូវបានបង្រៀនជាមួយការអនុវត្តជាក់ស្តែង។ ការណែនាំអាជីព និងការពិនិត្យប្រវត្តិរូបបានជួយឱ្យខ្ញុំទទួលបានឱកាសសម្ភាសន៍នៅក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខ។»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                            TL
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">ថម លី</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">វិស្វករ Backend នៅ Stripe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review 6 */}
                        <div className="hs-carousel-slide px-3">
                            <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col h-full">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
                                        «ចំណុចល្អបំផុតគឺសហគមន៍។ អ្នកមិននៅឯកាក្នុងដំណើរសិក្សារបស់អ្នកឡើយ។ វេទិកាពិភាក្សា និងមតិយោបល់ពីមិត្តរួមសិក្សា ជួយពង្រឹងការយល់ដឹង និងបង្កើនទំនុកចិត្ត។»
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                                            EW
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">អេមីលី វ៉ាង</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">អ្នកគ្រប់គ្រងផលិតផលនៅ Meta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Carousel Body */}
                </div>

                {/* Arrows with more spacing */}
                <button
                    type="button"
                    className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 -left-4 sm:-left-6 md:-left-8 lg:-left-10 inline-flex justify-center items-center size-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 -translate-y-1/2 focus:outline-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 z-10"
                >
                    <span className="text-2xl" aria-hidden="true">
                        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </span>
                    <span className="sr-only">មុន</span>
                </button>

                <button
                    type="button"
                    className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 -right-4 sm:-right-6 md:-right-8 lg:-right-10 inline-flex justify-center items-center size-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 -translate-y-1/2 focus:outline-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 z-10"
                >
                    <span className="sr-only">បន្ទាប់</span>
                    <span className="text-2xl" aria-hidden="true">
                        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </button>
                {/* End Arrows */}

                {/* Pagination with more spacing */}
                <div className="hs-carousel-pagination flex justify-center absolute -bottom-8 inset-s-0 inset-e-0 flex gap-x-3"></div>
                {/* End Pagination */}
            </div>
            {/* End Carousel */}
        </section>
    )
}

// interface Review {
//     id: number;
//     name: string;
//     role: string;
//     company: string;
//     review: string;
//     rating: number;
//     initials: string;
//     gradient: string;
// }

// const reviewsData: Review[] = [
//     {
//         id: 1,
//         name: "John Doe",
//         role: "Software Engineer",
//         company: "Google",
//         review: "This platform completely transformed my coding journey. The courses are well-structured and the instructors are amazing.",
//         rating: 5,
//         initials: "JD",
//         gradient: "from-blue-500 to-purple-500"
//     },
//     // ... more reviews
// ];

// // Then in your component:
// const ReviewCard = ({ review }: { review: Review }) => (
//     <div className="hs-carousel-slide px-3">
//         <div className="flex justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className="flex flex-col h-full">
//                 <div className="flex gap-1 mb-3">
//                     {[...Array(review.rating)].map((_, i) => (
//                         <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                     ))}
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex-1">
//                     "{review.review}"
//                 </p>
//                 <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
//                     <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${review.gradient} flex items-center justify-center text-white font-bold text-lg`}>
//                         {review.initials}
//                     </div>
//                     <div>
//                         <h4 className="font-semibold text-gray-800 dark:text-white">{review.name}</h4>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">{review.role} at {review.company}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// // Then map through the data:
// <div className="hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 opacity-0">
//     {reviewsData.map((review) => (
//         <ReviewCard key={review.id} review={review} />
//     ))}
// </div>
