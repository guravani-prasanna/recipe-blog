export interface Recipe {
    slug: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    imageUrl: string;
    videoUrl?: string;
    category: string;
    difficulty: string;
    cookingTime: number;
    tags: string[];
    isFeatured: boolean;
}

// Mocked CMS Data, organized by locale for easier retrieval
const MOCK_DATA: Record<string, Recipe[]> = {
    en: [
        {
            slug: 'classic-spanish-paella',
            title: 'Classic Spanish Paella',
            description: 'A delicious and authentic seafood paella.',
            ingredients: ['2 cups bomba rice', '1 lb shrimp', '1/2 lb mussels', '1 pinch saffron', '4 cups seafood broth', '1 onion', '2 tomatoes'],
            instructions: '1. Sauté onion and tomatoes.\n2. Add rice and saffron.\n3. Pour in broth and simmer.\n4. Add seafood and cook until done.',
            imageUrl: '/paella.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=1F2bQpQ3Iyw',
            category: 'Spanish',
            difficulty: 'Medium',
            cookingTime: 45,
            tags: ['seafood', 'rice', 'dinner'],
            isFeatured: true,
        },
        {
            slug: 'french-onion-soup',
            title: 'French Onion Soup',
            description: 'Classic comforting soup with caramelized onions and cheese.',
            ingredients: ['4 large onions', '4 cups beef broth', '1/2 cup white wine', 'Gruyere cheese', 'Baguette slices', 'Butter'],
            instructions: '1. Caramelize onions in butter.\n2. Add wine and reduce.\n3. Add broth and simmer for 30 mins.\n4. Top with baguette and cheese, broil until melted.',
            imageUrl: '/french-onion-soup.png',
            videoUrl: 'https://www.youtube.com/watch?v=2eKWPEp-vC4',
            category: 'French',
            difficulty: 'Hard',
            cookingTime: 60,
            tags: ['soup', 'comfort-food', 'appetizer'],
            isFeatured: true,
        },
        {
            slug: 'quick-margherita-pizza',
            title: 'Quick Margherita Pizza',
            description: 'Simple and fast margherita pizza for a quick dinner.',
            ingredients: ['1 pizza dough', '1/2 cup tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
            instructions: '1. Stretch out the dough.\n2. Spread tomato sauce.\n3. Add sliced mozzarella.\n4. Bake at 450F for 10-12 minutes.\n5. Top with fresh basil.',
            imageUrl: '/pizza.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=sv3TXQpXm_M',
            category: 'Italian',
            difficulty: 'Easy',
            cookingTime: 30,
            tags: ['pizza', 'vegetarian', 'fast'],
            isFeatured: true,
        },
        {
            slug: 'spaghetti-carbonara',
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
            ingredients: ['400g spaghetti', '200g guanciale or pancetta', '4 large eggs', '100g Pecorino Romano', 'Black pepper'],
            instructions: '1. Boil pasta.\n2. Fry guanciale.\n3. Mix eggs and cheese.\n4. Combine pasta, guanciale, and egg mixture off heat.',
            imageUrl: '/paella.jpg', // Reusing paella image as placeholder
            videoUrl: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
            category: 'Italian',
            difficulty: 'Medium',
            cookingTime: 25,
            tags: ['pasta', 'dinner', 'comfort-food'],
            isFeatured: true,
        }
    ],
    es: [
        {
            slug: 'classic-spanish-paella',
            title: 'Paella Española Clásica',
            description: 'Una paella de mariscos deliciosa y auténtica.',
            ingredients: ['2 tazas arroz bomba', '1 lb camarones', '1/2 lb mejillones', '1 pizca azafrán', '4 tazas caldo de mariscos', '1 cebolla', '2 tomates'],
            instructions: '1. Sofreír cebolla y tomates.\n2. Añadir arroz y azafrán.\n3. Verter el caldo y hervir a fuego lento.\n4. Añadir mariscos y cocinar.',
            imageUrl: '/paella.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=1F2bQpQ3Iyw',
            category: 'Española',
            difficulty: 'Medio',
            cookingTime: 45,
            tags: ['mariscos', 'arroz', 'cena'],
            isFeatured: true,
        },
        {
            slug: 'french-onion-soup',
            title: 'Sopa de Cebolla Francesa',
            description: 'Sopa reconfortante clásica con cebollas caramelizadas.',
            ingredients: ['4 cebollas grandes', '4 tazas caldo de res', '1/2 taza vino blanco', 'Queso Gruyere', 'Rebanadas de baguette', 'Mantequilla'],
            instructions: '1. Caramelizar cebollas en mantequilla.\n2. Añadir vino y reducir.\n3. Añadir caldo y hervir 30 min.\n4. Poner baguette y queso, asar hasta derretir.',
            imageUrl: '/french-onion-soup.png',
            videoUrl: 'https://www.youtube.com/watch?v=2eKWPEp-vC4',
            category: 'Francesa',
            difficulty: 'Difícil',
            cookingTime: 60,
            tags: ['sopa', 'reconfortante', 'entrada'],
            isFeatured: true,
        },
        {
            slug: 'quick-margherita-pizza',
            title: 'Pizza Margarita Rápida',
            description: 'Pizza margarita simple y rápida.',
            ingredients: ['1 masa de pizza', '1/2 taza salsa de tomate', 'Mozzarella fresca', 'Albahaca fresca', 'Aceite de oliva'],
            instructions: '1. Estirar la masa.\n2. Untar salsa de tomate.\n3. Añadir mozzarella.\n4. Hornear a 450F por 10-12 min.\n5. Poner albahaca fresca arriba.',
            imageUrl: '/pizza.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=sv3TXQpXm_M',
            category: 'Italiana',
            difficulty: 'Fácil',
            cookingTime: 30,
            tags: ['pizza', 'vegetariano', 'rápido'],
            isFeatured: true,
        },
        {
            slug: 'spaghetti-carbonara',
            title: 'Espaguetis a la Carbonara',
            description: 'Clásico plato de pasta italiana.',
            ingredients: ['400g espaguetis', '200g guanciale o panceta', '4 huevos grandes', '100g Pecorino Romano', 'Pimienta negra'],
            instructions: '1. Hervir la pasta.\n2. Freír guanciale.\n3. Mezclar huevos y queso.\n4. Combinar pasta, guanciale y mezcla de huevo.',
            imageUrl: '/paella.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
            category: 'Italiana',
            difficulty: 'Medio',
            cookingTime: 25,
            tags: ['pasta', 'cena', 'reconfortante'],
            isFeatured: true,
        }
    ],
    fr: [
        {
            slug: 'classic-spanish-paella',
            title: 'Paella Espagnole Classique',
            description: 'Une paella aux fruits de mer délicieuse et authentique.',
            ingredients: ['2 tasses riz bomba', '1 lb crevettes', '1/2 lb moules', '1 pincée safran', '4 tasses bouillon de fruits de mer', '1 oignon', '2 tomates'],
            instructions: '1. Faire revenir oignon et tomates.\n2. Ajouter riz et safran.\n3. Verser le bouillon et mijoter.\n4. Ajouter fruits de mer et cuire.',
            imageUrl: '/paella.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=1F2bQpQ3Iyw',
            category: 'Espagnole',
            difficulty: 'Moyen',
            cookingTime: 45,
            tags: ['fruits de mer', 'riz', 'dîner'],
            isFeatured: true,
        },
        {
            slug: 'french-onion-soup',
            title: 'Soupe à l\'Oignon',
            description: 'Soupe réconfortante classique aux oignons caramélisés.',
            ingredients: ['4 gros oignons', '4 tasses bouillon de bœuf', '1/2 tasse vin blanc', 'Fromage Gruyère', 'Tranches de pain', 'Beurre'],
            instructions: '1. Caraméliser oignons au beurre.\n2. Ajouter vin et réduire.\n3. Ajouter bouillon, mijoter 30 min.\n4. Garnir de pain et fromage, gratiner.',
            imageUrl: '/french-onion-soup.png',
            videoUrl: 'https://www.youtube.com/watch?v=2eKWPEp-vC4',
            category: 'Française',
            difficulty: 'Difficile',
            cookingTime: 60,
            tags: ['soupe', 'réconfortant', 'entrée'],
            isFeatured: true,
        },
        {
            slug: 'quick-margherita-pizza',
            title: 'Pizza Margherita Rapide',
            description: 'Pizza margherita simple pour un dîner rapide.',
            ingredients: ['1 pâte à pizza', '1/2 tasse sauce tomate', 'Mozzarella fraîche', 'Basilic frais', 'Huile d\'olive'],
            instructions: '1. Étaler la pâte.\n2. Étaler la sauce tomate.\n3. Ajouter la mozzarella.\n4. Cuire à 450F 10-12 min.\n5. Garnir de basilic frais.',
            imageUrl: '/pizza.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=sv3TXQpXm_M',
            category: 'Italienne',
            difficulty: 'Facile',
            cookingTime: 30,
            tags: ['pizza', 'végétarien', 'rapide'],
            isFeatured: true,
        },
        {
            slug: 'spaghetti-carbonara',
            title: 'Spaghettis à la Carbonara',
            description: 'Classique italien aux œufs, fromage et pancetta.',
            ingredients: ['400g spaghettis', '200g guanciale ou pancetta', '4 gros œufs', '100g Pecorino Romano', 'Poivre noir'],
            instructions: '1. Faire bouillir les pâtes.\n2. Faire frire la pancetta.\n3. Mélanger les œufs et le fromage.\n4. Mélanger les pâtes, la pancetta, et le mélange aux œufs hors du feu.',
            imageUrl: '/paella.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
            category: 'Italienne',
            difficulty: 'Moyen',
            cookingTime: 25,
            tags: ['pâtes', 'dîner', 'réconfortant'],
            isFeatured: true,
        }
    ],
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllRecipes(locale: string = 'en'): Promise<Recipe[]> {
    await delay(100);
    return MOCK_DATA[locale] || MOCK_DATA['en'];
}

export async function getFeaturedRecipes(locale: string = 'en'): Promise<Recipe[]> {
    const recipes = await getAllRecipes(locale);
    return recipes.filter(r => r.isFeatured);
}

export async function getRecipeBySlug(slug: string, locale: string = 'en'): Promise<Recipe | null> {
    const recipes = await getAllRecipes(locale);
    const found = recipes.find(r => r.slug === slug);
    return found || null;
}
