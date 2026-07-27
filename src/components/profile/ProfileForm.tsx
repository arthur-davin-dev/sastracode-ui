"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";

export function ProfileForm({ profile }: { profile: UserProfile }) {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary-color">ព័ត៌មានទូទៅ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 ">
            <Label htmlFor="firstName" className="text-primary-color text-lg">
              នាមខ្លួន *
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className="text-primary-color text-lg">
              នាម *
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <p className="text-lg text-muted-foreground text-primary-color">
          ឈ្មោះរបស់អ្នកនឹងបង្ហាញនៅលើវិញ្ញាបនបត្រ
        </p>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-primary-color text-lg">
            អ៊ីមែល *
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <p className="text-lg text-muted-foreground text-primary-color">
          លេខទូរស័ព្ទ
        </p>

        <Button className="w-full text-lg text-white bg-indigo-950 hover:bg-indigo-900">
          ប្ដូរលេខសម្ងាត់
        </Button>
      </CardContent>
    </Card>
  );
}