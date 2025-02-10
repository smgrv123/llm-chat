'use client';

import Logger from '@/src/lib/Logger';
import { Check, Clipboard } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface CodeBlockWithCopyProps {
  children: ReactNode;
  language: string;
}

const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let codeToClipboard = '';
      const extractTextContent = (node: string | ReactNode | ReactNode[]): string => {
        if (typeof node === 'string') {
          return node;
        }
        if (Array.isArray(node)) {
          return node.map(extractTextContent).join('');
        }
        if (node && typeof node === 'object' && 'props' in node && node.props?.children) {
          return extractTextContent(node.props.children);
        }
        return '';
      };
      codeToClipboard = extractTextContent(children);
      codeToClipboard = codeToClipboard.replace(/^```\w*\n?|\n?```$/g, '').trim();

      await navigator.clipboard.writeText(codeToClipboard);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      Logger.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="relative px-2 py-4 bg-[#130215] rounded-md my-2">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 border-none hover:opacity-80 transition-opacity"
        aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
      >
        {isCopied ? <Check size={20} /> : <Clipboard size={20} />}
      </button>
      {language}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlockWithCopy;
