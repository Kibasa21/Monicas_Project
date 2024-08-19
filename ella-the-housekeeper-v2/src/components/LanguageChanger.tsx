'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import * as React from "react"
import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

export default function LanguageChanger({className}:{className: string}) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: string) => {
    const newLocale = value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className={className}>
      <Select defaultValue={currentLocale} onValueChange={handleChange}>
        <SelectTrigger className="w-14 border-none">
          <SelectValue placeholder="en" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">en</SelectItem>
          <SelectItem value="pt-BR">pt</SelectItem>
          <SelectItem value="de">de</SelectItem>
          <SelectItem value="fr">fr</SelectItem>
        </SelectContent>
      </Select>
    </div>
    // <select onChange={handleChange} value={currentLocale}>
    //   <option value="en">English</option>
    //   <option value="pt-BR">Português Brasileiro</option>
    //   <option value="de">Deutsch</option>
    //   <option value="fr">Français</option>
    // </select>
  );
}