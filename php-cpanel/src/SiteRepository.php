<?php
declare(strict_types=1);

namespace AranduGo;

final class SiteRepository
{
    public static function draft(): array
    {
        $draft=self::load('draft_json');
        return self::isProfile($draft)?$draft:self::published();
    }
    public static function published(): array { return self::load('published_json'); }

    private static function load(string $column): array
    {
        $table = Database::table('site_profiles');
        $row = Database::connection()->query("SELECT {$column} FROM {$table} WHERE id=1")->fetch();
        return json_decode((string) ($row[$column] ?? '{}'), true) ?: [];
    }

    private static function isProfile(array $data): bool
    {
        return !empty($data['business']) && is_array($data['modules']??null);
    }

    public static function save(array $data, bool $publish): void
    {
        $table = Database::table('site_profiles'); $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($publish) {
            $stmt=Database::connection()->prepare("UPDATE {$table} SET draft_json=?, published_json=?, published_at=NOW(), updated_at=NOW() WHERE id=1"); $stmt->execute([$json,$json]);
        } else {
            $stmt=Database::connection()->prepare("UPDATE {$table} SET draft_json=?, updated_at=NOW() WHERE id=1"); $stmt->execute([$json]);
        }
    }
}
