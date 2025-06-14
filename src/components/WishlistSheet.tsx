
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Product } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WishlistSheetProps {
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WishlistSheet: React.FC<WishlistSheetProps> = ({
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Wishlist ({wishlistItems.length})</SheetTitle>
        </SheetHeader>
        {wishlistItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6 pr-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 animate-fade-in">
                    <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-lg font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" onClick={() => onMoveToCart(item)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Move to Cart
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onRemoveFromWishlist(item)}>
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center animate-fade-in">
            <Heart className="h-24 w-24 text-gray-300" />
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground">Add items you love to your wishlist.</p>
            <SheetClose asChild>
              <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
