import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export interface MatchCardProps {
  className?: string;
  name: string;
  description?: string;
  compatibilityScore: number;
  matchReasons: string[];
  status: 'pending' | 'accepted' | 'rejected';
  onAccept?: () => void;
  onReject?: () => void;
  profileType: 'startup' | 'investor'; 
}

const MatchCard: React.FC<MatchCardProps> = ({
  className,
  name,
  description,
  compatibilityScore,
  matchReasons,
  status,
  onAccept,
  onReject,
  profileType,
}) => {
  // Get the status badge style
  const getStatusBadge = () => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Get the text for the status
  const getStatusText = () => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  // Get color based on compatibility score
  const getScoreColor = () => {
    if (compatibilityScore >= 80) return 'text-green-600';
    if (compatibilityScore >= 60) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <Card className={cn('overflow-hidden', className)} bordered>
      <CardHeader withBorder>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle>{name}</CardTitle>
            {description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          <div className="ml-4">
            <span 
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusBadge()
              )}
            >
              {getStatusText()}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Compatibility</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] h-2.5 rounded-full" 
                style={{ width: `${compatibilityScore}%` }}
              ></div>
            </div>
            <span className={cn('text-sm font-semibold', getScoreColor())}>
              {compatibilityScore}%
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Why this match?</p>
          <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
            {matchReasons.slice(0, 3).map((reason, index) => (
              <li key={index} className="line-clamp-2">
                {reason}
              </li>
            ))}
            {matchReasons.length > 3 && (
              <li className="text-blue-600 font-medium">
                +{matchReasons.length - 3} more reasons
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      
      {status === 'pending' && (
        <CardFooter withBorder>
          <div className="flex space-x-2 w-full">
            <Button
              onClick={onAccept}
              variant="success"
              size="sm"
              fullWidth
            >
              Accept
            </Button>
            <Button
              onClick={onReject}
              variant="outline"
              size="sm"
              fullWidth
            >
              Decline
            </Button>
          </div>
        </CardFooter>
      )}
      
      {status !== 'pending' && (
        <CardFooter withBorder>
          <Button
            variant="primary"
            size="sm"
            fullWidth
          >
            View {profileType === 'startup' ? 'Investor' : 'Startup'} Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MatchCard; 