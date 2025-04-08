
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

interface CategoryFormFooterProps {
  loading: boolean;
  onClose?: () => void;
}

const CategoryFormFooter: React.FC<CategoryFormFooterProps> = ({ loading, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <SheetFooter className="pt-2">
      <SheetClose asChild>
        <Button variant="outline" onClick={handleClose} disabled={loading}>Cancel</Button>
      </SheetClose>
    </SheetFooter>
  );
};

export default CategoryFormFooter;
