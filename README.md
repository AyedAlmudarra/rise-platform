# RISE AI Platform

RISE is an AI-powered platform designed for the Saudi startup ecosystem, enabling startups and investors to connect and make data-driven decisions.

## Features

- **AI-Powered Matching**: Connects startups with suitable investors using advanced algorithms
- **Comprehensive Analytics**: Provides actionable insights based on business metrics
- **Secure Communication**: Built-in messaging system for seamless collaboration
- **Role-Based Access**: Tailored experiences for startups, investors, and administrators
- **Profile Management**: Detailed profile creation with industry-specific metrics

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **AI/ML**: OpenAI API integration
- **Authentication**: Supabase Auth
- **Data Visualization**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rise-platform.git
cd rise-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - Reusable UI components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and shared code
- `/src/styles` - Global styles and Tailwind configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Saudi Vision 2030 for inspiring economic diversification
- Next.js team for the amazing framework
- Supabase for the powerful backend infrastructure 