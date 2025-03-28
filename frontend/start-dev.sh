#!/bin/bash

# Функция для вывода помощи
show_help() {
    echo "Usage: ./start-dev.sh [options]"
    echo "Options:"
    echo "  all                   - Start all microfrontends"
    echo "  core                   - Start main app"
    echo "  courses             - Start dashboard"
    echo "  landing                  - Start navigation menu"
    echo "  profile                  - Start core"
    echo "  Multiple options can be specified, e.g.:"
    echo "  ./start-dev.sh dashboard menu"
}

# Если нет аргументов, показываем помощь
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

# Функция для запуска микрофронта
start_microfrontend() {
    local name=$1
    local dir=""

    case $name in
    "core")
        dir="core"
        ;;
    "courses")
        dir="courses"
        ;;
    "landing")
        dir="landing"
        ;;
    "profile")
        dir="profile"
        ;;
    *)
        echo "Error: Unknown microfrontend '$name'"
        return 1
        ;;
    esac

    if [ -d "$dir" ]; then
        echo "Starting $dir in development mode..."
        (cd "$dir" && pnpm start) &
        echo "$dir started successfully"
    else
        echo "Warning: $dir directory not found"
    fi
}

# Обработка аргументов
for arg in "$@"; do
    case $arg in
    "all")
        # Запускаем все микрофронты
        start_microfrontend "core"
        start_microfrontend "courses"
        start_microfrontend "landing"
        start_microfrontend "profile"
        ;;
    "core" | "courses" | "landing" | "profile")
        start_microfrontend "$arg"
        ;;
    "help" | "-h" | "--help")
        show_help
        exit 0
        ;;
    *)
        echo "Unknown option: $arg"
        show_help
        exit 1
        ;;
    esac
done

# Ждем все процессы (чтобы скрипт не завершился)
wait

echo "All specified microfrontends have been started!"
