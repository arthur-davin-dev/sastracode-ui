"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import {
  langToLocale,
  localeToLang,
  useLanguage,
} from "@/lib/language-context";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/service/profile-api";

/**
 * Keeps the app's i18n language and the signed-in user's `locale` in sync, in
 * both directions, using the existing language context and profile-update
 * endpoint:
 *
 *  - On login / reload, the saved `profile.locale` picks the UI language.
 *  - Afterwards, changing the language (navbar toggle, profile page selector)
 *    PATCHes `locale` back via `useUpdateMyProfileMutation`.
 *
 * Renders nothing. Mounted once under `LanguageProvider` in the root layout.
 */
export default function LocaleSync() {
  const { lang, setLang } = useLanguage();
  const { status } = useSession();

  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });
  const [updateProfile] = useUpdateMyProfileMutation();

  // The user we've already applied the server locale for. A later profile
  // refetch must not overwrite a language the user has since chosen.
  const restoredForRef = useRef<string | null>(null);

  // 1. Server -> UI: restore the saved language once per signed-in user.
  useEffect(() => {
    if (!profile) return;

    const key = profile.userId ?? "me";
    if (restoredForRef.current === key) return;
    restoredForRef.current = key;

    const savedLang = localeToLang(profile.locale);
    if (savedLang && savedLang !== lang) setLang(savedLang);
  }, [profile, lang, setLang]);

  // 2. UI -> server: persist a real language change after the initial restore.
  useEffect(() => {
    if (status !== "authenticated" || !profile) return;
    if (restoredForRef.current !== (profile.userId ?? "me")) return;

    if (localeToLang(profile.locale) === lang) return;

    updateProfile({ locale: langToLocale(lang) })
      .unwrap()
      .catch((error) => {
        console.error("Failed to persist locale preference:", error);
      });
  }, [lang, status, profile, updateProfile]);

  return null;
}
