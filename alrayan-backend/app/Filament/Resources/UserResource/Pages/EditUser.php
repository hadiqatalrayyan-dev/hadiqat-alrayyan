<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('حذف')
                ->visible(fn (): bool => !$this->getRecord()->isAdmin())
                ->authorize('delete'),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Preserve the original role to prevent unauthorized role modifications
        $data['role'] = $this->getRecord()->role;

        return $data;
    }
}
