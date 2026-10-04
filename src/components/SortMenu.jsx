"use client";

import { useState, useRef, useEffect } from "react";

export default function SortMenu({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const current = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    if (!open) return;
    const selected = menuRef.current?.querySelector('[aria-checked="true"]');
    selected?.focus();

    function handlePointer(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [open]);

  function choose(next) {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKey(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function handleMenuKey(e) {
    const items = [...menuRef.current.querySelectorAll('[role="menuitemradio"]')];
    const index = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length].focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKey}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-surface text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="text-muted">Sort:</span>
        {current.label}
        <span aria-hidden="true" className="text-xs text-muted">▾</span>
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={handleMenuKey}
          className="absolute right-0 z-30 mt-2 w-44 py-1 rounded-xl border border-gray-200 dark:border-white/10 bg-surface shadow-card"
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="menuitemradio"
              aria-checked={o.value === value}
              onClick={() => choose(o.value)}
              className={`w-full text-left px-4 py-2 text-sm transition focus:outline-none focus:bg-primary/10 hover:bg-primary/10 ${
                o.value === value ? "text-primary font-semibold" : "text-ink"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
