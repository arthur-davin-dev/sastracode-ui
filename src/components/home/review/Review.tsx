"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Star, User } from 'lucide-react'; // or use your preferred icon library

export default function Review() {
    return (

        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10">
            <div className="mx-auto max-w-7xl text-center mb-12">
                <span className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-navy dark:text-blue-300 transition-colors duration-300">
                    Testimonials
                </span>
                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                    <span className="text-[#0d1b3e] dark:text-white">What Our </span>
                    <span className="gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
                        Students Say
                    </span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-khmer text-base leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300">
                    Real reviews from real learners who transformed their careers
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
                                        "This platform completely transformed my coding journey. The courses are well-structured and the instructors are amazing. I went from knowing nothing to landing my dream job in just 6 months!"
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                            JD
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">John Doe</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer at Google</p>
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
                                        "The hands-on projects and real-world examples made all the difference. I finally understand concepts that I struggled with for years. Highly recommended for anyone serious about coding."
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                                            SM
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">Sarah Mitchell</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
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
                                        "I was skeptical at first, but after taking just one course, I was hooked. The community support and mentorship are unmatched. This is the best investment I've made in my career."
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            AK
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">Alex Kumar</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Data Scientist at Amazon</p>
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
                                        "The DSA course was a game-changer for my interview prep. I went from failing coding interviews to acing them. The instructors break down complex topics into simple, digestible lessons."
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                                            MR
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">Maria Rodriguez</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Senior Developer at Microsoft</p>
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
                                        "I love the practical approach. Every concept is taught with real-world applications. The career guidance and resume reviews helped me land interviews at top tech companies."
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                            TL
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">Tom Lee</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Backend Engineer at Stripe</p>
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
                                        "The best part is the community. You're never alone in your learning journey. The discussion forums and peer reviews help reinforce concepts and build confidence."
                                    </p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                                            EW
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white">Emily Wang</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager at Meta</p>
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
                    <span className="sr-only">Previous</span>
                </button>

                <button
                    type="button"
                    className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 -right-4 sm:-right-6 md:-right-8 lg:-right-10 inline-flex justify-center items-center size-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 -translate-y-1/2 focus:outline-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 z-10"
                >
                    <span className="sr-only">Next</span>
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
