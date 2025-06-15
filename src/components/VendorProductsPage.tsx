
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin, Phone, Grid3x3, List } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useAppContext } from '@/contexts/AppContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface VendorProductsPageProps {
  vendorName: string;
  onBack: () => void;
}

export const VendorProductsPage: React.FC<VendorProductsPageProps> = ({ 
  vendorName, 
  onBack 
}) => {
  const { products } = useAppContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToCart } = useCart();
  const { handleAddToWishlist: addToWishlist, isInWishlist } = useWishlist();

  // Get products from this vendor
  const vendorProducts = useMemo(() => {
    return products.filter(product => 
      product.vendor?.name === vendorName && product.stock > 0
    );
  }, [products, vendorName]);

  // Get vendor info from first product
  const vendorInfo = vendorProducts[0]?.vendor;

  const handleAddToCart = (product: any, quantity: number) => {
    addToCart(product, quantity);
  };

  if (vendorProducts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="dark-modern-card border-slate-600/30 text-white hover:bg-slate-700/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendors
          </Button>
        </div>
        
        <div className="text-center py-16">
          <div className="dark-glass-effect rounded-3xl p-12 max-w-md mx-auto border border-slate-600/30">
            <p className="text-2xl font-semibold text-white mb-3">No products found</p>
            <p className="text-slate-300">This vendor doesn't have any products listed yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="dark-modern-card border-slate-600/30 text-white hover:bg-slate-700/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vendors
        </Button>
        
        <div className="flex items-center gap-4">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'premium-button' : 'dark-modern-card border-slate-600/30 text-slate-300 hover:bg-slate-700/50'}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'premium-button' : 'dark-modern-card border-slate-600/30 text-slate-300 hover:bg-slate-700/50'}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Vendor Info Card */}
      <Card className="dark-modern-card border-slate-600/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-white">{vendorName}</h2>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-200 border-slate-600/30">
                  Online
                </Badge>
              </div>
              
              {vendorInfo && (
                <div className="flex items-center gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{vendorInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.7 (156 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>0.8 km away</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{vendorProducts.length}</p>
              <p className="text-sm text-slate-300">Products Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {vendorProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(quantity) => handleAddToCart(product, quantity)}
            onAddToWishlist={addToWishlist}
            isInWishlist={isInWishlist(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
