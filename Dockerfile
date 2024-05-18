# Использование легковесного базового образа и многослойной сборки

# Этап 1: Сборка
FROM node:16-alpine AS builder

WORKDIR /app

# Копируем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем все зависимости (включая devDependencies)
RUN yarn install --frozen-lockfile

# Копируем остальные файлы и собираем проект
COPY . .
RUN yarn run build

# Этап 2: Финальный образ
FROM node:16-alpine

WORKDIR /app

# Копируем только необходимые артефакты из стадии сборки
COPY --from=builder /app/build /app/build

# Устанавливаем только продакшн-зависимости
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

CMD ["node", "build/index.js"]
