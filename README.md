# FakeStore - Product Dashboard

A modern, responsive product dashboard built with React, Redux Toolkit, and TypeScript. This application demonstrates proficiency in building scalable frontend applications with comprehensive state management, testing, and best practices.

## 🚀 Features

- **Product Listing**: Browse products in a responsive grid layout
- **Search & Filter**: 
  - Debounced search by product title
  - Filter by category
  - Sort by price (low to high, high to low) or top rated
- **Product Details**: View complete product information
- **Favorites**: Add and manage favorite products
- **Pagination**: Navigate through products efficiently
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **Vite** - Build tool

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd FakeStore
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_BASE_URL=https://fakestoreapi.com
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The project includes comprehensive test coverage:

- **Unit Tests**: Redux slices, selectors, and utility functions
- **Component Tests**: Individual component behavior and rendering
- **Integration Tests**: End-to-end user flows (search, filter, favorites)

### Test Structure

```
src/
├── features/
│   ├── filters/
│   │   └── filters.slice.test.ts
│   ├── favorites/
│   │   ├── favorites.slice.test.ts
│   │   └── favorites.integration.test.tsx
│   └── products/
│       └── products.selectors.test.ts
├── components/
│   ├── SearchBar.test.tsx
│   ├── ProductCard.test.tsx
│   └── Pagination.test.tsx
└── pages/
    └── ProductsPage.integration.test.tsx
```

## 🏗️ Project Structure

```
src/
├── api/              # API configuration
├── app/              # Redux store configuration
├── components/       # Reusable UI components
│   └── ui/          # Base UI components (shadcn/ui)
├── features/         # Feature-based modules
│   ├── products/    # Products feature (API, types, selectors)
│   ├── filters/     # Filters feature (slice, actions)
│   └── favorites/   # Favorites feature (slice, selectors)
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── routes/          # Route configuration
├── lib/             # Utility functions
└── test/            # Test utilities and setup
```

## 📝 Key Implementation Details

### State Management

- **Redux Toolkit** for centralized state management
- **RTK Query** for server state and caching
- **Selectors** for computed state and filtering logic
- **Normalized state** structure for scalability

### API Integration

- Uses [Fake Store API](https://fakestoreapi.com/) for product data
- RTK Query handles caching, refetching, and error states
- Optimistic updates for better UX

### Filtering & Search

- Debounced search (500ms delay) for performance
- Client-side filtering and sorting
- Pagination with configurable items per page
- Filters reset pagination to page 1

### Testing Strategy

- **Unit Tests**: Test individual functions and reducers in isolation
- **Component Tests**: Test component rendering and user interactions
- **Integration Tests**: Test complete user flows
- **Mock Data**: Reusable mock data for consistent testing

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

### Environment Variables

Make sure to set the following environment variable in your deployment platform:

```
VITE_BASE_URL=https://fakestoreapi.com
```

## 📊 Performance Optimizations

- Code splitting with React Router
- Image lazy loading
- Debounced search input
- Memoized selectors
- Efficient re-renders with React hooks

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent design
- Responsive breakpoints for mobile-first design
- Dark mode support (via Tailwind)

## 🔒 Best Practices

- TypeScript for type safety
- ESLint for code quality
- Modular, feature-based architecture
- Reusable components
- Accessible UI components
- Error boundaries (recommended addition)
- Loading states for async operations

## 📚 API Documentation

The application uses the [Fake Store API](https://fakestoreapi.com/):

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products/categories` - Get all categories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for demonstration purposes.

## 👤 Author

Built as part of a technical assessment demonstrating modern frontend development practices.

---

**Note**: This application uses the Fake Store API for demonstration purposes. In a production environment, you would replace this with your own backend API.
