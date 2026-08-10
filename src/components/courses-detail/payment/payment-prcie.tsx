import type { Course } from "@/lib/course/courses";


export interface CoursePricing {
  currency: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
  savedAmount: number;
}

export function getCoursePricing(
  course: Course,
): CoursePricing {
  const currency = course.currency ?? "USD";

  const price = course.price ?? 0;

  const courseDiscount = course.discount ?? 0;

  /*
   * If originalPrice exists and is greater than price,
   * assume backend/frontend already calculated final price.
   */
  if (
    course.originalPrice !== undefined &&
    course.originalPrice > price
  ) {
    const originalPrice = course.originalPrice;
    const finalPrice = price;

    const calculatedDiscount =
      originalPrice > 0
        ? ((originalPrice - finalPrice) /
            originalPrice) *
          100
        : 0;

    return {
      currency,
      originalPrice,
      finalPrice,
      discount:
        courseDiscount > 0
          ? courseDiscount
          : Math.round(calculatedDiscount),
      savedAmount:
        originalPrice - finalPrice,
    };
  }

  /*
   * If backend gives:
   * price = 50
   * discount = 20
   *
   * finalPrice becomes 40
   */
  if (courseDiscount > 0) {
    const originalPrice = price;

    const savedAmount =
      (originalPrice * courseDiscount) /
      100;

    const finalPrice =
      originalPrice - savedAmount;

    return {
      currency,
      originalPrice,
      finalPrice,
      discount: courseDiscount,
      savedAmount,
    };
  }

  return {
    currency,
    originalPrice: price,
    finalPrice: price,
    discount: 0,
    savedAmount: 0,
  };
}