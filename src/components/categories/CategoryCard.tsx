
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, CheckCircle, Settings } from 'lucide-react';
import CategoryFormDrawer from '@/components/categories/CategoryFormDrawer';

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  configured: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  count, 
  icon, 
  color,
  enabled,
  onToggle,
  configured
}) => {
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 relative">
      <CategoryFormDrawer 
        categoryName={title}
        categoryIcon={icon}
        trigger={
          <div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-md ${color}`}>
                    {icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg flex items-center">
                      {title}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {count}
                      </Badge>
                      {configured && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">{description}</p>
                  </div>
                </div>
                <div onClick={handleToggleClick}>
                  <Switch 
                    checked={enabled} 
                    onCheckedChange={onToggle} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Settings className="h-3 w-3" />
                Configure
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to={`/opportunities?category=${encodeURIComponent(title)}`}>
                  Browse
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </div>
        }
      />
    </Card>
  );
};

export default CategoryCard;
