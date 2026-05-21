'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = preRef.current?.textContent ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        aria-label="Copier le code"
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100
                   flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium
                   bg-slate-700 hover:bg-slate-600 text-slate-200
                   transition-all duration-200 active:scale-95"
      >
        {copied ? (
          <>
            <Check size={12} className="text-green-400" />
            Copié
          </>
        ) : (
          <>
            <Copy size={12} />
            Copier
          </>
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
