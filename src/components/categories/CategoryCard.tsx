import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, CheckCircle, Settings } from 'lucide-react';
import CategoryFormDrawer from '@/components/categories/CategoryFormDrawer';
import { iconMap } from '@/data/categories';

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  iconName: string;
  color: string;
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  configured?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  count, 
  iconName, 
  color,
  enabled = false,
  onToggle = () => {},
  configured = false,
  onClick = () => {}
}) => {
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const IconComponent = iconMap[iconName];

  return (
    <Card className="overflow-hidden hover:shadow-sm transition-all duration-300 relative">
      <CategoryFormDrawer 
        categoryName={title}
        categoryIcon={
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-xs">
              {iconName.charAt(0).toUpperCase()}
            </span>
          </div>
        }
        trigger={
          <div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-white text-base font-medium">
                      {iconName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {title}
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                      {configured && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
                  </div>
                </div>
                <div onClick={handleToggleClick} className="shrink-0">
                  <Switch 
                    checked={enabled} 
                    onCheckedChange={onToggle} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 px-4 border-t  bg-[#F9F9FB]  flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
              >
                <Settings className="h-3.5 w-3.5" />
                Configure
              </Button>
              <Button asChild variant="ghost" size="sm" className="flex items-center gap-1.5">
                <Link to={`/opportunities?category=${encodeURIComponent(title)}`}>
                  Browse
                  <ArrowRight className="h-3.5 w-3.5" />
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
