"use client";

import { useEffect } from "react";
import { toKhmerNumerals } from "@/lib/khmer-numerals";

const EXCLUDED_SELECTOR = [
  "code",
  "pre",
  "kbd",
  "samp",
  "script",
  "style",
  "textarea",
  "input",
  "[contenteditable='true']",
  "[data-latin-numerals]",
].join(",");

function shouldConvert(node: Text): boolean {
  const parent = node.parentElement;
  return Boolean(parent && !parent.closest(EXCLUDED_SELECTOR) && /\d/.test(node.data));
}

function convertTextNode(node: Text) {
  if (shouldConvert(node)) node.data = toKhmerNumerals(node.data);
}

function convertTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    convertTextNode(root as Text);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    convertTextNode(node as Text);
    node = walker.nextNode();
  }
}

export default function KhmerNumerals() {
  useEffect(() => {
    convertTree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          convertTextNode(mutation.target as Text);
          continue;
        }

        mutation.addedNodes.forEach(convertTree);
      }
    });

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
