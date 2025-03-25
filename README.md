# RISE Platform

RISE is an AI-powered data analytics platform tailored for startups, investors, and executives in the Saudi market. It converts raw business data into actionable insights, enabling users to drive business growth and seize new opportunities.

## Important: Deployment Note

This repository uses a directory isolation approach for deployment:

- **Main Application**: Located in the `/rise-platform` directory
- **Template Files**: The materialm-react-admin files in the root are templates only

## Deployment Instructions

### Vercel Deployment (Recommended)

1. Set up your Vercel project:
   ```bash
   vercel --cwd rise-platform
   ```

2. For production deployments:
   ```bash
   vercel --prod --cwd rise-platform
   ```

3. **Important**: In Vercel project settings:
   - Set the "Root Directory" to `rise-platform`
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `OPENAI_API_KEY`

### Local Development

Only work in the rise-platform directory:

```bash
cd rise-platform
npm install
npm run dev
```

### Building the Project

Always build from the rise-platform directory:

```bash
cd rise-platform
npm run build
```

## Features

- Real-time dashboards with key performance indicators
- AI-driven recommendations and insights
- Investor-startup matching algorithms
- Secure data handling compliant with Saudi regulations

## Tech Stack

- Next.js 15 with App Router
- Supabase for backend
- OpenAI integration
- React + TypeScript
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 10.2.3 or later
- A Supabase account
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rise-platform.git
   cd rise-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and connect your GitHub account
3. Import your repository
4. Configure your environment variables
5. Deploy

### Traditional Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

### Environment Variables

Ensure these environment variables are set in your deployment:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXT_PUBLIC_APP_URL`: Your application's URL (in production)

## Database Setup

The application uses Supabase for database management. You'll need to set up the following tables:

1. profiles
2. startup_profiles
3. investor_profiles
4. matches
5. analyses

Detailed SQL setup scripts are available in the `/docs/database` directory.

## Security Considerations

- API keys should never be exposed to clients
- Use Supabase RLS (Row Level Security) policies
- Implement proper user authentication and authorization
- Regularly update dependencies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Saudi Vision 2030 for inspiring economic diversification
- Next.js team for the amazing framework
- Supabase for the powerful backend infrastructure 