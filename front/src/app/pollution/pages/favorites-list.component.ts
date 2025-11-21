import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PollutionService } from '../pollution.service';
import { FavoritesService } from '../favorites.service';
import { PollutionType } from '../pollution.model';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent {
  private readonly pollutionService = inject(PollutionService);
  readonly favoritesService = inject(FavoritesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = this.pollutionService.isLoading;
  readonly error = this.pollutionService.error;

  readonly typeOptions: ReadonlyArray<{ value: PollutionType; label: string }> = [
    { value: 'plastique', label: 'Plastique' },
    { value: 'chimique', label: 'Chimique' },
    { value: 'depot-sauvage', label: 'Depot sauvage' },
    { value: 'eau', label: 'Eau' },
    { value: 'air', label: 'Air' },
    { value: 'autre', label: 'Autre' }
  ];

  readonly favoritePollutions = computed(() => {
    const favoriteIds = this.favoritesService.favorites();
    const allPollutions = this.pollutionService.pollutions();
    
    return allPollutions
      .filter(pollution => favoriteIds.includes(pollution.id))
      .sort((a, b) => {
        // Trier par ordre décroissant de date d'observation
        return new Date(b.observedAt).getTime() - new Date(a.observedAt).getTime();
      });
  });

  constructor() {
    effect(() => {
      this.pollutionService
        .refresh()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          error: () => {
            /* error state already handled by the service */
          }
        });
    }, { allowSignalWrites: true });
  }

  toggleFavorite(pollutionId: number) {
    this.favoritesService.toggle(pollutionId);
  }

  isFavorite(pollutionId: number): boolean {
    return this.favoritesService.isFavorite(pollutionId);
  }

  onDelete(id: number) {
    const shouldDelete = globalThis.confirm('Supprimer cette declaration ?');
    if (!shouldDelete) {
      return;
    }

    this.pollutionService
      .remove(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  labelType(type: PollutionType) {
    return this.typeOptions.find((option) => option.value === type)?.label ?? type;
  }
}
