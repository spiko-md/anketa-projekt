
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserStore _userStore;
    public AuthController(UserStore userStore) => _userStore = userStore;

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _userStore.Validate(request.Username, request.Password);
        if (user == null)
            return Unauthorized();
        return Ok(new { user.Username, user.DisplayName });
    }

    public class LoginRequest
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
