import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';

const Header = () => {
  const location = useLocation();
  const favorites = useAppSelector(s => s.favorites);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-display text-xl sm:text-2xl font-semibold text-foreground">
              FakeStore
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            <Link
              to="/"
              className={`font-body text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/favorites"
              className={`font-body text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === '/favorites' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Favorites
            </Link>
          </nav>

          <Link
            to="/favorites"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                favorites.length > 0 ? 'fill-primary text-primary' : 'text-foreground'
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
