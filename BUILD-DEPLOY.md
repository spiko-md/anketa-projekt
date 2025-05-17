# Navodila za build in deploy

## Angular SPA (Frontend)
1. Namesti Angular CLI, če še ni:
   npm install -g @angular/cli

2. Namesti odvisnosti:
   cd AnketaFrontend
   npm install

3. Build:
   ng build --configuration production

4. Kopiraj `dist/anketa-frontend/` v `AnketaBackend/wwwroot/`

## .NET Backend
1. cd AnketaBackend
2. dotnet restore
3. dotnet publish -c Release -o out

## Deploy na Render.com brez GitHub:
- Zip mapo `out/` in jo ročno naloži na Render kot Manual Deploy