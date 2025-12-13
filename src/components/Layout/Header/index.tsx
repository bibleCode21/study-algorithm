import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            알고리즘 정리
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              홈
            </Link>
            <Link 
              href="/concept" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              개념
            </Link>
            <Link 
              href="/practice" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              문제 풀이
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

