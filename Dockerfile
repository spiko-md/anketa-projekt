
# Frontend build
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY AnketaFrontend/ ./
RUN npm install && npm run build

# Backend build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-builder
WORKDIR /app
COPY AnketaBackend/ ./AnketaBackend/
COPY --from=frontend-builder /app/frontend/dist /app/AnketaBackend/wwwroot
RUN dotnet publish AnketaBackend/AnketaBackend.csproj -c Release -o out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-builder /app/out ./
ENTRYPOINT ["dotnet", "AnketaBackend.dll"]
