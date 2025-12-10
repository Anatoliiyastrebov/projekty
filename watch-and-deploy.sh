#!/bin/bash

# Скрипт для отслеживания изменений файлов и автоматической выгрузки

echo "👀 Отслеживание изменений в коде..."
echo "📝 При изменении файлов будет автоматически выполняться коммит и push"
echo "⏹️  Нажмите Ctrl+C для остановки"
echo ""

# Проверка наличия inotify-tools (Linux) или fswatch (macOS)
if command -v fswatch &> /dev/null; then
  WATCHER="fswatch"
elif command -v inotifywait &> /dev/null; then
  WATCHER="inotifywait"
else
  echo "❌ Не найдены инструменты для отслеживания файлов"
  echo "📦 Установите fswatch (macOS: brew install fswatch) или inotify-tools (Linux)"
  exit 1
fi

# Функция для обработки изменений
handle_change() {
  echo ""
  echo "📝 Обнаружены изменения, выполняю автоматический коммит и push..."
  ./auto-commit.sh
  echo "✅ Готово! Продолжаю отслеживание..."
  echo ""
}

# Отслеживание изменений в src/ и других важных директориях
if [ "$WATCHER" = "fswatch" ]; then
  # macOS
  fswatch -o src/ .github/ *.json *.ts *.tsx *.js *.jsx 2>/dev/null | while read f; do
    handle_change
  done
elif [ "$WATCHER" = "inotifywait" ]; then
  # Linux
  while inotifywait -r -e modify,create,delete src/ .github/ *.json *.ts *.tsx *.js *.jsx 2>/dev/null; do
    handle_change
  done
fi
