"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Optional third-party libraries
import $ from "jquery";
import _ from "lodash";
import Dropzone from "dropzone";
import noUiSlider from "nouislider";
import DataTable from "datatables.net";
import { Calendar } from "vanilla-calendar-pro";

window.$ = $;
window.jQuery = $;
window._ = _;
window.Dropzone = Dropzone;
window.noUiSlider = noUiSlider;
window.DataTable = DataTable;
window.VanillaCalendarPro = Calendar;

// Preline UI
export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline").then(() => {
      window.HSStaticMethods?.autoInit?.();
    });
  }, [path]);

  return null;
}