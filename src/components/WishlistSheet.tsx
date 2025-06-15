
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
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-slate-900/95 backdrop-blur-xl border-l border-slate-600/30">
        <SheetHeader className="px-6 border-b border-slate-700/50 pb-4">
          <SheetTitle className="text-white font-display">
            Wishlist ({wishlistItems.length})
          </SheetTitle>
        </SheetHeader>
        {wishlistItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6 pr-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 animate-fade-in bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                    <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-600/30" />
                    <div className="flex-1">
                      <h4 className="font-medium truncate text-white">{item.name}</h4>
                      <p className="text-lg font-bold text-white">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => onMoveToCart(item)}
                        className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Move to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onRemoveFromWishlist(item)}
                        className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                      >
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
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center animate-fade-in p-8">
            <div className="bg-slate-800/50 p-8 rounded-full border border-slate-600/30">
              <Heart className="h-16 w-16 text-slate-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Your wishlist is empty</h3>
              <p className="text-slate-400">Add items you love to your wishlist.</p>
            </div>
            <SheetClose asChild>
              <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
