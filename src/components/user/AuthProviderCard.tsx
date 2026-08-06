import { Card, CardContent } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthProviderCard() {
  return (
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg overflow-hidden transition-all duration-300">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
        
        {/* Left Side: Icon & Status Text */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-400/20 text-yellow-600 rounded-2xl shrink-0">
            <KeyRound size={28} className="text-primary-color" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-primary-color tracking-tight">
              ការគ្រប់គ្រងសិទ្ធិ Keycloak
            </h2>
            <div className="flex items-center gap-2 mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>ស្ថានភាពការតភ្ជាប់: បានភ្ជាប់ (Connected)</span>
              <span className="text-primary-color opacity-60 font-medium">
                · Realm: Master-LMS-Auth
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <Button
          variant="outline"
          className="text-lg font-extrabold text-red-600 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border-2 border-red-200/60 dark:border-red-800/60 rounded-2xl px-6 py-3 h-auto transition-all shadow-sm"
        >
          ការកំណត់សិទ្ធិ
        </Button>
      </CardContent>
    </Card>
  );
}