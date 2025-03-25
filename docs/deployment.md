# RISE Platform Deployment Guide

This guide provides step-by-step instructions for deploying the RISE platform to various environments.

## Prerequisites

Before deploying, ensure you have:

1. A Supabase account and project set up
2. An OpenAI API key
3. A GitHub account (for Vercel deployment)
4. Node.js 18.17.0+ and npm 10.2.3+ installed

## Database Setup

1. Log into your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to your project
3. Go to the SQL Editor
4. Copy and paste the SQL from `docs/database/schema.sql`
5. Run the SQL queries to create all necessary tables and security policies

## Environment Variables

Ensure these environment variables are set in your deployment:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=your_app_url_in_production
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select your repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (if your project is in the root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add the environment variables listed above
6. Click "Deploy"

### Option 2: Traditional Server Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

3. For production-grade deployment, consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "rise-platform" -- start
   pm2 save
   ```

4. Set up a reverse proxy using Nginx:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

5. Secure your site with SSL using Let's Encrypt

### Option 3: Docker Deployment

1. Create a Dockerfile in your project root:
   ```Dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. Update your `next.config.js` to add:
   ```javascript
   module.exports = {
     // ...other config
     output: 'standalone',
   };
   ```

3. Build and run the Docker image:
   ```bash
   docker build -t rise-platform .
   docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=your_url -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key -e OPENAI_API_KEY=your_key rise-platform
   ```

## Post-Deployment Steps

1. Test the application thoroughly
2. Set up monitoring and alerting
3. Configure analytics
4. Create backup strategies for the database
5. Document any custom deployment configurations

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**: Check that all required environment variables are set
2. **Database Connection Errors**: Verify Supabase URL and key are correct
3. **Build Failures**: Ensure all dependencies are installed and there are no TypeScript errors
4. **CORS Issues**: Check Supabase CORS settings if API requests fail

### Support

For deployment support, contact the development team at support@example.com 