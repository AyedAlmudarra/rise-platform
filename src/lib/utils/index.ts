import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS classes with Tailwind utilities
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Format as "Month Day, Year"
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format currency amounts
 */
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculate profile completion percentage
 */
export function calculateProfileCompletion(profile: any, requiredFields: string[], optionalFields: string[] = []): number {
  if (!profile) return 0;
  
  let completed = 0;
  let total = requiredFields.length;
  
  // Count required fields
  for (const field of requiredFields) {
    if (profile[field] !== undefined && profile[field] !== null && profile[field] !== '') {
      completed++;
    }
  }
  
  // Count optional fields
  if (optionalFields.length > 0) {
    let optionalCompleted = 0;
    for (const field of optionalFields) {
      if (profile[field] !== undefined && profile[field] !== null && profile[field] !== '') {
        optionalCompleted++;
      }
    }
    
    // Optional fields contribute to the percentage but with less weight
    completed += (optionalCompleted / optionalFields.length) * requiredFields.length * 0.5;
    total += requiredFields.length * 0.5;
  }
  
  return Math.round((completed / total) * 100);
}

/**
 * Debounce function to limit the rate at which a function is called
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Filter and sort matches based on compatibility score
 */
export function processMatches(matches: any[], minScore: number = 0): any[] {
  if (!matches || !Array.isArray(matches)) return [];
  
  return matches
    .filter(match => match.compatibility_score >= minScore)
    .sort((a, b) => b.compatibility_score - a.compatibility_score);
}

/**
 * Safely access nested object properties
 */
export function getNestedValue(obj: any, path: string, defaultValue: any = undefined): any {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null || !Object.hasOwn(current, key)) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current === undefined ? defaultValue : current;
}

/**
 * Convert file size in bytes to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
} 