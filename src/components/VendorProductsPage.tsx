
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin, Phone, Grid3x3, List, AlertCircle } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useAppContext } from '@/contexts/AppContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  // Get products from this vendor with better error handling
  const vendorProducts = useMemo(() => {
    try {
      if (!products || !Array.isArray(products)) {
        console.warn('Products data is not available or not an array');
        return [];
      }
      
      return products.filter(product => {
        if (!product || !product.vendor) {
          return false;
        }
        return product.vendor.name === vendorName && product.stock > 0;
      });
    } catch (error) {
      console.error('Error filtering vendor products:', error);
      return [];
    }
  }, [products, vendorName]);

  // Get vendor info from first product with fallback
  const vendorInfo = vendorProducts.length > 0 ? vendorProducts[0]?.vendor : null;

  const handleAddToCart = (product: any, quantity: number) => {
    try {
      addToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Loading state
  if (!products) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="dark-modern-card border-slate-600/30 text-white hover:bg-slate-700/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('vendor.backToVendors')}
          </Button>
        </div>
        
        <div className="text-center py-16">
          <div className="dark-glass-effect rounded-3xl p-12 max-w-md mx-auto border border-slate-600/30">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-2xl font-semibold text-white mb-3">{t('vendor.loadingProducts')}</p>
            <p className="text-slate-300">{t('vendor.pleasewait')}</p>
          </div>
        </div>
      </div>
    );
  }

  // No products found state
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
            {t('vendor.backToVendors')}
          </Button>
        </div>
        
        <div className="text-center py-16">
          <div className="dark-glass-effect rounded-3xl p-12 max-w-md mx-auto border border-slate-600/30">
            <AlertCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-2xl font-semibold text-white mb-3">{t('vendor.noProductsFound')}</p>
            <p className="text-slate-300 mb-6">
              {vendorName} {t('vendor.noProductsDescription')}
            </p>
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              {t('vendor.browseOtherVendors')}
            </Button>
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
          {t('vendor.backToVendors')}
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
                  {t('vendor.online')}
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
                    <span>4.7 (156 {t('vendor.reviews')})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>0.8 {t('vendor.kmAway')}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{vendorProducts.length}</p>
              <p className="text-sm text-slate-300">{t('vendor.productsAvailable')}</p>
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
