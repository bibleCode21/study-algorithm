import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // 성능 최적화 설정
  compress: true, // gzip 압축 활성화
  poweredByHeader: false, // X-Powered-By 헤더 제거 (보안 및 성능)
  
  // 실험적 기능
  experimental: {
    optimizePackageImports: ['@monaco-editor/react', 'shiki'], // 패키지 임포트 최적화
  },
  
  webpack: (config, { isServer }) => {
    // 클라이언트 사이드에서 typescript 패키지 사용을 위한 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // 번들 최적화: 큰 라이브러리들을 별도 청크로 분리
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            monaco: {
              test: /[\\/]node_modules[\\/]@monaco-editor[\\/]/,
              name: 'monaco',
              priority: 10,
              reuseExistingChunk: true,
            },
            shiki: {
              test: /[\\/]node_modules[\\/]shiki[\\/]/,
              name: 'shiki',
              priority: 10,
              reuseExistingChunk: true,
            },
            typescript: {
              test: /[\\/]node_modules[\\/]typescript[\\/]/,
              name: 'typescript',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  turbopack: {
    // Turbopack 설정 (필요시 추가)
  },
};

export default nextConfig;
