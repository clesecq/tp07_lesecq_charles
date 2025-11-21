import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'pollution-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoritesState = signal<Set<number>>(this.loadFromStorage());

  readonly favorites = computed(() => Array.from(this.favoritesState()));
  readonly count = computed(() => this.favoritesState().size);

  constructor() {
    // Persister automatiquement dans le localStorage à chaque changement
    effect(() => {
      this.saveToStorage(this.favoritesState());
    });
  }

  isFavorite(pollutionId: number): boolean {
    return this.favoritesState().has(pollutionId);
  }

  toggle(pollutionId: number): void {
    this.favoritesState.update((favorites) => {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(pollutionId)) {
        newFavorites.delete(pollutionId);
      } else {
        newFavorites.add(pollutionId);
      }
      return newFavorites;
    });
  }

  add(pollutionId: number): void {
    if (!this.isFavorite(pollutionId)) {
      this.favoritesState.update((favorites) => {
        const newFavorites = new Set(favorites);
        newFavorites.add(pollutionId);
        return newFavorites;
      });
    }
  }

  remove(pollutionId: number): void {
    if (this.isFavorite(pollutionId)) {
      this.favoritesState.update((favorites) => {
        const newFavorites = new Set(favorites);
        newFavorites.delete(pollutionId);
        return newFavorites;
      });
    }
  }

  clear(): void {
    this.favoritesState.set(new Set());
  }

  private loadFromStorage(): Set<number> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Set(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
    return new Set();
  }

  private saveToStorage(favorites: Set<number>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  }
}
