"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface FormState {
  fullName: string;
  email: string;
  country: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardName: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  // Selected payment method state
  const [paymentMethod, setPaymentMethod] = useState<string>("visa");

  // Input fields state
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    country: "Cambodia",
    cardNumber: "",
    expDate: "",
    cvv: "",
    cardName: "",
  });

  // Field validation errors state
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error for the current field as the user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  // Accept nullable value and optional event details to match Select's onValueChange signature
  const handleSelectChange = (value: string | null, _eventDetails?: any) => {
    if (value === null) return;
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 1. Billing Info Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // 2. Card Validation (Only validate if paying via Card)
    const isCardPayment =
      paymentMethod === "visa" || paymentMethod === "mastercard";

    if (isCardPayment) {
      const sanitizedCardNum = formData.cardNumber.replace(/\s+/g, "");
      if (!sanitizedCardNum) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(sanitizedCardNum)) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!formData.expDate.trim()) {
        newErrors.expDate = "Expiration required";
      } else if (!expRegex.test(formData.expDate)) {
        newErrors.expDate = "Use MM/YY format";
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid: Navigate to success page or submit payload to backend
      router.push("/success");
    }
  };

  const isCardPayment =
    paymentMethod === "visa" || paymentMethod === "mastercard";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 mt-5">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl border-slate-200">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: Form Section */}
              <div className="md:col-span-7 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                {/* Billing Information */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary-color">
                    ព័ត៌មាន​អំពី​វិក្កយបត្រ
                  </h3>
                  <div className="space-y-2 text-primary-color">
                    <Label htmlFor="fullName">ឈ្មោះពេញ</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={
                        errors.fullName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-primary-color">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={
                        errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Country Selection Dropdown */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-slate-700 font-medium"
                    >
                      Country
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger
                        id="country"
                        className="w-full bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-blue-600"
                      >
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>

                      {/* z-50 ensures the dropdown renders properly above other elements */}
                      <SelectContent className="bg-white border border-slate-200 shadow-md z-50">
                        <SelectItem
                          value="Cambodia"
                          className="text-slate-900 cursor-pointer focus:bg-slate-100 focus:text-slate-900"
                        >
                          Cambodia
                        </SelectItem>
                        <SelectItem
                          value="United States"
                          className="text-slate-900 cursor-pointer focus:bg-slate-100 focus:text-slate-900"
                        >
                          United States
                        </SelectItem>
                        <SelectItem
                          value="United Kingdom"
                          className="text-slate-900 cursor-pointer focus:bg-slate-100 focus:text-slate-900"
                        >
                          United Kingdom
                        </SelectItem>
                        <SelectItem
                          value="Other"
                          className="text-slate-900 cursor-pointer focus:bg-slate-100 focus:text-slate-900"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </section>

                <Separator className="my-6" />

                {/* Payment Method */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary-color">
                    វិធីសាស្ត្រទូទាត់
                  </h3>

                  <RadioGroup
                    defaultValue="visa"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-slate-50 has-checked:border-blue-600 has-checked:bg-blue-50/20">
                      <RadioGroupItem value="visa" id="visa" />
                      <Label
                        htmlFor="visa"
                        className="cursor-pointer font-medium text-primary-color"
                      >
                        Visa
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-slate-50 has-checked:border-blue-600 has-checked:bg-blue-50/20">
                      <RadioGroupItem value="mastercard" id="mastercard" />
                      <Label
                        htmlFor="mastercard"
                        className="cursor-pointer font-medium text-primary-color"
                      >
                        Mastercard
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-slate-50 has-checked:border-blue-600 has-checked:bg-blue-50/20">
                      <RadioGroupItem value="aba" id="aba" />
                      <Label
                        htmlFor="aba"
                        className="cursor-pointer font-medium text-primary-color"
                      >
                        ABA KHQR
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-slate-50 has-checked:border-blue-600 has-checked:bg-blue-50/20">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label
                        htmlFor="paypal"
                        className="cursor-pointer font-medium text-primary-color"
                      >
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Dynamic Fields: Card Details */}
                  {isCardPayment ? (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2 text-primary-color">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9101 1121"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={
                            errors.cardNumber
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-red-500 font-medium">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-primary-color">
                          <Label htmlFor="expDate">MM / YY</Label>
                          <Input
                            id="expDate"
                            placeholder="MM / YY"
                            value={formData.expDate}
                            onChange={handleInputChange}
                            className={
                              errors.expDate
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }
                          />
                          {errors.expDate && (
                            <p className="text-xs text-red-500 font-medium">
                              {errors.expDate}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 text-primary-color">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            maxLength={4}
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={
                              errors.cvv
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }
                          />
                          {errors.cvv && (
                            <p className="text-xs text-red-500 font-medium">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-primary-color">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={
                            errors.cardName
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }
                        />
                        {errors.cardName && (
                          <p className="text-xs text-red-500 font-medium">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-600 text-center mt-4">
                      {paymentMethod === "aba"
                        ? "You will be prompted to scan a KHQR code to complete payment."
                        : "You will be redirected to PayPal to complete your purchase."}
                    </div>
                  )}
                </section>
              </div>

              {/* Right Column: Course Summary */}
              <div className="md:col-span-5 p-6 md:p-8 bg-slate-50/80 flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Course Summary
                  </h3>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <h4 className="font-semibold text-slate-900">
                      HTML Fundamentals
                    </h4>
                    <ul className="text-sm space-y-1 text-slate-600">
                      <li>
                        <span className="font-medium text-slate-800">
                          Level:
                        </span>{" "}
                        Beginner
                      </li>
                      <li>
                        <span className="font-medium text-slate-800">
                          Lessons:
                        </span>{" "}
                        28 Lessons
                      </li>
                      <li>
                        <span className="font-medium text-slate-800">
                          Includes:
                        </span>{" "}
                        Certificate
                      </li>
                    </ul>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Price</span>
                      <span className="font-medium">$12.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-medium">-$2.00</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span>$10.00</span>
                    </div>

                    <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                      <p className="mb-3 text-sm font-medium text-slate-700">
                        Scan to complete payment
                      </p>
                      <img
                        src="/assets/images/QR.png"
                        alt="Payment QR Code"
                        className="mx-auto h-40 w-40 object-contain"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6 bg-primary-color hover:bg-blue-700 h-11 text-base font-semibold"
                >
                  Complete Payment
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
