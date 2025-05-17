using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDb>(opt => opt.UseSqlite("Data Source=anketa.db"));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(opt => {
        opt.LoginPath = "/api/login";
        opt.Cookie.Name = "auth";
    });

builder.Services.AddAuthorization();
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/login", async (HttpContext ctx, LoginRequest login, AppDb db) => {
    var user = await db.Users.FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);
    if (user == null) return Results.Unauthorized();

    var claims = new List<Claim> { new(ClaimTypes.Name, user.Username) };
    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    var principal = new ClaimsPrincipal(identity);
    await ctx.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
    return Results.Ok(new { user.Username });
});

app.MapGet("/api/me", (ClaimsPrincipal user) =>
    user.Identity?.IsAuthenticated == true
        ? Results.Ok(new { user = user.Identity.Name })
        : Results.Unauthorized()
).RequireAuthorization();

app.MapPost("/api/survey", async (HttpContext ctx, Survey input, AppDb db) => {
    var ip = ctx.Connection.RemoteIpAddress?.ToString();
    var user = ctx.User.Identity?.Name ?? "anonim";
    input.Ip = ip;
    input.Username = user;
    input.Timestamp = DateTime.UtcNow;
    db.Surveys.Add(input);
    await db.SaveChangesAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapFallbackToFile("index.html");

using var scope = app.Services.CreateScope();
var dbInit = scope.ServiceProvider.GetRequiredService<AppDb>();
dbInit.Database.EnsureCreated();

if (!dbInit.Users.Any()) {
    dbInit.Users.AddRange(
        new User { Username = "janez", Password = "test123" },
        new User { Username = "metka", Password = "geslo456" }
    );
    dbInit.SaveChanges();
}

app.Run();

record LoginRequest(string Username, string Password);

class AppDb : DbContext {
    public AppDb(DbContextOptions<AppDb> opt) : base(opt) { }
    public DbSet<User> Users => Set<User>();
    public DbSet<Survey> Surveys => Set<Survey>();
}

class User {
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
}

class Survey {
    public int Id { get; set; }
    public required int Prodaja { get; set; }
    public required int Odkup { get; set; }
    public required int Obnova { get; set; }
    public string? Komentar { get; set; }
    public string? Username { get; set; }
    public string? Ip { get; set; }
    public DateTime Timestamp { get; set; }
}