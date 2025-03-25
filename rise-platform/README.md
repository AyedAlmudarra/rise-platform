# RISE Platform

RISE is an AI-powered data analytics platform tailored for startups, investors, and executives in the Saudi market. It converts raw business data into actionable insights, enabling users to drive business growth and seize new opportunities.

## Features

- Real-time dashboards
- AI-driven recommendations
- Investor matching algorithms
- Secure data handling compliant with local regulations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rise-platform.git
cd rise-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server
```bash
npm run dev
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the required environment variables
4. Deploy

### Custom Server

1. Build the application
```bash
npm run build
```

2. Start the production server
```bash
npm run start
```

You can also use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "rise-platform" -- start
```

## Security Considerations

- Never commit `.env.local` files to version control
- Ensure proper authentication and authorization
- Regularly update dependencies for security patches

## License

This project is proprietary and confidential.
