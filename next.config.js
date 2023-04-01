if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
  throw new Error('One or more required environment variables are not defined.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    
    // In order for webpack to build wikijs properly, you must add an option to your webpack configuration file:
    config.externals = {
      'isomorphic-fetch': 'fetch',
    'aws-sdk': 'aws-sdk',
      'mock-aws-s3':'mock-aws-s3',
    /*  'nock': 'nock',
      '@huggingface/inference':'@huggingface/inference',
      'cohere-ai':'cohere-ai',
      '@dqbd/tiktoken':'@dqbd/tiktoken',
      'chromadb':'chromadb',
      'hnswlib-node':'hnswlib-node',
      'node-gyp':'node-gyp'*/
    }
    return config;
  },
};

export default nextConfig;
